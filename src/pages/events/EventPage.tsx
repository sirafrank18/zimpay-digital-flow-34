import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EventPaymentPage from "@/components/events/EventPaymentPage";
import { Event, EventRegistration } from "@/types/events";

const EventPage = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);

  // Mock event data - in a real app, this would be fetched based on eventId
  const mockEvent: Event = {
    id: eventId || "event_1",
    title: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
    type: "conference",
    creatorId: "creator_1",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
    location: "Convention Center, San Francisco, CA",
    capacity: 500,
    price: 299.99,
    currency: "USD",
    isActive: true,
    isFeatured: true,
    tags: ["Technology", "Networking", "Innovation", "Professional Development"],
    customFields: {
      industry: "Technology",
      speakers: "Leading tech executives and innovators",
      sessions: 12,
      networking: true,
      certification: true
    },
    ticketsSold: 234,
    totalEarnings: 69957.66,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const handleRegistration = (registration: EventRegistration) => {
    setRegistrations(prev => [...prev, registration]);
    // In a real app, this would also update the event's ticketsSold count
  };

  return (
    <EventPaymentPage 
      event={mockEvent}
      onRegistration={handleRegistration}
    />
  );
};

export default EventPage;