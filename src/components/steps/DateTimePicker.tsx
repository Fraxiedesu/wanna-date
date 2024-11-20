import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DateTimePickerProps {
  dateTime: { date: string; time: string };
  setDateTime: (dateTime: { date: string; time: string }) => void;
  onSubmit: () => void;
}

export const DateTimePicker = ({ dateTime, setDateTime, onSubmit }: DateTimePickerProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTime.date || !dateTime.time) {
      toast.error("Please select both date and time!");
      return;
    }
    onSubmit();
    toast.success("Perfect! Now let's pick a place! 💖");
  };

  return (
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
  );
};