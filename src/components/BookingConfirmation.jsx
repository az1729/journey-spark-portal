
import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const BookingConfirmation = () => {
  const { selectedBus, selectedSeats, getTotalFare, confirmBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!selectedBus || selectedSeats.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-xl">No seats selected</div>
        <Button 
          className="mt-4 bg-bus-primary hover:bg-bus-primary/90"
          onClick={() => navigate('/select-seats')}
        >
          Go back to seat selection
        </Button>
      </div>
    );
  }

  const totalFare = getTotalFare();
  const canProceed = user && user.walletBalance >= totalFare;

  const handleConfirm = () => {
    const success = confirmBooking();
    if (success) {
      navigate('/booking-success');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b px-6 py-4">
        <h3 className="text-xl font-semibold">Review Your Booking</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Bus Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="text-gray-500">Bus Number:</span>
                <span className="ml-2 font-medium">{selectedBus.busNumber}</span>
              </div>
              <div>
                <span className="text-gray-500">Route:</span>
                <span className="ml-2 font-medium">{selectedBus.source} to {selectedBus.destination}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="ml-2 font-medium">{selectedBus.date}</span>
              </div>
              <div>
                <span className="text-gray-500">Departure:</span>
                <span className="ml-2 font-medium">{selectedBus.departureTime}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Booking Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div>
                <span className="text-gray-500">Selected Seats:</span>
                <span className="ml-2 font-medium">
                  {selectedSeats.sort((a, b) => a - b).join(', ')}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Number of Seats:</span>
                <span className="ml-2 font-medium">{selectedSeats.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Price per Seat:</span>
                <span className="ml-2 font-medium">${selectedBus.seatPrice}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="text-gray-800 font-semibold">Total Fare:</span>
                <span className="ml-2 font-bold text-lg text-bus-primary">${totalFare}</span>
              </div>
            </div>
          </div>
        </div>
        
        {user ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-700">Payment Details</h4>
                <div className="text-sm text-gray-500">Amount will be deducted from your wallet</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Current Balance</div>
                <div className="font-bold text-lg">${user.walletBalance}</div>
              </div>
            </div>
            
            {!canProceed && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start gap-2">
                <X className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Insufficient balance</div>
                  <div className="text-sm">You need ${totalFare} for this booking, but your wallet only has ${user.walletBalance}.</div>
                </div>
              </div>
            )}
            
            {canProceed && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-start gap-2">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Sufficient balance</div>
                  <div className="text-sm">Your wallet has sufficient balance for this booking.</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 flex items-start gap-2">
            <div>
              <div className="font-medium">Login Required</div>
              <div className="text-sm">You must be logged in to complete this booking.</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/select-seats')}
        >
          Back
        </Button>
        
        <Button 
          disabled={!canProceed}
          className="bg-bus-primary hover:bg-bus-primary/90 disabled:bg-gray-300 disabled:text-gray-500"
          onClick={handleConfirm}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
