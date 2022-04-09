import React from "react";
import { Route, Routes } from "react-router-dom";
// Import pages and layout
import Layout from "../layout/Layout";
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import Preview from "../pages/preview/Preview";
import Wishlist from "../pages/wishlist/Wishlist";

const routes = (
  <Routes>
    {/* Authenication Route */}
    <Route path="/" element={<Auth />} />
    <Route path="/auth" element={<Auth />} />
    {/* User Route */}
    <Route path="/user" element={<Layout />}>
      <Route path="/user/" element={<Home />} />
      <Route path="/user/wishlist" element={<Wishlist />} />
    </Route>
    {/* Cat Route */}
    <Route path="/cat" element={<Layout />}>
      <Route path="/cat/:id/preview/" element={<Preview />} />
    </Route>
  </Routes>
);

export default routes;
