import React, { useState } from "react";
import { Event, EventRegistration, EVENT_TYPES } from "@/types/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Share2, 
  Ticket,
  Clock,
  Info,
  Plus,
  Minus,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

interface EventPaymentPageProps {
  event: Event;
  onRegistration?: (registration: EventRegistration) => void;
}

const EventPaymentPage: React.FC<EventPaymentPageProps> = ({ event, onRegistration }) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const availableTickets = event.capacity ? event.capacity - event.ticketsSold : 999;
  const totalAmount = event.price * ticketQuantity;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(availableTickets, ticketQuantity + delta));
    setTicketQuantity(newQuantity);
  };

  const handleRegistration = async () => {
    if (!participantName || !participantEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (ticketQuantity > availableTickets) {
      toast.error("Not enough tickets available");
      return;
    }

    setIsProcessing(true);

    try {
      const registration: EventRegistration = {
        id: `reg_${Date.now()}`,
        eventId: event.id,
        participantName,
        participantEmail,
        participantPhone,
        ticketQuantity,
        totalAmount,
        paymentStatus: 'pending',
        registrationDate: new Date().toISOString(),
        specialRequests,
        additionalInfo: {}
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      onRegistration?.(registration);
      toast.success(`Successfully registered for ${event.title}! Check your email for confirmation.`);
      
      // Reset form
      setParticipantName("");
      setParticipantEmail("");
      setParticipantPhone("");
      setSpecialRequests("");
      setTicketQuantity(1);
      
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = () => {
    const eventUrl = `${window.location.origin}/event/${event.id}`;
    navigator.share?.({
      title: event.title,
      text: event.description,
      url: eventUrl
    }) || toast.success("Event link copied to clipboard!");
  };

  const isSoldOut = availableTickets <= 0;
  const isPastEvent = new Date() > startDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Event Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{eventType?.icon || '🎫'}</div>
                  <div>
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <Badge variant="secondary" className="mt-1">
                      {eventType?.name || 'Event'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{formatDate(startDate)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(startDate)}
                        {endDate && ` - ${formatTime(endDate)}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-muted-foreground">Event Location</div>
                    </div>
                  </div>
                  
                  {event.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{availableTickets} available</div>
                        <div className="text-sm text-muted-foreground">
                          {event.ticketsSold} / {event.capacity} registered
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">
                        {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                      </div>
                      <div className="text-sm text-muted-foreground">Per ticket</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              </div>
              
              {/* Event Image Placeholder */}
              <div className="lg:w-80">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">{eventType?.icon || '🎫'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Event Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isPastEvent ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">This event has ended</h3>
                    <p className="text-muted-foreground">Registration is no longer available.</p>
                  </div>
                ) : isSoldOut ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Event is sold out</h3>
                    <p className="text-muted-foreground">All tickets have been sold.</p>
                  </div>
                ) : (
                  <>
                    {/* Ticket Quantity */}
                    <div className="space-y-3">
                      <Label>Number of Tickets</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={ticketQuantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium min-w-[3rem] text-center">
                          {ticketQuantity}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQuantityChange(1)}
                          disabled={ticketQuantity >= availableTickets}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          ({availableTickets} available)
                        </span>
                      </div>
                    </div>

                    {/* Participant Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Participant Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={participantEmail}
                            onChange={(e) => setParticipantEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={participantPhone}
                          onChange={(e) => setParticipantPhone(e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="requests">Special Requests (Optional)</Label>
                        <Textarea
                          id="requests"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Any special dietary requirements, accessibility needs, etc."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Registration Button */}
                    <Button 
                      className="w-full"
                      onClick={handleRegistration}
                      disabled={isProcessing || !participantName || !participantEmail}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isProcessing ? 'Processing...' : 
                       event.price > 0 ? `Register & Pay $${totalAmount.toFixed(2)}` : 'Register for Free'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Event Details Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                  </div>
                  <div className="text-sm text-muted-foreground">Per ticket</div>
                </div>
                
                {event.tags && event.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {eventType && (
                  <div>
                    <h4 className="font-medium mb-2">Event Type</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{eventType.icon}</span>
                      <div>
                        <div className="font-medium">{eventType.name}</div>
                        <div className="text-sm text-muted-foreground">{eventType.category}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {event.customFields && Object.keys(event.customFields).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Additional Information</h4>
                    <div className="space-y-2">
                      {Object.entries(event.customFields).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPaymentPage;