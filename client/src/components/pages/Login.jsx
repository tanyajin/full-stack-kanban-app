import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Box,TextField,Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../../api/authApi'

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate =useNavigate()

  const [errorMessage, setErrorMessage] = useState({
    usernameError:'',
    passwordError:'',
  });

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //提交后清空message
    setErrorMessage({
      usernameError:'',
      passwordError:'',

    })

    const data =new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()

    let error =false;

    if(username ===''){
        error=true 
        setErrorMessage((preMessage)=>({
          ...preMessage,
          usernameError:'Oops! We can\'t proceed without your username.'
        }) )
    }

    if(password ===''){
      error=true 
      setErrorMessage((preMessage)=>({
        ...preMessage,
        passwordError:'Oops! We can\'t proceed without your password.'
      }) )
   }


  if(error) return

  setLoading(true);

  try{
    const res = await authApi.login ({
      username,password
    })

    setLoading(false)
    localStorage.setItem('token',res.token)
    navigate('/')
  }catch(error){
    const errors =error.data.errors
    errors.forEach(e=>{
      if(e.param ==='username'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          usernameError:e.msg
        }) )
      }

      if(e.param ==='password'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          passwordError:e.msg
        }) )
      }

    
       
      setLoading(false)
    })
  }

  }

  return (
    <>
    <Box
     component='form'
     sx={{mt:1}}
     onSubmit={handleSubmit}
     noValidate
    >
    <TextField
      margin='normal'
      required
      fullWidth
      id='username'
      label='Username'
      name='username'
      disabled={loading}
      error={errorMessage.usernameError!==''}
      helperText={errorMessage.usernameError}
    />
   
    <TextField
      margin='normal'
      required
      fullWidth
      id='password'
      label='Password'
      name='password'
      type='password'
      disabled={loading}
      error={errorMessage.passwordError!==''}
      helperText={errorMessage.passwordError}
    />


    <LoadingButton 
      sx={{mt:3,mb:2}}
      variant='outlined'
      fullWidth
      color='success'
      type='submit'
      loading={loading}
    >
      Login
    </LoadingButton>
   
    <Button 
        component={Link}
        to='/signup'
        sx={{textTransform:'none'}}
        fullWidth
        >
          New To Diary? Join Now.
      </Button>

    </Box>
  
  
  
  
  
  </>
  )

}

export default Login