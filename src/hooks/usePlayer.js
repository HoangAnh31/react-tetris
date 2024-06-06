import { useCallback, useState } from "react";

import { randomTetromino, TETROMINOS } from "../tetrominos";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";
import Stage from "../components/Stage";

const INITIAL_PLAYER = {
  pos: { x: 0, y: 0 },
  tetromino: TETROMINOS[0].shape,
  collided: false,
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(INITIAL_PLAYER);

  const rotate = (matrixTetromino, dir) => {
    //make the rows to become cols
    const rotatedTetro = matrixTetromino.map((_, index) =>
      matrixTetromino.map((col) => col[index])
    );
    console.log(dir);
    console.log(rotatedTetro);

    //reverse each row to get rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonePlayer = JSON.parse(JSON.stringify(player));

    clonePlayer.tetromino = rotate(clonePlayer.tetromino, dir);

    const pos = clonePlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonePlayer, stage, { x: 0, y: 0 })) {
      clonePlayer.pos.x += offset;
      offset = -(offset + offset > 0 ? 1 : -1);
      if (offset > clonePlayer.tetromino[0].length) {
        rotate(clonePlayer.tetromino, -dir);
        clonePlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonePlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
