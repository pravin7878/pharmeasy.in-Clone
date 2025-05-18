import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nevbar from "./Nevbar";
import Footer from './Footer';

const Layout = () => {
    const location = useLocation()

    const hiddenHeaderRoutes = ["/singin", "singup"]
    const shouldHide = hiddenHeaderRoutes.includes(location.pathname)
    return (
        <>
            {!shouldHide && <Nevbar />}
            <>
                 <Outlet />
            </>
            <Footer />
        </>
    );
};

export default Layout;