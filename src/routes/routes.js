import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/home/Home";

const routes = (
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Dashboard />} />
    </Routes>
);

export default routes;