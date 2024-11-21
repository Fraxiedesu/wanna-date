import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FoodPickerProps {
  selectedFoods: string[];
  onFoodToggle: (food: string) => void;
  onSubmit: () => void;
}

export const FoodPicker = ({ selectedFoods, onFoodToggle, onSubmit }: FoodPickerProps) => {
  const foodOptions = [
    { name: "Street foods", image: "/street_foods.jpg" },
    { name: "Burger", image: "/burger.jpg" },
    { name: "Fries", image: "/fries.jpg" },
    { name: "Bread", image: "/bread.jpg" },
    { name: "Meal", image: "/meal.jpg" },
    { name: "Other", image: "/other.jpg" },
    { name: "Me", image: "/me.jpg" }
  ];

  const handleSubmit = () => {
    if (selectedFoods.length === 0) {
      toast.error("Please select at least one food!");
      return;
    }
    onSubmit();
    toast("Now, let's pick a drink! 🥤");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
        what u wanna eat po? ^^
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {foodOptions.map((food) => (
          <div
            key={food.name}
            onClick={() => onFoodToggle(food.name)}
            className="relative cursor-pointer"
          >
            <div
              className={`
                aspect-square rounded-lg overflow-hidden transition-all duration-300
                ${selectedFoods.includes(food.name) ? 'ring-4 ring-pink-400' : 'grayscale'}
              `}
            >
              <img
                src={food.image}
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
        onClick={handleSubmit}
        className="w-full mt-4 bg-pink-400 hover:bg-pink-500"
      >
        Submit
      </Button>
    </div>
  );
};