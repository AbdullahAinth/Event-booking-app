import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";
import MyBookings from "./components/MyBookings";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home: List of events */}
              <Route path="/" element={<EventList />} />

              {/* Event detail page */}
              <Route path="/event/:id" element={<EventDetail />} />

              {/* Razorpay checkout */}
              <Route path="/checkout" element={<Payment />} />

              {/* Post-payment confirmation */}
              <Route
                path="/booking-confirmation"
                element={<BookingConfirmation />}
              />

              {/* View booked events */}
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
