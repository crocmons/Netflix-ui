import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { getUserLikedMovies } from '../store';
import { auth } from '../utils/firebase';
import Card from '../components/Card';

const UserLiked = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isScrolled, setisScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
   
    const movies = useSelector((state)=> state.netflix.movies);
    

    onAuthStateChanged(auth,(currentUser)=>{
        if(currentUser){
          setEmail(currentUser.email)
        }else{
            navigate("/login")
        }
      });
  
    useEffect(() => {
     if(email){
        dispatch(getUserLikedMovies(email))
     };
    }, [email]);
  
    
    
    
    window.onscroll=()=>{
      setisScrolled(window.pageYOffset === 0 ? false : true);
      return () =>(window.onscroll = null);
    };

  return (
    <Container>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {
                    movies.map((movie,index)=>{
                        return <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
                    })
                }
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
.content{
    margin:2.3rem;
    margin-top:8rem;
    gap:3rem;
    h1{
        margin-left:3rem;

    }
    .grid{
        flex-wrap:wrap;
        gap:1rem;
    }
}
`

export default UserLiked