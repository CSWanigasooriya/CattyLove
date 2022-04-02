import './Layout.css';
import React, { useEffect } from 'react';

import {
    BrowserRouter
} from "react-router-dom";
import routes from '../routes/routes';

function Layout() {

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )
}

export default Layout;