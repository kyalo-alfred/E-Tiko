import { useEffect, useState } from 'react';
import { bookingsApi } from '../lib/api';
import type { Booking } from '../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Loader2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface MyBookingsProps {
  userId: string;
}

export function MyBookings({ userId }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [userId]);

  const loadBookings = async () => {
    try {
      const data = await bookingsApi.getUserBookings(userId);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTicket = (booking: Booking) => {
    // Mock PDF download
    toast.success('Ticket downloaded! (This is a demo)');
    console.log('Downloading ticket for booking:', booking.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No bookings yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{booking.eventTitle}</CardTitle>
                <CardDescription className="mt-1">
                  Booking ID: {booking.id}
                </CardDescription>
              </div>
              <Badge variant={booking.paymentStatus === 'completed' ? 'default' : 'secondary'}>
                {booking.paymentStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p>{booking.categoryName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p>{booking.quantity} ticket(s)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-primary">KES {booking.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p>{formatDate(booking.bookingDate)}</p>
              </div>
            </div>

            {booking.transactionId && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="text-sm">{booking.transactionId}</p>
              </div>
            )}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleDownloadTicket(booking)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ticket (PDF)
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
