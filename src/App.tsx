import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import RootRouting from "@routing/root-routing";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRouting />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
