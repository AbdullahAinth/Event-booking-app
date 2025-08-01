import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import BookingConfirmation from "./components/BookingConfirmation";
import MyBookings from "./components/MyBookings";
import PaymentScreen from "./components/PaymentScreen";
import CategoryFilter from "./components/CategoryFilter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CategoryFilter
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                    <EventList selectedCategory={selectedCategory} />
                  </>
                }
              />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/payment-screen" element={<PaymentScreen />} />
              <Route path="/confirmation" element={<BookingConfirmation />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;