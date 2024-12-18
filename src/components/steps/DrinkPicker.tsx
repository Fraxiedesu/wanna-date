import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DrinkPickerProps {
  selectedDrink: string;
  onDrinkSelect: (drink: string) => void;
  onSubmit: () => void;
}

export const DrinkPicker = ({ selectedDrink, onDrinkSelect, onSubmit }: DrinkPickerProps) => {
  const drinkOptions = [
    { name: "Water", image: "/water.jpg" },
    { name: "Soft drink", image: "/soft_drink.jpg" },
    { name: "Liquor", image: "/liquor.jpg" }
  ];

  const handleSubmit = () => {
    if (!selectedDrink) {
      toast.error("Please select a drink!");
      return;
    }
    onSubmit();
    toast.success("Perfect! Everything is set! 🎉");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
        which drink? ^^
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {drinkOptions.map((drink) => (
          <div
            key={drink.name}
            onClick={() => onDrinkSelect(drink.name)}
            className="relative cursor-pointer"
          >
            <div
              className={`
                aspect-square rounded-lg overflow-hidden transition-all duration-300
                ${selectedDrink === drink.name ? 'ring-4 ring-pink-400' : 'grayscale'}
              `}
            >
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {drink.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full mt-4 bg-pink-400 hover:bg-pink-500"
      >
        Submit
      </Button>
    </div>
  );
};