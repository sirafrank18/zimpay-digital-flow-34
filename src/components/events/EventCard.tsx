import React from "react";
import { Event, EVENT_TYPES } from "@/types/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Eye, 
  Edit, 
  Share2,
  MoreVertical,
  Settings
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onView?: (event: Event) => void;
  onShare?: (event: Event) => void;
  onManage?: (event: Event) => void;
  showManagement?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onView,
  onShare,
  onManage,
  showManagement = false
}) => {
  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    const eventUrl = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(eventUrl);
    toast.success("Event link copied to clipboard!");
    onShare?.(event);
  };

  const getStatusColor = () => {
    if (!event.isActive) return 'bg-gray-500';
    if (new Date() > startDate) return 'bg-red-500';
    if (event.ticketsSold >= (event.capacity || 0)) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (!event.isActive) return 'Inactive';
    if (new Date() > startDate) return 'Past';
    if (event.ticketsSold >= (event.capacity || 0)) return 'Sold Out';
    return 'Active';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{eventType?.icon || '🎫'}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
              <Badge variant="secondary" className="text-xs mt-1">
                {eventType?.name || 'Event'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
            <span className="text-xs text-muted-foreground">{getStatusText()}</span>
            
            {showManagement && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(event)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Event
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(event)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Event
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onManage?.(event)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Event Description */}
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(startDate)} at {formatTime(startDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.ticketsSold} / {event.capacity} attendees
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>
              {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
            </span>
            {showManagement && (
              <span className="text-muted-foreground">
                • Total: ${event.totalEarnings.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(event)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          {showManagement && (
            <Button 
              size="sm"
              onClick={() => onManage?.(event)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;