import type { Event } from '../lib/api';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, MapPin, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
  onBookNow?: (event: Event) => void;
  onManage?: (event: Event) => void;
  showManageButton?: boolean;
}

export function EventCard({ event, onBookNow, onManage, showManageButton }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const minPrice = Math.min(...event.categories.map(c => c.price));
  const hasAvailableTickets = event.categories.some(c => c.available > 0);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={hasAvailableTickets ? 'default' : 'secondary'}>
            {hasAvailableTickets ? 'Available' : 'Sold Out'}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2">{event.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-2" />
            {event.organizerName}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-primary">KES {minPrice.toLocaleString()}</p>
          </div>
          {showManageButton ? (
            <Button onClick={() => onManage?.(event)} variant="outline">
              Manage Event
            </Button>
          ) : (
            <Button 
              onClick={() => onBookNow?.(event)} 
              disabled={!hasAvailableTickets}
            >
              {hasAvailableTickets ? 'Book Now' : 'Sold Out'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
