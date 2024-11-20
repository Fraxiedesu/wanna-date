import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface LocationPickerProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

export const LocationPicker = ({ selectedCity, onCitySelect }: LocationPickerProps) => {
  const locationOptions = {
    'Caloocan': ["My house", "Street foods", "SM Caloocan", "Jollibee", "Mang Inasal"],
    'Quezon City': ["SM Fairview", "K-Mart", "Fairview Terraces", "Robinson"],
    'Bulacan': ["SM tungko", "Starmall", "Gumaoc", "Harmony"]
  };

  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    toast(`Great choice! Let's pick specific locations in ${city}! 🌟`);
  };

  return (
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
  );
};