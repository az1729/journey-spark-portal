
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SeatLayout from '@/components/SeatLayout';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { toast } from "@/components/ui/use-toast";
import BookingStepper from '@/components/BookingStepper';

const SeatSelectionPage = () => {
  const { selectedBus, selectedSeats, getTotalFare } = useBooking();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!selectedBus) {
      toast({
        title: "No Bus Selected",
        description: "Please select a bus first",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [selectedBus, navigate]);

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to proceed",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/confirm-booking');
  };

  if (!selectedBus) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-bus-primary mb-2">Select Your Seats</h1>
            <p className="text-gray-600">
              {selectedBus.source} to {selectedBus.destination} • {selectedBus.date} • {selectedBus.departureTime}
            </p>
          </div>
          
          <BookingStepper currentStep={2} />
          
          <SeatLayout />
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              Back to Buses
            </Button>
            
            <Button 
              className="bg-bus-primary hover:bg-bus-primary/90"
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
            >
              {selectedSeats.length > 0 
                ? `Proceed to Pay $${getTotalFare()}`
                : 'Select Seats to Proceed'
              }
            </Button>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} JourneySpark Bus Booking Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SeatSelectionPage;
