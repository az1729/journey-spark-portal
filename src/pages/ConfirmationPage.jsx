
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BookingStepper from '@/components/BookingStepper';
import BookingConfirmation from '@/components/BookingConfirmation';
import { useBooking } from '@/context/BookingContext';
import { toast } from "@/components/ui/use-toast";

const ConfirmationPage = () => {
  const { selectedBus, selectedSeats } = useBooking();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      toast({
        title: "Invalid Booking",
        description: "Please select a bus and seats first",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [selectedBus, selectedSeats, navigate]);

  if (!selectedBus || selectedSeats.length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-bus-primary mb-2">Confirm Your Booking</h1>
            <p className="text-gray-600">
              Review the details of your booking before confirming
            </p>
          </div>
          
          <BookingStepper currentStep={3} />
          
          <BookingConfirmation />
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

export default ConfirmationPage;
