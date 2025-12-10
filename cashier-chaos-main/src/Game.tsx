import { CenterLoading, GameServiceProps, GameServiceWrapper, useComponentRefresh } from "gamez";
import { useEffect, useState } from "react";
import { CashierChaos, emptyCash } from "./CashierChaos";
import { Instructions } from "./components/Instructions";

let isInstructionsShownAlready = false;

function GameComponent({ gs }: GameServiceProps) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); // Start with true
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
          
          const currentLevel = gs.getCurrLevel();
          const totalLevels = 8;
          
          let message = "";
          if (result === "success") {
            if (currentLevel + 1 < totalLevels) {
              message = `🎉 Level ${currentLevel + 1} Complete! Great job!\n\nReady for Level ${currentLevel + 2}?`;
            } else {
              message = `🎉 Congratulations! You beat all ${totalLevels} levels!\n\nPlay again from Level 1?`;
            }
          } else if (result === "error") {
            message = `❌ Game Over! You ran out of lives.\n\nTry Level ${currentLevel + 1} again?`;
          } else if (result === "timeout") {
            message = `⏰ Time's Up! You ran out of time.\n\nTry Level ${currentLevel + 1} again?`;
          }
          
          const playAgain = confirm(message);
          
          if (playAgain) {
            if (result === "success" && currentLevel + 1 < totalLevels) {
              gs.nextLevel();
            } else if (result === "success") {
              gs.resetSession();
            }
            
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
        });

        setIsGameReady(true);
      })
      .catch(() => {
        alert("error");
      });

    return () => {
      gs.resetSession();
    };
  }, []);

  // Check instructions first
  if (showInstructions && !isInstructionsShownAlready) {
    return <Instructions onStart={() => {
      isInstructionsShownAlready = true;
      setShowInstructions(false);
      refresh();
    }} />;
  }
  
  // Then check if game is ready
  if (!isGameReady) {
    return <CenterLoading />;
  }
  
  // Then check if game is complete
  if (gs.isGameComplete()) {
    return <h1>🎉 You completed all levels! Refresh to play again.</h1>;
  }

  return (
    <GameServiceWrapper gs={gs}>
      <CashierChaos />
    </GameServiceWrapper>
  );
}

export default GameComponent;