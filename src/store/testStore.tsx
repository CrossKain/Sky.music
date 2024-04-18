import { RootState } from "./store";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/auth/AuthSlice";
import tracksSlice from "./features/tracks/tracksSlice";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";

const testStore = (preloadedState: Partial<RootState>) => {
  return configureStore({
    reducer: combineReducers({
      auth: AuthSlice,
      tracks: tracksSlice,
    }),
    preloadedState,
  });
};
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},

    store = testStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
