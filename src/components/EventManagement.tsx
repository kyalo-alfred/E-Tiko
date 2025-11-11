import { useEffect, useState } from 'react';
import { bookingsApi, eventsApi } from '../lib/api';
import type { Event, Booking } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { ArrowLeft, Download, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface EventManagementProps {
  event: Event;
  onBack: () => void;
  onUpdate: () => void;
}

export function EventManagement({ event, onBack, onUpdate }: EventManagementProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    loadBookings();
  }, [event.id]);

  const loadBookings = async () => {
    try {
      const data = await bookingsApi.getEventBookings(event.id);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await eventsApi.delete(event.id);
      toast.success('Event deleted successfully');
      onUpdate();
      onBack();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const handleExportReport = () => {
    toast.success('Report exported! (This is a demo)');
    console.log('Exporting report for event:', event.id);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.quantity, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p>{formatDate(event.date)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p>{event.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-primary">KES {totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tickets Sold</p>
              <p>{totalTicketsSold}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3">Ticket Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {event.categories.map((category) => (
                <div key={category.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>{category.name}</span>
                    <Badge variant="outline">
                      {category.available}/{category.total}
                    </Badge>
                  </div>
                  <p className="text-primary">KES {category.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.total - category.available} sold
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>
            All bookings for this event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No bookings yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.userName}</TableCell>
                      <TableCell>{booking.userEmail}</TableCell>
                      <TableCell>{booking.categoryName}</TableCell>
                      <TableCell>{booking.quantity}</TableCell>
                      <TableCell>KES {booking.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                      <TableCell>
                        <Badge variant={booking.paymentStatus === 'completed' ? 'default' : 'secondary'}>
                          {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{event.title}" and all associated bookings.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
