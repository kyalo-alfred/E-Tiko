import { useState } from 'react';
import { eventsApi } from '../lib/api';
import type { User, TicketCategory } from '../lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CreateEventModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateEventModal({ user, isOpen, onClose, onSuccess }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
  });
  const [categories, setCategories] = useState<Omit<TicketCategory, 'id'>[]>([
    { name: 'Regular', price: 1000, available: 100, total: 100 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { name: '', price: 0, available: 0, total: 0 },
    ]);
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index: number, field: keyof Omit<TicketCategory, 'id'>, value: string | number) => {
    const updated = [...categories];
    if (field === 'name') {
      updated[index][field] = value as string;
    } else {
      const numValue = typeof value === 'string' ? parseInt(value) || 0 : value;
      updated[index][field] = numValue;
      if (field === 'total') {
        updated[index].available = numValue;
      }
    }
    setCategories(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (categories.length === 0) {
      toast.error('Please add at least one ticket category');
      return;
    }

    if (categories.some(c => !c.name || c.price <= 0 || c.total <= 0)) {
      toast.error('Please fill in all ticket category details');
      return;
    }

    setIsLoading(true);

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      await eventsApi.create({
        title: formData.title,
        description: formData.description,
        date: dateTime.toISOString(),
        location: formData.location,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        organizerId: user.id,
        organizerName: user.name,
        categories: categories.map((cat, index) => ({
          id: `c${Date.now()}_${index}`,
          ...cat,
        })),
        status: 'upcoming',
      });

      toast.success('Event created successfully!');
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      imageUrl: '',
    });
    setCategories([{ name: 'Regular', price: 1000, available: 100, total: 100 }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Tech Conference 2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your event..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Nairobi Convention Center"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Ticket Categories *</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddCategory}>
                <Plus className="w-4 h-4 mr-1" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Category {index + 1}</span>
                    {categories.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={category.name}
                        onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                        placeholder="VIP"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Price (KES)</Label>
                      <Input
                        type="number"
                        value={category.price}
                        onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                        min={0}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Total Tickets</Label>
                      <Input
                        type="number"
                        value={category.total}
                        onChange={(e) => handleCategoryChange(index, 'total', e.target.value)}
                        min={1}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Event'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
