import React from 'react';
import {createBrowserRouter} from "react-router-dom"
import Home from '../pagas/Home';
import Layout from '../components/Layout';

const Allroutes = createBrowserRouter([
    {
        path : "/",
        element :<Layout/>,
        children : [
            {
                index : true,
                element : <Home/>
            }
        ]
    },
    // {
    //     path : "/"
    // }

])

export default Allroutes;