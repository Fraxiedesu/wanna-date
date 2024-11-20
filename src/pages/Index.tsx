import { useState } from 'react';
import { toast } from 'sonner';

const Index = () => {
  const [step, setStep] = useState(1);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });

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
    toast.success("Perfect! Can't wait! 💖");
    console.log("Selected DateTime:", dateTime);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md text-center animate-float">
        {step === 1 && (
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl text-deepPink mb-8">
              You wanna meet up? :3
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleYes}
                className="btn btn-primary"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="btn btn-secondary"
              >
                No
              </button>
            </div>
          </div>
        )}

        {step === 0 && (
          <div>
            <h1 className="text-4xl md:text-5xl text-deepPink">
              Aww... Oki :<
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
                  className="input-date w-full"
                  value={dateTime.date}
                  onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
                <input
                  type="time"
                  className="input-date w-full"
                  value={dateTime.time}
                  onChange={(e) => setDateTime({ ...dateTime, time: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;