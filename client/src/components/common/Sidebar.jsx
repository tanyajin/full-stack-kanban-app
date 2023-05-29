import { useEffect ,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

import {Drawer,List,ListItem,Typography,IconButton,Box} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import images from '../../../public/index'
import SideDraggableItem from './SideDraggableItem'


const Sidebar = () => {
const navigate =useNavigate()
const dispatch =useDispatch();
const {boardId}=useParams();
const user =useSelector((state)=>state.user.value)
const boards =useSelector((state)=>state.board.value)
const sidebarWidth = 250
const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const getBoards = async()=>{
    try{
      const res = await boardApi.getAll()
      // console.log(res)
      dispatch(setBoards(res))

      if(res.length>0 && boardId === undefined){
        navigate(`/boards/${res[0].id}`)
      }
    }catch(error){
      alert(error)
    }
  }
  getBoards()
}, []);

useEffect(() => { 
  // console.log(boards)
  updateActive(boards)

}, [boards]);

const updateActive=(listBoards)=>{
  const activeItem= listBoards.findIndex(e=>e.id===boardId)
  setActiveIndex(activeItem)
}

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
           
            <ListItem>
                <Box sx={{
                    paddingTop:'10px',
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

             <ListItem>
                  <Box sx={{
                    paddingTop:'10px',
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
             
             <SideDraggableItem/>
            

        </List>
    </Drawer>
  )
}

export default Sidebar