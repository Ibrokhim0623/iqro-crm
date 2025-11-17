import type { ReactNode } from "react";
import type { RootState } from "./store";
import { useAppSelector } from "@hooks/redux-hooks";

interface IProps<T> {
  children: (state: T) => ReactNode;
  selector: (state: RootState) => T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const State = <T, _>({ children, selector }: IProps<T>) => {
  const state = useAppSelector(selector);

  return children(state);
};
