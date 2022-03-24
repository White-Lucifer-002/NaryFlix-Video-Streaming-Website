import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/Context';
import "./profile.css";
import profpic from "./man.png";
import { Link } from "react-router-dom";

const Profile = () => {
    const { completeProfile } = useContext(Context);

    const [prf_usr, setprf_usr] = useState("----");
    const [prfMail, setprfMail] = useState("---@mail.com---");
    const [prfPhn, setprfPhn] = useState("0000000000");
    const [prfDOJ, setprfDOJ] = useState("07-04-2001");
    const [planType, setplanType] = useState("Loading");
    const [render, setrender] = useState(0);

    //Fetch the profile details from the database
    const fetchProfile = () => {
        //Load the details
        setprf_usr(completeProfile.username);
        console.log(prf_usr);
        setprfMail(completeProfile.email);
        setprfPhn(completeProfile.phone);
        setprfDOJ(completeProfile.dj);
        setplanType(completeProfile.subsPlan);
        setrender(render+1);
    }
    
    useEffect(() => {
        fetchProfile();
    },[]);


    
    //Theme
    const { theme } = useContext(Context);
    //Theme Logic
    let bg_col = { color: "black" };

    if (theme === "light") {
        bg_col = { color: "black" };
    }

    if (theme === "dark") {
        bg_col = {
            color: "white",
            "boxShadow": "3px 4px 8px 2px #ccff00"
        };

    }
    return (
        <div>
            <div class="profile-container">
                <div class="profile-card" style={bg_col}>
                    <img src={profpic} alt="profile" />
                    <h1>{prf_usr}</h1>
                    <p class="profile-title">Subsciption type : {planType}</p>
                    <p>Mail : {prfMail}</p>
                    <p>{prfDOJ}</p>
                    <p>Phone No: {prfPhn}</p>
                    <p><Link to="/subs" className="profile-btn">Change Subscription</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Profile
