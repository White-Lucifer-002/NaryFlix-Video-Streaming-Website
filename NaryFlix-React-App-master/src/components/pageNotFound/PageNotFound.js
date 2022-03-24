import React, { useContext } from 'react';
import './pnf.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import loaderGif from "./dogegif.gif";

const PageNotFound = () => {
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
    <div className="pnf">
      <div className="text-center">
        <img className="dogegif" src={loaderGif} alt="loading gif"/>
      </div>
      <h1 className="uho" style={them_col}>404 Uhh Ohh!</h1>
      
      <p className="zoom-area" style={them_col}><b>Page Not Found</b> You can head over to Home Page. </p>
      <div className="link-container">
        <Link  to="/" className="more-link">Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound