import { Card, CardContent } from "@/components/ui/card";

interface FinalCardProps {
  dateTime: { date: string; time: string };
  selectedLocations: string[];
  selectedFoods: string[];
  selectedDrink: string;
}

export const FinalCard = ({ dateTime, selectedLocations, selectedFoods, selectedDrink }: FinalCardProps) => {
  const formattedDate = new Date(dateTime.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const locations = selectedLocations.join(", ");
  const foods = selectedFoods.join(", ");

  return (
    <div className="space-y-8">
      <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
        Alright! All set! ^^
      </h1>
      <Card className="bg-pink-50 border-pink-200">
        <CardContent className="pt-6 text-lg space-y-4">
          <p>
            Don't forget ha! {locations} on {formattedDate} at {dateTime.time}!
          </p>
          <p>I'll be waiting!</p>
          <p>
            I've took note of everything, {foods} and {selectedDrink}, yea?
          </p>
          <p className="font-semibold text-pink-500">I gotchu! 💖</p>
        </CardContent>
      </Card>
    </div>
  );
};