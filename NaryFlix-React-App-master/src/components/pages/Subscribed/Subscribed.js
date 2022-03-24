import React, { useContext, useState, useEffect } from 'react';
import "./subscibed.css";
import phn_pic from "./mobile.png";
import prem_pic from "./premium.png";
import { Context } from '../../../Context/Context';

const Subscribed = () => {
    //Theme
    const { theme, tkn, subscriptionPlan, setcompleteProfile, islogin, completeProfile } = useContext(Context);
    //Theme Logic
    let subs_th = { color: "black" };
    let subs_desc = { color: "black" };
     const [plan, setplan] = useState(completeProfile.subsPlan);

    if (theme === "light") {
        subs_th = { color: "black", border: "1px solid black" };
        subs_desc = { color: "black" };
    }
    if (theme === "dark") {
        subs_th = { color: "white", border: "1px solid white" };
        subs_desc = { color: "rgb(212, 205, 205)" };
    }

    const changeSubs = async () => {
        if (tkn) {
            try {
                const result = await fetch("http://localhost:5500/api/subs_chg", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tok_key: tkn,
                        subPlan: subscriptionPlan
                    })
                }).then((res) => {
                    res.json();
                })
                    .catch((err) => {
                        console.log(err);
                    })
                setcompleteProfile({
                    username: result.username,
                    email: result.email,
                    phone: result.phone,
                    dj: result.dj.slice(0, 10),
                    subsPlan: result.subsPlan
                });
                setplan(result.subsPlan);

            }
            catch (error) {
                console.log(error)
            }

        }

    }
    changeSubs();

    return (
        <div className="subs-master">
            <div className="subs-container" style={subs_th}>
                <div className="subs-left">
                    <img src={plan === "Mobile" ? phn_pic : prem_pic} alt="planPic" />
                </div>
                <div className="subs-right">
                    <h2 className="subs-right-title">
                        Hi, {islogin} !
                    </h2>
                    <p className="subs-right-desc" style={subs_desc}>
                        You have successfully subscribed to {plan} plan
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Subscribed
