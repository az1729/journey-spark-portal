
import React from 'react';
import Header from '@/components/Header';
import BookingSuccess from '@/components/BookingSuccess';

const BookingSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-bus-primary mb-2">Booking Complete</h1>
            <p className="text-gray-600">
              Your bus tickets have been successfully booked
            </p>
          </div>
          
          <BookingSuccess />
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

export default BookingSuccessPage;
