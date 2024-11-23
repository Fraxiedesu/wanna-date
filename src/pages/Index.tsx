import React, { useState } from 'react';
import { InitialQuestion } from '@/components/steps/InitialQuestion';
import { DateTimePicker } from '@/components/steps/DateTimePicker';
import { LocationPicker } from '@/components/steps/LocationPicker';
import { SpecificLocationPicker } from '@/components/steps/SpecificLocationPicker';
import { FoodPicker } from '@/components/steps/FoodPicker';
import { DrinkPicker } from '@/components/steps/DrinkPicker';
import { FinalCard } from '@/components/steps/FinalCard';
import { toast } from "sonner";

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycby2VlJJHQsYweuK6ImKR-e8KT8L4YhhEmzQBD4KxD8lOZWYBCPLGBWgr3JA-gmf_tQV5A/exec';

const Index = () => {
  const [step, setStep] = useState(1);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedDrink, setSelectedDrink] = useState('');

  const handleNo = () => setStep(0);
  const handleYes = () => setStep(2);
  const handleDateTimeSubmit = () => setStep(3);
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedLocations([]);
    setStep(4);
  };
  
  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };
  
  const handleLocationSubmit = () => setStep(5);
  
  const handleFoodToggle = (food: string) => {
    setSelectedFoods(prev =>
      prev.includes(food)
        ? prev.filter(f => f !== food)
        : [...prev, food]
    );
  };
  
  const handleFoodSubmit = () => setStep(6);
  
  const handleDrinkSelect = (drink: string) => setSelectedDrink(drink);
  
  const handleDrinkSubmit = async () => {
    if (GOOGLE_SHEET_URL) {
      try {
        const response = await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          body: JSON.stringify({
            date: dateTime.date,
            time: dateTime.time,
            locations: selectedLocations.join(', '),
            foods: selectedFoods.join(', '),
            drink: selectedDrink
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to save responses');
        }
        
        toast.success("Responses saved successfully!");
      } catch (error) {
        console.error('Error saving responses:', error);
        toast.error("Couldn't save responses, but don't worry - the date is still on! 😊");
      }
    }
    
    setStep(7);
  };

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-6">
      <div className="w-full max-w-md animate-in fade-in-50">
        {step === 1 && (
          <InitialQuestion onYes={handleYes} onNo={handleNo} />
        )}

        {step === 0 && (
          <div>
            <h1 className="text-4xl md:text-5xl text-deepPink">
              {"Aww... Oki :<"}
            </h1>
          </div>
        )}

        {step === 2 && (
          <DateTimePicker
            dateTime={dateTime}
            setDateTime={setDateTime}
            onSubmit={handleDateTimeSubmit}
          />
        )}

        {step === 3 && (
          <LocationPicker
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
          />
        )}

        {step === 4 && (
          <SpecificLocationPicker
            selectedCity={selectedCity}
            selectedLocations={selectedLocations}
            onLocationToggle={handleLocationToggle}
            onSubmit={handleLocationSubmit}
          />
        )}

        {step === 5 && (
          <FoodPicker
            selectedFoods={selectedFoods}
            onFoodToggle={handleFoodToggle}
            onSubmit={handleFoodSubmit}
          />
        )}

        {step === 6 && (
          <DrinkPicker
            selectedDrink={selectedDrink}
            onDrinkSelect={handleDrinkSelect}
            onSubmit={handleDrinkSubmit}
          />
        )}

        {step === 7 && (
          <FinalCard
            dateTime={dateTime}
            selectedLocations={selectedLocations}
            selectedFoods={selectedFoods}
            selectedDrink={selectedDrink}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
