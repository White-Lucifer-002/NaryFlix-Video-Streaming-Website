import React, { useContext } from 'react';
import "./about-style.css";
import abt_pic from "./aboutus.png";
import { Context } from '../../../Context/Context';

const About = () => {
	//Theme
    const {theme} = useContext(Context);

	let them_col = {
		"color": "black"
	}

	//Theme-Logic
    if(theme === "light"){
        them_col = {
			"color": "black"
		}
    }
    if(theme === "dark"){
        them_col = {
			"color": "white"
		}
    }

	return (
		<div>
			<div className="abt-section" style={them_col}>
				<div className="abt-container">
					<div className="content-section">
						<div className="abt-title">
							<h1>About Us <span className="title-icon"><i className="fas fa-heart"></i></span></h1>
						</div>
						<div className="content">
							<h3>The works involved in this project.</h3>
							<p>
								This project is done by collaboratively with Me(Naresh) and Sriram. Technologies used in this project
								are <br /><br /> 1. HTML <br /> 2. CSS <br /> 3. Javascript <br /> 4. React(frontend library) <br />
								5. Express (backend) <br /> 6. MongoDB (Database).<br /><br />
							</p>
							<div className="src-button">
								<a href="https://github.com/Nary-Vip/NaryFlix-React-App" target="block">Source Code</a>
							</div>
						</div>
						<div className="social">
							<a href="https://www.github.com/Nary-Vip" target="block"><i className="fab fa-github"></i></a>
							<a href="https://www.twitter.com/naryvip" target="block"><i className="fab fa-twitter"></i></a>
							<a href="https://www.instagram.com/nary_vip" target="block"><i className="fab fa-instagram"></i></a>
						</div>
					</div>
					<div className="image-section">
						<img src={abt_pic} alt=""/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About