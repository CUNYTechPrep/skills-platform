import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* This is where the Navbar and other components will be rendered */}
      <Outlet /> {/* This is where the child routes will be rendered */}
    </>
  );
}

export default App;
