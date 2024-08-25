import "./App.css";
//import EmployerPage from './Pages/EmployerPage';

import { Outlet } from "react-router-dom";

import { useState } from "react";
import Header_2 from "./Header/Header_2";
import Footer from "./Footer/Foooter";
import { Container } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* <Header_2/> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
