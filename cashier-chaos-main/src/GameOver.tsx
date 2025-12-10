import { Button } from "gamez";

interface GameOverProps {
  result: "success" | "error" | "timeout";
  level: number;
  onRestart: () => void;
  onNextLevel: () => void;
}

export function GameOver({ result, level, onRestart, onNextLevel }: GameOverProps) {
  const isSuccess = result === "success";
  
  return (
    <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-75">
      <div className="p-8 text-center bg-white rounded-3xl">
        <h1 className="mb-4 text-5xl font-bold">
          {isSuccess ? "🎉 Level Complete!" : "❌ Game Over!"}
        </h1>
        
        <p className="mb-6 text-2xl">
          {isSuccess && `You completed Level ${level + 1}!`}
          {result === "error" && "You ran out of lives!"}
          {result === "timeout" && "Time's up!"}
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={onRestart}
            className="px-8 py-3 text-xl bg-red-500 hover:bg-red-600 text-white rounded-xl"
          >
            Restart Level
          </Button>
          
          {isSuccess && (
            <Button
              onClick={onNextLevel}
              className="px-8 py-3 text-xl bg-green-500 hover:bg-green-600 text-white rounded-xl"
            >
              Next Level
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}