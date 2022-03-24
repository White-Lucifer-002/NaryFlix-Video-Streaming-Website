import React from 'react';
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import "./Navbar.css"

export const SideBarData = [
    {
        title: "Movies",
        path: "/movies",
        icon: <MdIcons.MdLocalMovies/>,
        className: 'nav-text'
    },
    {
        title: "Series",
        path: "/series",
        icon: <MdIcons.MdWebAsset/>,
        className: 'nav-text'
    },
    {
        title: "About",
        path: "/about",
        icon: <FcIcons.FcAbout/>,
        className: 'nav-text'
    },
    {
        title: "Subscription",
        path: "/subs",
        icon: <i class="fas fa-rupee-sign"></i>,
        className: 'nav-text'
    }
];