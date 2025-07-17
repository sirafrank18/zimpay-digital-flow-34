import React, { useState } from "react";
import { EVENT_TYPES, EventType, Event } from "@/types/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, DollarSign, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";

interface EventCreatorProps {
  onEventCreated?: (event: Event) => void;
}

const EventCreator: React.FC<EventCreatorProps> = ({ onEventCreated }) => {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    capacity: 0,
    price: 0,
    currency: 'USD',
    tags: [],
    customFields: {},
    ticketCategory: 'General' as 'VIP' | 'VVIP' | 'General' | 'Premium' | 'Student'
  });

  const handleTypeSelect = (type: EventType) => {
    setSelectedType(type);
    setEventData(prev => ({
      ...prev,
      type: type.id,
      customFields: {}
    }));
    setShowCreateForm(true);
  };

  const handleCreateEvent = () => {
    if (!selectedType || !eventData.title || !eventData.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newEvent: Event = {
      id: `event_${Date.now()}`,
      title: eventData.title || '',
      description: eventData.description || '',
      type: selectedType.id,
      creatorId: 'current_user', // This would come from auth context
      startDate: eventData.startDate || '',
      endDate: eventData.endDate,
      location: eventData.location || '',
      capacity: eventData.capacity,
      price: eventData.price || 0,
      currency: eventData.currency || 'USD',
      isActive: true,
      isFeatured: false,
      tags: eventData.tags || [],
      customFields: eventData.customFields || {},
      ticketsSold: 0,
      totalEarnings: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ticketCategory: eventData.ticketCategory
    };

    onEventCreated?.(newEvent);
    setShowCreateForm(false);
    setSelectedType(null);
    setEventData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      capacity: 0,
      price: 0,
      currency: 'USD',
      tags: [],
      customFields: {},
      ticketCategory: 'General' as 'VIP' | 'VVIP' | 'General' | 'Premium' | 'Student'
    });
    toast.success("Event created successfully!");
  };

  const handleCustomFieldChange = (fieldName: string, value: any) => {
    setEventData(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [fieldName]: value
      }
    }));
  };

  const renderCustomField = (field: any) => {
    const value = eventData.customFields?.[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleCustomFieldChange(field.name, parseInt(e.target.value))}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={(v) => handleCustomFieldChange(field.name, v)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'boolean':
        return (
          <Switch
            checked={value}
            onCheckedChange={(checked) => handleCustomFieldChange(field.name, checked)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {EVENT_TYPES.map((type) => (
              <Card 
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary"
                onClick={() => handleTypeSelect(type)}
              >
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <h3 className="font-medium text-sm">{type.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{type.description}</p>
                    <Badge variant="secondary" className="text-xs">{type.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Creation Form */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedType?.icon}</span>
              Create {selectedType?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Event Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={eventData.location}
                    onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Event location"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventData.description}
                onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your event"
                rows={3}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date & Time *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={eventData.startDate}
                    onChange={(e) => setEventData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date & Time</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={eventData.endDate}
                    onChange={(e) => setEventData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Capacity and Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="capacity"
                    type="number"
                    value={eventData.capacity}
                    onChange={(e) => setEventData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                    placeholder="Maximum attendees"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Ticket Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={eventData.price}
                    onChange={(e) => setEventData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="0.00"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={eventData.currency} onValueChange={(value) => setEventData(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ticket Category */}
            <div className="space-y-2">
              <Label htmlFor="ticketCategory">Ticket Category</Label>
              <Select value={eventData.ticketCategory} onValueChange={(value: 'VIP' | 'VVIP' | 'General' | 'Premium' | 'Student') => setEventData(prev => ({ ...prev, ticketCategory: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="VVIP">VVIP</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Event Type Specific Fields */}
            {selectedType && selectedType.fields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Specific Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedType.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && '*'}
                      </Label>
                      {renderCustomField(field)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>
                <Save className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCreator;