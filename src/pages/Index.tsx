import React, { useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [step, setStep] = useState(1);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const handleNo = () => {
    setStep(0);
    toast("Maybe next time! 🥺");
  };

  const handleYes = () => {
    setStep(2);
    toast("Yay! Let's find a time! 🎉");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTime.date || !dateTime.time) {
      toast.error("Please select both date and time!");
      return;
    }
    setStep(3);
    toast.success("Perfect! Now let's pick a place! 💖");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedLocations([]);
    setStep(4);
    toast(`Great choice! Let's pick specific locations in ${city}! 🌟`);
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };

  const handleLocationSubmit = () => {
    if (selectedLocations.length === 0) {
      toast.error("Please select at least one location!");
      return;
    }
    setStep(5);
    toast("Now, let's decide what to eat! 🍽️");
  };

  const handleFoodToggle = (food: string) => {
    setSelectedFoods(prev =>
      prev.includes(food)
        ? prev.filter(f => f !== food)
        : [...prev, food]
    );
  };

  const handleFoodSubmit = () => {
    if (selectedFoods.length === 0) {
      toast.error("Please select at least one food!");
      return;
    }
    toast.success("Perfect! Everything is set! 🎉");
    // Handle final submission here
  };

  const locationOptions = {
    'Caloocan': ["My house", "Street foods", "SM Caloocan", "Jollibee", "Mang Inasal"],
    'Quezon City': ["SM Fairview", "K-Mart", "Fairview Terraces", "Robinson"],
    'Bulacan': ["SM tungko", "Starmall", "Gumaoc", "Harmony"]
  };

  const foodOptions = [
    { name: "Street foods", image: "photo-1498936178812-4b2e558d2937" },
    { name: "Burger", image: "photo-1568901346375-23c9450c58cd" },
    { name: "Fries", image: "photo-1630384060421-cb20d0e0649d" },
    { name: "Bread", image: "photo-1509440159596-0249088772ff" },
    { name: "Meal", image: "photo-1546069901-ba9599a7e63c" },
    { name: "Other", image: "photo-1606787366850-de6330128bfc" },
    { name: "Me", image: "photo-1535268647677-300dbf3d78d1" }
  ];

  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md text-center animate-in fade-in-50">
        {step === 1 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              You wanna meet up? :3
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleYes}
                className="bg-pink-400 hover:bg-pink-500 text-white"
              >
                Yes
              </Button>
              <Button
                onClick={handleNo}
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-50"
              >
                No
              </Button>
            </div>
          </div>
        )}

        {step === 0 && (
          <div>
            <h1 className="text-4xl md:text-5xl text-deepPink">
              {"Aww... Oki :<"}
            </h1>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              when u free? ^^
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="date"
                  className="w-full p-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={dateTime.date}
                  onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
                <input
                  type="time"
                  className="w-full p-2 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={dateTime.time}
                  onChange={(e) => setDateTime({ ...dateTime, time: e.target.value })}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pink-400 hover:bg-pink-500 text-white"
              >
                Submit
              </Button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              where u wanna go? ^^
            </h1>
            <Card className="border-pink-100">
              <div className="p-6 space-y-4">
                {Object.keys(locationOptions).map((city) => (
                  <Button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    variant="outline"
                    className="w-full"
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              where exactly? ^^
            </h1>
            <Card className="border-pink-100">
              <div className="p-6 space-y-4">
                {locationOptions[selectedCity as keyof typeof locationOptions]?.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={location}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => handleLocationToggle(location)}
                      className="border-pink-300 data-[state=checked]:bg-pink-500"
                    />
                    <label
                      htmlFor={location}
                      className="text-lg cursor-pointer"
                    >
                      {location}
                    </label>
                  </div>
                ))}
                <Button
                  onClick={handleLocationSubmit}
                  className="w-full mt-4 bg-pink-400 hover:bg-pink-500"
                >
                  Submit
                </Button>
              </div>
            </Card>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              what u wanna eat po? ^^
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {foodOptions.map((food) => (
                <div
                  key={food.name}
                  onClick={() => handleFoodToggle(food.name)}
                  className="relative cursor-pointer"
                >
                  <div
                    className={`
                      aspect-square rounded-lg overflow-hidden transition-all duration-300
                      ${selectedFoods.includes(food.name) ? 'ring-4 ring-pink-400' : 'grayscale'}
                    `}
                  >
                    <img
                      src={`https://source.unsplash.com/${food.image}`}
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {food.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleFoodSubmit}
              className="w-full mt-4 bg-pink-400 hover:bg-pink-500"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
