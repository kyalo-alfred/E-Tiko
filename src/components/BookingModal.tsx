import { useState } from 'react';
import { bookingsApi, paymentApi } from '../lib/api';
import type { Event, User } from '../lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Loader2, CreditCard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  event: Event | null;
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ event, user, isOpen, onClose, onSuccess }: BookingModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'booking' | 'payment' | 'success'>('booking');

  if (!event) return null;

  const category = event.categories.find(c => c.id === selectedCategory);
  const totalAmount = category ? category.price * quantity : 0;

  const handleBooking = async () => {
    if (!category) {
      toast.error('Please select a ticket category');
      return;
    }

    if (quantity > category.available) {
      toast.error('Not enough tickets available');
      return;
    }

    setIsProcessing(true);
    setPaymentStep('payment');

    try {
      // Initiate M-Pesa payment
      const paymentResult = await paymentApi.initiateMpesa(phoneNumber, totalAmount);
      
      toast.success('Payment request sent to your phone. Please enter your M-Pesa PIN.');
      
      // Check payment status
      const statusResult = await paymentApi.checkPaymentStatus(paymentResult.checkoutRequestId);
      
      if (statusResult.status === 'completed') {
        // Create booking
        await bookingsApi.create({
          eventId: event.id,
          eventTitle: event.title,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          categoryId: category.id,
          categoryName: category.name,
          quantity,
          totalAmount,
          paymentStatus: 'completed',
          transactionId: statusResult.transactionId,
        });

        setPaymentStep('success');
        toast.success('Booking confirmed! Confirmation sent to your email.');
        
        setTimeout(() => {
          onSuccess();
          handleClose();
        }, 2000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Booking failed');
      setPaymentStep('booking');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setSelectedCategory('');
    setQuantity(1);
    setPaymentStep('booking');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {paymentStep === 'success' ? 'Booking Confirmed!' : 'Book Tickets'}
          </DialogTitle>
          <DialogDescription>
            {paymentStep === 'success' 
              ? 'Your tickets have been booked successfully'
              : event.title}
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-center text-muted-foreground">
              A confirmation email has been sent to {user.email}
            </p>
          </div>
        ) : paymentStep === 'payment' ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-center">Processing M-Pesa payment...</p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Please check your phone and enter your M-Pesa PIN
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ticket Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {event.categories.map((cat) => (
                    <SelectItem 
                      key={cat.id} 
                      value={cat.id}
                      disabled={cat.available === 0}
                    >
                      {cat.name} - KES {cat.price.toLocaleString()} 
                      ({cat.available} available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {category && (
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  max={Math.min(category.available, 10)}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>M-Pesa Phone Number</Label>
              <Input
                type="tel"
                placeholder="+254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per ticket:</span>
                <span>KES {category?.price.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity:</span>
                <span>{quantity}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="text-primary">KES {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleBooking}
              disabled={!selectedCategory || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay with M-Pesa
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
