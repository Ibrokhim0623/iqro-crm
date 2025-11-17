import { BrowserRouter } from "react-router-dom";
import RootRouting from "./routing/root-routing";
import { Provider } from "react-redux";

import { store } from "./store/store";

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
