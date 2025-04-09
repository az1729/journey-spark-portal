
import React from 'react';
import { Check } from 'lucide-react';

const BookingStepper = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Select Bus' },
    { id: 2, label: 'Choose Seats' },
    { id: 3, label: 'Confirm' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div 
              key={step.id} 
              className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className={`step-counter border-2 ${isActive ? 'border-bus-primary' : isCompleted ? 'border-bus-secondary' : 'border-gray-300'}`}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="step-name text-sm font-medium mt-2">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
