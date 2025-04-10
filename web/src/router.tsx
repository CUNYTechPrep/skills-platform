import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import AboutUs from "./pages/AboutUs.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /* This is where the LandingPage and other pages will be rendered */
    children: [
      // { path: "/", element: <LandingPage /> },
      { path: "about", element: <AboutUs /> },
    ],
  },
]);
