import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Home, NotFound, Signin, Signup, Users } from "./pages";
import { Header, Foot } from "./components";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Foot />
    </BrowserRouter>
  );
}
