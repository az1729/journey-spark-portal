
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';

const MyBookings = () => {
  const { bookings } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please login to view your bookings.</p>
        <Button 
          className="bg-bus-primary hover:bg-bus-primary/90"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>
        <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
        <Button 
          className="bg-bus-primary hover:bg-bus-primary/90"
          onClick={() => navigate('/')}
        >
          Book a Trip
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Bookings</h2>
      
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-bus-primary" />
              <h3 className="font-semibold">Booking #{booking.id.toString().slice(-4)}</h3>
            </div>
            <div className="text-sm text-gray-500">
              Booked on {new Date(booking.bookingDate).toLocaleDateString()}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-bus-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Route</div>
                    <div className="font-medium">{booking.source} to {booking.destination}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium">{booking.date}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bus Number</div>
                    <div className="font-medium">{booking.busNumber}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Departure</div>
                    <div className="font-medium">{booking.departureTime}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium">Booking Details</div>
                <div className="text-sm text-gray-500">Total: <span className="font-bold text-bus-primary">${booking.totalFare}</span></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Seats</div>
                  <div className="font-medium">{booking.seats.sort((a, b) => a - b).join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Seat Count</div>
                  <div className="font-medium">{booking.seats.length} Seats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
