import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface SpecificLocationPickerProps {
  selectedCity: string;
  selectedLocations: string[];
  onLocationToggle: (location: string) => void;
  onSubmit: () => void;
}

export const SpecificLocationPicker = ({
  selectedCity,
  selectedLocations,
  onLocationToggle,
  onSubmit,
}: SpecificLocationPickerProps) => {
  const locationOptions = {
    'Caloocan': ["My house", "Street foods", "SM Caloocan", "Jollibee", "Mang Inasal"],
    'Quezon City': ["SM Fairview", "K-Mart", "Fairview Terraces", "Robinson"],
    'Bulacan': ["SM tungko", "Starmall", "Gumaoc", "Harmony"]
  };

  const handleSubmit = () => {
    if (selectedLocations.length === 0) {
      toast.error("Please select at least one location!");
      return;
    }
    onSubmit();
    toast("Now, let's decide what to eat! 🍽️");
  };

  return (
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
                onCheckedChange={() => onLocationToggle(location)}
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
            onClick={handleSubmit}
            className="w-full mt-4 bg-pink-400 hover:bg-pink-500"
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};