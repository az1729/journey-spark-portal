
import React from 'react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { Bus, Clock, Calendar } from 'lucide-react';

const BusList = () => {
  const { buses, selectBus } = useBooking();
  const navigate = useNavigate();

  const handleBookNow = (bus) => {
    selectBus(bus);
    navigate('/select-seats');
  };

  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div key={bus.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-5 h-5 text-bus-primary" />
                  <h3 className="text-lg font-semibold text-bus-primary">{bus.busNumber}</h3>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-gray-600 mb-3">
                  <div className="font-medium">
                    {bus.source} to {bus.destination}
                  </div>
                  <div className="hidden md:block text-gray-400">•</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{bus.date}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-bus-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{bus.departureTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Arrival</div>
                      <div className="font-medium">{bus.arrivalTime}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-bus-primary">${bus.seatPrice}</div>
                <div className="text-sm text-gray-500">per seat</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center pt-4 border-t">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{bus.availableSeats}</span> seats available out of {bus.totalSeats}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-bus-secondary h-2 rounded-full" 
                    style={{ width: `${(bus.availableSeats / bus.totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <Button 
                className="bg-bus-primary hover:bg-bus-primary/90 text-white"
                onClick={() => handleBookNow(bus)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusList;
