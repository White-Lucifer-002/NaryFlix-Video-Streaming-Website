import React from 'react'
import { useEffect, useState, useContext } from 'react';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import { Context } from '../Context/Context';
import "./MoviesApi.css"

const MoviesApi = (props) => {
    const [status, setstatus] = useState(true);
    const [page, setPage] = useState(1);
    const [Tpage, setTpage] = useState(0);
    const [movies, setmovies] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    //Theme
    const { theme, setProgress } = useContext(Context);
    //Theme Logic
    let th_title = {color : "white"};

    if(theme === "light"){
        th_title = {color : "black"};
    }
    if(theme === "dark"){
        th_title = {color : "white"};
    }

    let cat;
    if(props.category === "Movies"){
        cat = "/movie/popular"
    }
    if(props.category === "Series"){
        cat = "/tv/popular"
    }
    //https://api.themoviedb.org/3/movie/popular?api_key=0a803c18aba60c067431d8a7cb9a7cd4&language=en-US&page=1
    const api_key = "0a803c18aba60c067431d8a7cb9a7cd4";
    const featured_api = `https://api.themoviedb.org/3${cat}?api_key=${api_key}&language=en-US&page=${page}`;


    const fetchMovies = async () => {
        setProgress(0);
        setisLoading(true);
        const movieResp = await fetch(featured_api);
        setProgress(20);
        const moviesParsed = await movieResp.json();
        setProgress(30);
        console.log(moviesParsed);
        if(moviesParsed.errors){
            setstatus(false);
            setProgress(100);
        }
        else{
            if(movies === []){
                setProgress(50);
                setmovies(moviesParsed.results);
                setProgress(70);
                setTpage(moviesParsed.total_pages);
                setProgress(100);
            }
            else{
                setProgress(50);
                setmovies(movies.concat(moviesParsed.results));
                setProgress(70);
                setTpage(moviesParsed.total_pages);
                setProgress(100);
            }
        }
        setTimeout(setisLoading(false), 1000);
        

    }

    const fetchMore = () => {
        setPage(page+1);
        console.log("Infite fired");
        fetchMovies();
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    },[])

    return (
        <div className="master-show">
            {(status)?(
                <div>
                    <InfiniteScroll
                        dataLength={movies.length}
                        next={fetchMore}
                        hasMore={page < Tpage}
                        loader= {<Loading />}
                    >
                        <div className="container">
                            <div style={{display: 'flex', justifyContent: 'center', color:"black"}}>
                                <h1 className="movSer" style={th_title}>{props.category} Section</h1>
                            </div>
                            
                            <div className="row">
                                {isLoading && <Loading />}
                                {movies.map((movie) => {
                                    return (
                                        <div className="col-md-3 my-3" key={movie.key}>
                                            <Movie mov = {movie}  />
                                        </div>
                                    
                                    )
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                    ):(
                        <h1>Hello</h1>
                    )}
        </div>
    )
}

export default MoviesApi
