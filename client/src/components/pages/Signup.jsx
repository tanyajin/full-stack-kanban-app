import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Box,TextField,Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../../api/authApi'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  const [errorMessage, setErrorMessage] = useState({
    usernameError:'',
    passwordError:'',
    confirmPasswordError:''
  });


  

  const handleSubmit=async(e)=>{
    e.preventDefault();
    //提交后清空message
    setErrorMessage({
      usernameError:'',
      passwordError:'',
      confirmPasswordError:''
    })

    const data =new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()
    const confirmpassword = data.get('confirmpassword').trim()

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

  if(confirmpassword ===''){
    error=true 
    setErrorMessage((preMessage)=>({
      ...preMessage,
      confirmPasswordError:'Oops! We can\'t proceed without your confirmed password.'
    }) )
  }

  if(confirmpassword!==password){
    error=true 
    setErrorMessage((preMessage)=>({
      ...preMessage,
      confirmPasswordError:'Oops! Your confirmed password and new password do not match. Please enter your passwords again.'
    }) )
  }

  if(error) return

  setLoading(true);

  try{
    const res = await authApi.signup ({
      username,password,confirmpassword
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

      if(e.param ==='confirmpassword'){
        setErrorMessage((preMessage)=>({
          ...preMessage,
          confirmPasswordError:e.msg
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

    <TextField
      margin='normal'
      required
      fullWidth
      id='confirmpassword'
      label='Confirm Password'
      name='confirmpassword'
      type='password'
      disabled={loading}
      error={errorMessage.confirmPasswordError!==''}
      helperText={errorMessage.confirmPasswordError}
    />

    <LoadingButton 
      sx={{mt:3,mb:2}}
      variant='outlined'
      fullWidth
      color='success'
      type='submit'
      loading={loading}
    >
      Sign up
    </LoadingButton>
   
    <Button 
        component={Link}
        to='/login'
        sx={{textTransform:'none'}}
        fullWidth
        >
          Already In? login Now.
      </Button>

    </Box>
  
  
  
  
  
  </>
  )
}

export default Signup