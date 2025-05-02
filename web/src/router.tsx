import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import AboutUs from "./pages/AboutUs.tsx";
import Home from "./pages/Home.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "about", element: <AboutUs /> },
      { path: "/", element: <Home /> },
    ],
  },
]);
