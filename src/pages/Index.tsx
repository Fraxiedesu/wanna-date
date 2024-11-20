import React, { useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [step, setStep] = useState(1);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

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

  const locationOptions = {
    'Caloocan': ["My house", "Street foods", "SM Caloocan", "Jollibee", "Mang Inasal"],
    'Quezon City': ["SM Fairview", "K-Mart", "Fairview Terraces", "Robinson"],
    'Bulacan': ["SM tungko", "Starmall", "Gumaoc", "Harmony"]
  };

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
              <CardContent className="pt-6">
                <RadioGroup 
                  onValueChange={handleCitySelect}
                  className="space-y-4"
                >
                  {Object.keys(locationOptions).map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={city} 
                        id={city}
                        className="border-pink-300 text-pink-500"
                      />
                      <Label htmlFor={city} className="text-lg">{city}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              where exactly? ^^
            </h1>
            <Card className="border-pink-100">
              <CardContent className="pt-6">
                <div className="space-y-4">
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
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;