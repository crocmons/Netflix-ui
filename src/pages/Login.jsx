import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Background from '../components/Background';
import Header from '../components/Header';
import { auth } from '../utils/firebase';

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email:"",
    password:""
  });

  const handleLogIn = async ()=>{
   try{
     const {email,password} = formValues;
     await signInWithEmailAndPassword(auth,email,password);
   }catch(err){
     console.log(err);
   }
  
  }
  onAuthStateChanged(auth,(currentUser)=>{
    if(currentUser){
      navigate("/");
    }
  })
  return (
    <Container>
        <Background />
        <div className="content">
            <Header />
          <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">
              <input type="email" placeholder='Email Address' name="email" value={formValues.email}  onChange={(e)=>setFormValues({
                      ...formValues,
                      [e.target.name]:e.target.value,
                    })}/>
                   
                    
                    <input type="password" placeholder='password'  name="password" value={formValues.password} onChange={(e)=>setFormValues({
                      ...formValues,
                      [e.target.name]:e.target.value,
                    })}/>
                  
                   
                    <button onClick={handleLogIn}>Log in</button>
                    
              </div>
            </div>
          </div>
        </div>
    </Container>
  )
}


const Container = styled.div`
   position:relative;
   .content{
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.5);
    height:100vh;
    width:100vw;
    display:grid;
    grid-template-rows: 15vh 85vh;
    .form-container{
      gap:2rem;
      height:85vh;
      .form{
        padding:2rem;
        background-color:#000000b0;
        color:#fff;
        gap:2rem;
        width:25vw;

        .container{
          gap:2rem;
            input{
            padding:0.5 rem 1rem;
            width:15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
   }
`;

export default Login