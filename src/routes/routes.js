import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";

const routes = (
    <Routes>
        <Route path="/" element={<Login />} />
    </Routes>
);

export default routes;