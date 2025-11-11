import { useState, useEffect } from 'react';
import { eventsApi } from '../lib/api';
import type { User, Event } from '../lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { EventCard } from './EventCard';
import { CreateEventModal } from './CreateEventModal';
import { Analytics } from './Analytics';
import { UserManagement } from './UserManagement';
import { EventManagement } from './EventManagement';
import { toast } from 'sonner';

interface OrganizerDashboardProps {
  user: User;
}

export function OrganizerDashboard({ user }: OrganizerDashboardProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, [user.id]);

  const loadEvents = async () => {
    try {
      const data = await eventsApi.getByOrganizer(user.id);
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
    }
  };

  const handleEventCreated = () => {
    loadEvents();
  };

  const handleManageEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Organizer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and view analytics
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList>
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          {selectedEvent ? (
            <EventManagement 
              event={selectedEvent} 
              onBack={() => setSelectedEvent(null)}
              onUpdate={loadEvents}
            />
          ) : (
            <>
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    You haven't created any events yet
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      showManageButton
                      onManage={handleManageEvent}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Analytics organizerId={user.id} />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>

      <CreateEventModal
        user={user}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleEventCreated}
      />
    </div>
  );
}
