import React , {useEffect, useState} from 'react';
import "./Sidebar.css"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getUserData, login, logout  } from '../redux/actions';

import Avatar from '@mui/material/Avatar';


const aux =  {
  id:'6743267',
  name: 'Fulano de Tal',
  idade: '43'
}

function Sidebar() {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user); 


  // const [userTest,setUserTest] = useState(aux)
  

  // useEffect(()=>{
  //   currentUser ? setUserTest(currentUser) : setUserTest(aux)
  // },[currentUser])




const handleLogin =(e)=>{
  window.location.href = '/login'
  // dispatch(login(userTest || null))
}
const handleLogout =(e)=>{
  dispatch(logout())
}

    return ( 

      <>
      {currentUser?
        <div id="sidebar">
            <h1 onClick={handleLogout}>
              <Avatar src="/broken-image.jpg" />
              Logout {`- ${currentUser?.name}` || ''}
            </h1>
          <nav>
            <ul>
              <li >
                <a href={`/`}>Home</a>
              </li>
              <li>
                <a href={`/task`}>Lista de Tarefas</a>
              </li>
            </ul>
          </nav>
        </div>



:



      <div id="sidebar">
            <h1 onClick={handleLogin}>Login / SignUp</h1>
          <div>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/`}>Home</a>
              </li>
            </ul>
          </nav>
        </div>
      }
      </>

     );
}



export default Sidebar;