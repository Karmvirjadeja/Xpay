import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Signup } from "../src/pages/Signup";
import { Signin } from "../src/pages/Signin";
import { Dashboard } from "../src/pages/Dashboard";
import { SendMoney } from "../src/pages/SendMoney";

import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/send" element={<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
