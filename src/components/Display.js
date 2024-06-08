import React from "react";

//style
import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ checkGameOver, text }) => {
  return <StyledDisplay stylegameover={checkGameOver}>{text}</StyledDisplay>;
};

export default Display;
