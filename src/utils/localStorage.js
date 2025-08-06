export function saveBooking(booking) {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
  }
}

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem('bookings')) || [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
}
