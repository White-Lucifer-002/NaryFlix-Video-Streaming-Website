import React, { useContext, useState, useEffect} from 'react';
import "./sign_style.css";
import { Context } from '../../Context/Context';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Signin = () => {
    //Theme
    const { theme, setislogin, setcompleteProfile} = useContext(Context);
    //Theme logic
    let font_col = { color: "white" };

    if (theme === "light") {
        font_col = { color: "black" };
    }
    if (theme === "dark") {
        font_col = { color: "white" };
    }

    const [alert_message, setalert_message] = useState("Don't have an account?");
    const [alert_variant, setalert_variant] = useState("info");

    function alert_msg_changer(msg, varr){
        setalert_message(msg);
        setalert_variant(varr);
        setTimeout(() => {
            setalert_message("Don't have an account?");
            setalert_variant("info");
        }, 2000);
    }

const signin_chk = async () => {
    const usr = document.getElementById("mail");
    const pw = document.getElementById('pwd');

    if (!usr.value) {
        usr.focus();
        return false;
    }
    if (!pw.value) {
        pw.focus();
        return false;
    }
    const username = usr.value;
    const pwd = pw.value;

    //If all succeeded
    if(localStorage.token === "none"){
        const result = await fetch('http://localhost:5500/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                pwd
            })
        }).then((res) => res.json()).catch((err)=>{
            console.log(err);
        })

        if (result.status === 'ok') {
            localStorage.setItem('token', result.tok);
            setislogin(username);
            setcompleteProfile({username: result.username, 
                email: result.email,
                phone: result.phone, 
                dj: result.dj, 
                subsPlan: result.subsPlan
              });
            alert_msg_changer("Successfully logged in", "success");
            usr.value="";
            pw.value="";
        }

        if (result.status === 'error') {
            alert_msg_changer("Invalid credentials", "danger");
        }

        console.log(result);
    }

}

return (
    <div>
        <center>
            <div class="box">
                <div className="box-title">
                    <h2 class="box-title" style={font_col}>SIGN IN</h2>
                </div>
                <Alert style={{ "margin": "15px" }} variant={alert_variant}>
                    <p className="m-auto">{alert_message} {alert_message === "Don't have an account?" ? <Link to="/signup">sign up</Link> : ""}</p>
                </Alert>

                <form name="Signin_form">

                    <br /><br />
                    <label style={font_col}>Username:</label><input id="mail" type="text" name="user_name" placeholder="Your Username" />

                    <br /><br /><br />
                    <label style={font_col}>Password:</label><input id="pwd" type="password" name="pwd" placeholder="Password" />

                    <br /><br /><br /><br />
                    <center>
                        <button className="but" type="button" onClick={signin_chk}>Sign in</button>
                    </center>
                </form>
            </div>
        </center>
    </div>
)
}

export default Signin
