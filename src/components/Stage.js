import React from "react";

//style
import { StyledStage } from "./styles/StyledStage";

import Cell from "./Cell";

const Stage = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, index) => <Cell key={index} type={cell[0]}></Cell>)
      )}
    </StyledStage>
  );
};

export default Stage;
