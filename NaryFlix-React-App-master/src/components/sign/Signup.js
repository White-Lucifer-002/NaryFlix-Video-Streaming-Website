import React, { useContext, useState} from 'react';
import "./sign_style.css";
import { Context } from '../../Context/Context';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup = () => {
    //Theme
    const { theme } = useContext(Context);
    //Theme logic
    let font_col = {color : "white"};

    if(theme === "light"){
        font_col = {color : "black"};
    }
    if(theme === "dark"){
        font_col = {color : "white"};
    }
    const [alert_message, setalert_message] = useState("Already have a account?");
    const [alert_variant, setalert_variant] = useState("info");

    const Signup_valid = async() => {
        var username = document.getElementById("name_inp");
        var email = document.getElementById("mail_inp");
        var phone =  document.getElementById("no_inp");
        var pwd = document.getElementById("pwd_inp");

        if (username.value === "") {
            username.focus();
            return false;
        }

        if (email.value === "") {
            email.focus();
            return false;
        }

        if (email.value === "") {
            email.focus();
            return false;
        }

        if (phone.value === "") {
            phone.focus();
            return false;
        }

        if (pwd.value === "") {
            pwd.focus();
            return false;
        }

        let un = username.value;
        let em = email.value;
        let ph = phone.value;
        let pw = pwd.value;

        //If all succeeded
        const result = await fetch('http://localhost:5500/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                un,
                pw,
                em,
                ph
            })
        }).then((res) => res.json())

        if(result.status === "ok"){
            setalert_message("Account created");
            setalert_variant("success");
            setTimeout(() => {
                setalert_message("Already have a account?");
                setalert_variant("info");
                username.value="";
                phone.value="";
                email.value="";
                pwd.value="";
            }, 2000);

        }
        else{
            setalert_message("Account already exists with same credentials");
            setalert_variant("danger");
            setTimeout(() => {
                setalert_message("Already have a account?");
                setalert_variant("info");
            }, 2000);
            
            console.log(result.status)
            console.log(result.error);
        }
    }

    return (
        <div>
            <div className="singpage">
                <div className="box">
                    <h1 className="box-title">
                        <h2 className="header" style = {font_col}>SIGN UP</h2>
                    </h1>
                    <form name="Signup_form" encType="multipart/form-data">
                        <Alert style={{"margin": "15px"}} variant={alert_variant}>
                            <center><p className="m-auto">{alert_message} {alert_message==="Already have a account?"?<Link to="/signin">sign in</Link>:""}</p></center>
                        </Alert>
                        <br />
                        <center>
                        <label style = {font_col}>Name:</label><input id="name_inp" type="text" name="Name" placeholder="Name" style={{ padding: "10px 10px; width:180px" }} />

                        <br /><br /><br />
                        <label style = {font_col}>E-mail:</label><input id="mail_inp" type="text" name="Email" placeholder="example@gmail.com" style={{ padding: "10px 10px; width : 180px" }} />

                        <br /><br /><br />
                        <label style = {font_col}>Password:</label><input id="pwd_inp" type="password" name="pwd" placeholder="Enter password" style={{ padding: "10px 10px; width:180px" }} />

                        <br /><br /><br />
                        <label style = {font_col}>Contact no:</label><input id="no_inp" type="text" name="Contact_no" placeholder="Phone number" style={{ padding: "10px 10px; width:180px" }} />

                        <br /><br /><br /><br />
                        <center>
                            <button type="button" id="sub_btn" className="but" onClick={Signup_valid}>
                                Sign up
                            </button>
                        </center>
                        </center>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup


