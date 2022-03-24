import React from 'react';
import loader_gif from './loading-bar.gif';

function Loader() {
    //Loading animation when movies is getting fetched.
    return (
        <div className="text-center">
            <img className="my-3" src={loader_gif} alt="loading" />
        </div>
    )
}

export default Loader
