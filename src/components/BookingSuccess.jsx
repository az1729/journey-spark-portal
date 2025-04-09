
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Ticket } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your bus tickets have been booked successfully. You can view your booking details in the My Bookings section.
        </p>

        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-bus-primary hover:bg-bus-primary/90"
            onClick={() => navigate('/my-bookings')}
          >
            <Ticket className="w-4 h-4 mr-2" />
            View My Bookings
          </Button>
          
          <Button 
            variant="outline"
            className="w-full" 
            onClick={() => navigate('/')}
          >
            Book Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
