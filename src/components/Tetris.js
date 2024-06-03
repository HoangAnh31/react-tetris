import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

//styles components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

//Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");
  console.log(`player : x : ${player.pos.x} - y : ${player.pos.y}`);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    console.log("test");
    //reset everything
    setStage(createStage);
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      //left
      if (keyCode === 37) {
        movePlayer(-1);
      }
      //right
      else if (keyCode === 39) {
        movePlayer(1);
      }
      //down
      else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage}></Stage>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over"></Display>
          ) : (
            <div>
              <Display text="Score"></Display>
              <Display text="Row"></Display>
              <Display text="Level"></Display>
            </div>
          )}
          <StartButton callback={startGame}></StartButton>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
