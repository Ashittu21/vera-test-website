import React, { createContext } from "react";

export const LevelContext = createContext(1);

export const HDown = (props) => {
  return (
    <LevelContext.Consumer>
      {(level) => (
        <LevelContext.Provider value={level + 1}>
          {props.children}
        </LevelContext.Provider>
      )}
    </LevelContext.Consumer>
  );
};
export const H = (props) => {
  return (
    <LevelContext.Consumer>
      {(level) => {
        const Heading = "h" + Math.min(level, 6);
        return <Heading {...props} />;
      }}
    </LevelContext.Consumer>
  );
};

export default H;
