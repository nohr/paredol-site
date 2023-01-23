"use client";

import React, { createContext } from "react";
export { default } from "./sfx.context";

export const SFXContext = createContext<SFXContextProps>({
    select: () => { },
    open: () => { },
    close: () => { },
    home: () => { },
    confirm: () => { },
    reset: () => { },
    audio: null,
});
