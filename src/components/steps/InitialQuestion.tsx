import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InitialQuestionProps {
  onYes: () => void;
  onNo: () => void;
}

export const InitialQuestion = ({ onYes, onNo }: InitialQuestionProps) => {
  const handleNo = () => {
    onNo();
    toast("Maybe next time! 🥺");
  };

  const handleYes = () => {
    onYes();
    toast("Yay! Let's find a time! 🎉");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl md:text-5xl text-deepPink text-center">
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
  );
};