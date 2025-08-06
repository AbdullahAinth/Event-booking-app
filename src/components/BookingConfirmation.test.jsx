// src/components/BookingConfirmation.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import BookingConfirmation from "./BookingConfirmation";

describe("BookingConfirmation", () => {
  const mockBookingData = {
    event: { name: "Music Fest" },
    quantity: 3,
    totalPrice: 300.0,
    bookingId: "CONF-123456",
  };

  test("renders booking confirmation details correctly", () => {
    render(<BookingConfirmation bookingData={mockBookingData} />);

    expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
    expect(screen.getByTestId("event-name")).toHaveTextContent("Event: Music Fest");
    expect(screen.getByTestId("booking-id")).toHaveTextContent("Booking ID: CONF-123456");
    expect(screen.getByTestId("tickets")).toHaveTextContent("Tickets: 3");
    expect(screen.getByTestId("total-price")).toHaveTextContent("Total Price: $300.00");
  });

  test("renders message when no booking data is provided", () => {
    render(<BookingConfirmation bookingData={null} />);
    expect(screen.getByText(/No booking information available/i)).toBeInTheDocument();
  });
});
