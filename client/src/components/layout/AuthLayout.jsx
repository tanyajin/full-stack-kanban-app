import {useState,useEffect} from 'react'
import { Outlet,useNavigate} from 'react-router-dom'
import tokenValidate from '../../tools/tokenValidate'
import Loading from '../common/Loading'
import images from '../../../public/index.js'
import { Container,Box } from '@mui/material'



const AuthLayout = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  const checkToken = async () =>{
    const isAuthenticated  = await tokenValidate.isAuthenticated()
    if(!isAuthenticated){
     setLoading(false)
    }else{
      navigate('/')
    }
  }

  useEffect(()=>{
    checkToken();
  },[navigate])

  return (
    loading ? (<Loading fullHeight/>) : (
      <Container component='main' maxWidth='xs'>
        <Box sx={{
            marginTop:8,
            display:'flex',
            alignItems:'center',
            flexDirection:'column'
        }}>
          <img src={images.img.darkLogo} style={{width:'100px'}} alt="app diary" />
        </Box>
        <Outlet />
      </Container>

    )
  )
}

export default AuthLayout