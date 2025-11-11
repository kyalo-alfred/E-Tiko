import { useState, useEffect } from 'react';
import { eventsApi } from '../lib/api';
import type { User, Event } from '../lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { EventCard } from './EventCard';
import { BookingModal } from './BookingModal';
import { MyBookings } from './MyBookings';
import { toast } from 'sonner';

interface AttendeeDashboardProps {
  user: User;
}

export function AttendeeDashboard({ user }: AttendeeDashboardProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, events]);

  const loadEvents = async () => {
    try {
      const data = await eventsApi.getAll();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
    }
  };

  const filterEvents = () => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  const handleBookNow = (event: Event) => {
    setSelectedEvent(event);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setRefreshKey(prev => prev + 1);
    loadEvents();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Discover Events</h1>
        <p className="text-muted-foreground mt-1">
          Browse and book tickets for upcoming events
        </p>
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList>
          <TabsTrigger value="events">All Events</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by name, location, or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No events found matching your search' : 'No events available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings">
          <MyBookings key={refreshKey} userId={user.id} />
        </TabsContent>
      </Tabs>

      <BookingModal
        event={selectedEvent}
        user={user}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}
