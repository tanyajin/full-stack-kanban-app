import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Drawer,List,ListItem,Typography,IconButton,Box} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import images from '../../../public/index'

const Sidebar = () => {
const navigate =useNavigate()
const user =useSelector((state)=>state.user.value)
const sidebarWidth = 250

const logout =()=>{
  localStorage.removeItem('token')
  navigate('/login')
}

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width:sidebarWidth,
        height:'100%',
        '& > div':{borderRight:'none'}
      }}
    >
        <List
          disablePadding
          sx={{
             width:sidebarWidth,
             height:'100vh',
             backgroundColor:images.colors.secondary
          }}
        >
            <ListItem>
                <Box sx={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 

                    <Typography variant='body2' fontWeight='700'>
                      {user.username}
                    </Typography>

                    <IconButton onClick={logout}>
                      <LogoutOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Box>
            </ListItem>
            
            <Box sx={{paddingTop:'10px'}}>
                <ListItem>
                <Box sx={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 

                    <Typography variant='body2' fontWeight='700'>
                      Marked
                    </Typography>
                </Box>
                </ListItem>
             </Box>
          
             <Box sx={{paddingTop:'10px'}}>
                <ListItem>
                    <Box sx={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}> 

                    <Typography variant='body2' fontWeight='700'>
                      Diary
                    </Typography>
                    <IconButton>
                        <AddBoxOutlinedIcon />
                    </IconButton>
                    
                    
                    </Box>
                </ListItem>
             </Box>
          

        </List>
    </Drawer>
  )
}

export default Sidebar