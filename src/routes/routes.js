import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Auth from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import Wishlist from "../pages/wishlist/Wishlist";

const routes = (
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/user" element={<Layout />} >
            <Route path="/user/" element={<Home />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
        </Route>
    </Routes>
);

export default routes;