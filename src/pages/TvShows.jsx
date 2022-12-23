import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { fetchMovies, getGenres } from '../store';
import { auth } from '../utils/firebase';

const TvShows = () => {
    const [isScrolled, setisScrolled] = useState(false);
    const genresLoaded = useSelector((state)=>
    state.netflix.genresLoaded
    );
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state)=> state.netflix.genres);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
     dispatch(getGenres())
    }, []);
  
    useEffect(() => {
     if(genresLoaded){
      dispatch(fetchMovies({type:"tv"}));
     }
    },[genresLoaded]);
    
    
    window.onscroll=()=>{
      setisScrolled(window.pageYOffset === 0 ? false : true);
      return () =>(window.onscroll = null);
    };

    onAuthStateChanged(auth,(currentUser)=>{
        // if(currentUser){
        //   navigate("/");
        // }


      })

  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
        <SelectGenre genres={genres} type="tv"/>
            {
                movies.length ? <Slider movies={movies}/> : <NotAvailable />
            }
        </div>
    </Container>
  )
}
const Container = styled.div`

.data{
    margin-top:8rem;
    .noMovies{
        text-align:center;
        color:#fff;
        margin-top:4rem;
    }
}
`
export default TvShows