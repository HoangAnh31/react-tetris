import { useCallback, useState } from "react";

import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

const INITIAL_PLAYER = {
  pos: { x: 0, y: 0 },
  tetromino: TETROMINOS[0].shape,
  collided: false,
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(INITIAL_PLAYER);

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

  return [player, updatePlayerPos, resetPlayer];
};