"use client";

import { ReactNode, useRef } from "react";
import { AppStore, makeStore } from "./store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const ref = useRef<AppStore>();
  if (!ref.current) {
    ref.current = makeStore();
  }
  return <Provider store={ref.current}>{children}</Provider>;
}
