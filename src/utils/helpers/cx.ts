import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const cx = (...args: Parameters<typeof classNames>) =>
  twMerge(classNames(...args));
