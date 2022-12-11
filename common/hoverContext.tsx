import React, { useState, createContext } from "react";

interface HoverContext {
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

const HoverContext = createContext<HoverContext>({
  hover: false,
  setHover: () => {},
});

export const HoverProvider = ({ children }: { children?: React.ReactNode }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <HoverContext.Provider
      value={{
        hover,
        setHover,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
};

interface HoverConsumerProps {
  children: (value: any) => React.ReactNode;
}

export const HoverConsumer = ({ children }: HoverConsumerProps) => (
  <HoverContext.Consumer>
    {({ hover, setHover }) => children({ hover, setHover })}
  </HoverContext.Consumer>
);
