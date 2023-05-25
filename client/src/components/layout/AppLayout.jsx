import {useState,useEffect} from 'react'
import { Outlet,useNavigate} from 'react-router-dom'
import tokenValidate from '../../tools/tokenValidate'
import Loading from '../common/Loading'
import Sidebar from '../common/Sidebar'
import images from '../../../public/index.js'
import { Container,Box } from '@mui/material'


const AppLayout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  const checkToken = async () =>{
    const isAuthenticated  = await tokenValidate.isAuthenticated()
    if(!isAuthenticated){
      //没有令牌就导去login页面
      navigate('/login')
    }else{ 
      setLoading(false)
    }
  }

  useEffect(()=>{
    checkToken();
  },[navigate])

  return (
      loading ? (<Loading fullHeight/>) :
      (
        <Box sx={{
          display:'flex'
        }}>
          <Sidebar/>
          <Box sex={{
            flexGrow:1,
            p:1,
            width:'max-content'
          }}>
           <Outlet /> 
          </Box>
        </Box>
      ) 
  )
}

export default AppLayout