import React, { useContext } from 'react';
import "./pricingCss.css";
import { Context } from '../../../Context/Context';
import premium from "./desktop.jpg";
import mobile from "./mobile.jpg";
import { Link } from "react-router-dom";

const Susbcription = () => {
	//Theme
	const { theme, subscriptionPlan, setsubscriptionPlan } = useContext(Context);

	//Theme Logic
	let bg_col = { color: "black" };
	let but_col = {
		color: "black"
	};

	if (theme === "light") {
		bg_col = { color: "black" };
		but_col = {
			color: "black"
		}
	}
	if (theme === "dark") {
		bg_col = { color: "white" };
		but_col = {
			color: "white"
		}
	}

	const sub2mob = ()=>{
		setsubscriptionPlan("Mobile");
	}
	
	const sub2prem = ()=>{
		setsubscriptionPlan("Premium");
	}

	return (
		<div className="subs-page" style={bg_col}>
			<div className="block">
				<div className="mobile-plan">
					<ul className="pricing p-green">
						<li><img src={mobile} alt=""></img></li>
						<li>
							<big>Mobile Plan</big>
						</li>
						<li>Videos can be streamed in Mobile devices</li>
						<li><span className="quality">Quality:</span><span className="qual"> HD</span></li>
						<li>
							<h3>199</h3>
							<span>per month</span>
						</li>
						<li>
							<Link className="button" onClick={sub2mob} to="/subscribed" style={but_col}>Join Now</Link>
						</li>
					</ul>
				</div>

				<div className="Premium-plan">
					<ul className="pricing p-yel">
						<li><img src={premium} alt=""></img></li>
						<li>
							<big>Premium Plan</big>
						</li>
						<li>Videos can be streamed in any smart devices</li>
						<li><span className="quality">Quality:</span><span className="qual"> Upto 4K</span></li>
						<li>
							<h3>599</h3>
							<span>per month</span>
						</li>
						<li>
							<Link className="button" onClick={sub2prem} to="/subscribed" style={but_col}>Join Now</Link>
						</li>
					</ul>
				</div>

			</div>
		</div>
	)
}

export default Susbcription