import { saveBooking, getBookings } from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('should save a booking to localStorage', () => {
    const booking = { id: 1, event: 'Concert', quantity: 2, totalAmount: 500 };
    saveBooking(booking);
    const bookings = JSON.parse(localStorage.getItem('bookings'));
    expect(bookings).toEqual([booking]);
  });

  test('should get bookings from localStorage', () => {
    const bookingsData = [{ id: 2, event: 'Conference' }];
    localStorage.setItem('bookings', JSON.stringify(bookingsData));
    const bookings = getBookings();
    expect(bookings).toEqual(bookingsData);
  });

  test('should return empty array if JSON parse fails', () => {
    localStorage.setItem('bookings', 'invalid-json');
    const bookings = getBookings();
    expect(bookings).toEqual([]);
  });

  test('should return empty array if localStorage key is missing or null', () => {
    localStorage.removeItem('bookings');
    const bookings = getBookings();
    expect(bookings).toEqual([]);
  });

  test('should handle error when saving booking', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const booking = { id: 3, event: 'Tech Meetup' };
    saveBooking(booking);

    expect(errorSpy).toHaveBeenCalledWith(
      'Error saving booking to localStorage:',
      expect.any(Error)
    );
  });
});
