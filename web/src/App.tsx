import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Workspace from "./components /workspace/Workspace";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [apiData, setApiData] = useState("");

  /*useEffect(() => {
    fetch(import.meta.env.VITE_BASE_API_URL + "/api/test")
      .then((res) => res.json())
      .then((body) => setApiData(body.message));
  });*/

  return (
    <div className="app">
      <Workspace />
    </div>
  );
}

export default App;
