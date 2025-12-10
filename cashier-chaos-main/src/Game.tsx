import { CenterLoading, GameServiceProps, GameServiceWrapper, useComponentRefresh } from "gamez";
import { useEffect, useState } from "react";
import { CashierChaos, emptyCash } from "./CashierChaos";
import { Instructions } from "./components/Instructions";

let isInstructionsShownAlready = false; 
function GameComponent({ gs }: GameServiceProps) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [showInstructions, setShowInstruction] = useState(!isInstructionsShownAlready);

  const refresh = useComponentRefresh();

  useEffect(() => {
    // wait for assets to be loaded
    gs.preloadAssets()
      .then(() => {
        const { lives } = gs.getCurrLevelDetails();
        gs.initState({
          cash: emptyCash(),
          customer: 0,
          remainingLives: lives,
        });
                

        gs.addSessionEndListner((result: string) => {
          const report = gs.collectReport({
            level: gs.getCurrLevel(),
            result,
          });
        
          gs.saveReport(report);
          
          // Show appropriate message with play again prompt
          let message = "";
          if (result === "success") {
            message = "🎉 Level Complete! Great job!\n\nDo you want to play again?";
          } else if (result === "error") {
            message = "❌ Game Over! You ran out of lives.\n\nDo you want to play again?";
          } else if (result === "timeout") {
            message = "⏰ Time's Up! You ran out of time.\n\nDo you want to play again?";
          }
          
          const playAgain = confirm(message);  // <-- This gives OK/Cancel buttons
          
          if (playAgain) {
            // User clicked OK - restart game
            isInstructionsShownAlready = true;
            
            gs.resetSession();
            
            const { lives } = gs.getCurrLevelDetails();
            gs.initState({
              cash: emptyCash(),
              customer: 0,
              remainingLives: lives,
            });
            
            setIsGameReady(false);
            setTimeout(() => {
              setIsGameReady(true);
              refresh();
            }, 100);
          }
          // If playAgain is false (user clicked Cancel), do nothing
        });

        setIsGameReady(true);
      })
      .catch(() => {
        // handle asset loading error
        alert("error");
      });

    return () => {
      // reset the game when component unmounts
      gs.resetSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInstructionsShownAlready && !isGameReady) {
    return <Instructions onStart={() => {
      isInstructionsShownAlready = true;
      refresh();  // Trigger re-render after marking as shown
    }} />;
  } else if (!isGameReady) {
    return <CenterLoading />;
  } else if (gs.isGameComplete()) {
    return <h1>Game Over!</h1>;
  }

  return (
    <GameServiceWrapper gs={gs}>
      <CashierChaos />
    </GameServiceWrapper>
  );;
}

// whatever you do just make sure you export this
export default GameComponent;
