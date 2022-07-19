import { ReactElement } from "react";
import { ElementStates } from "./element-states";

export type TSymbol = {
    symbol: string;
    state: ElementStates;
};

export type TElement = {
    element: number;
    state: ElementStates;
};

export type TStackElement = {
    element: string;
    state: ElementStates;
    top: string;
};

export type TQueueElement = {
    element: string;
    state: ElementStates;
    head: string;
    tail: string;
};

export type TListElement = {
    element: string;
    state: ElementStates;
    head: string | ReactElement;
    tail: string | ReactElement;
};