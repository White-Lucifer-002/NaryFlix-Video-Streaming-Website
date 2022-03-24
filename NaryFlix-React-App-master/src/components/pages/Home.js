import React, { useContext } from 'react'
import { Context } from '../../Context/Context';
import cover from "./bg-3.png";
import "./home_style.css";
import { Link } from "react-router-dom";

function Home() {
    //Theme
    const { theme, islogin } = useContext(Context);
    //THeme logic
    let hom = { color: "black" };

    if (theme === " light") {
        hom = { color: "black" };
    }

    if (theme === "dark") {
        hom = { color: "white" };

    }
    return (
        <div className="container cont-home" style={hom}>
            <div className="flexy">
                <div className="left-home">
                    <img src={cover} className="image_3" alt="" />
                </div>
                <div className="right-home">
                    <p className="p_2">
                        {islogin==="none"?
                        <h1 className="ft_5">
                            Welcome to Nary Flix
                        </h1>:
                        <p className="ft_5">
                            <h1 className="ifloggedin">Hi, {islogin}</h1>
                            <h3 className="welcome_msg">Welcome back to Nary Flix</h3>
                        </p>
                        }

                        <div className="ft_6">
                            Enjoy exclusive shows and series only available in Nary Flix
                            along with 1000+ movies and TV shows.
                        </div>
                    </p>
                </div>
            </div>

            {islogin==="none"?
            <div className="flexy-btn">
                <div className="btn-left">
                    <div className="ft_7">
                        <Link to="subs" className="btn">
                            <button type="button" className="btn_2">Subscribe Now!</button>
                        </Link>
                    </div>
                </div>
                <div className="btn-right">
                    <Link to="/signin" className="btnn">
                        <button type="button" className="btn_2">Sign IN</button>
                    </Link>
                </div>
            </div>:
            <div className="flexy-btn">
                <div className="btn-left" style={{"marginTop": "30px"}}>
                    <div className="ft_7">
                        <Link to="/movies" className="btn">
                            <button type="button" className="btn_2">Recommended watch</button>
                        </Link>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Home
