import {useState,useEffect} from 'react'
import { Outlet,useNavigate} from 'react-router-dom'
import tokenValidate from '../../tools/tokenValidate'
import Loading from '../common/Loading'
import Sidebar from '../common/Sidebar'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/userSlice'



const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);

  const checkToken = async () =>{
    const user  = await tokenValidate.isAuthenticated()
    if(!user){
      //没有user就导去login页面
      navigate('/login')
    }else{ 
      //有user证明已经成功登录,将user传给setUser
      dispatch(setUser(user))
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