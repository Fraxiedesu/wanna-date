import React, { useState } from 'react';
import { InitialQuestion } from '@/components/steps/InitialQuestion';
import { DateTimePicker } from '@/components/steps/DateTimePicker';
import { LocationPicker } from '@/components/steps/LocationPicker';
import { SpecificLocationPicker } from '@/components/steps/SpecificLocationPicker';
import { FoodPicker } from '@/components/steps/FoodPicker';
import { DrinkPicker } from '@/components/steps/DrinkPicker';
import { FinalCard } from '@/components/steps/FinalCard';

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
  const handleDrinkSubmit = () => {
    // Here you can handle the final submission with all selections
    console.log({
      dateTime,
      selectedCity,
      selectedLocations,
      selectedFoods,
      selectedDrink
    });
    setStep(7);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md text-center animate-in fade-in-50">
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