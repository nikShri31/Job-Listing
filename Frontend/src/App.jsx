import "./App.css";
//import EmployerPage from './Pages/EmployerPage';

import { Outlet } from "react-router-dom";

import { Suspense, useState } from "react";
import Header_2 from "./Header/Header_2";
import Footer from "./Footer/Foooter";
import { Container, Typography } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header_2/>
      <main>
      <Suspense fallback={<Typography variant="h2"> Loading ...</Typography>}>
      <Outlet />
      </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
