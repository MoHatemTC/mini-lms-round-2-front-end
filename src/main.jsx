import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import { injectStore, injectAuthActions } from "./services/axios.js";
import { refreshAccessToken, logout } from "./features/auth/authThunks.js";
import "./styles/index.css"

// Inject store and auth actions into axios interceptors
injectStore(store);
injectAuthActions({ refreshAccessToken, logout });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
