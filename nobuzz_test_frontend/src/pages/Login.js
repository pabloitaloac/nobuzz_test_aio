import React, { useState, useEffect } from 'react';
import { getUserData, login, logout, signup  } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import './Login.css'

export default function () {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user); 

    const [name,setname]=useState('')
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [page,setPage]=useState(1)


    const handleLogin =(e)=>{
        // dispatch(login(userTest || null))
        dispatch(login({username,password}))
      }
      
    const handleNewUser =(e)=>{
        // dispatch(login(userTest || null))
        dispatch(signup({name,username,password}))
      }
      
    

    return ( 
        <>
            {page === 1 &&
                <div className="form">
                    <h1 style={{margin:'0px 0px 0px 0px',  }}>Login</h1>
                    <div className="input-container">
                        <label>Username</label>
                        <input type="text" name="Username" required 
                            value={username}
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        {/* {'error?'} */}
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" name="Password" required 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        {/* {'error?'} */}
                    </div>
                    <input type="submit" className='button-container' onClick={handleLogin}/>

                    <h6 onClick={()=>{setPage(2)}} style={{margin:'-30px 0px 0px 0px', cursor:'pointer', color:'blueviolet'}}>Novo usuário? Clique aqui para se cadastrar</h6>

                </div>
            }
            {page === 2 &&
                <div className="form">
                    <h1 style={{margin:'0px 0px 0px 0px',  }}>Novo usuário</h1>
                    <div className="input-container">
                        <label>Nome Completo</label>
                        <input type="text" name="Nome Completo" required 
                            value={name}
                            onChange={(e)=>{setname(e.target.value)}}
                        />
                        {/* {'error?'} */}
                    </div>
                    <div className="input-container">
                        <label>Username</label>
                        <input type="text" name="Username" required 
                            value={username}
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        {/* {'error?'} */}
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" name="Password" required 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        {/* {'error?'} */}
                    </div>
                    <input type="submit"  className='button-container' onClick={handleNewUser}/>
                    <h6 onClick={()=>{setPage(1)}} style={{margin:'-30px 0px 0px 0px', cursor:'pointer', color:'blueviolet'}}>Já tem usuário? Fazer login.</h6>
                </div>
            }
        </>
     );
}