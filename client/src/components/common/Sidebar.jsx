import { useEffect ,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate, useParams,Link} from 'react-router-dom'

import {Drawer,List,ListItem,Typography,IconButton,Box,ListItemButton} from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import images from '../../../public/index'
import {DragDropContext,Droppable,Draggable } from "react-beautiful-dnd"


const Sidebar = () => {

const navigate =useNavigate()
const dispatch =useDispatch();
const {boardId}=useParams();
const user =useSelector((state)=>state.user.value)
const boards =useSelector((state)=>state.board.value)
const sidebarWidth = 250
const [activeIndex, setActiveIndex] = useState(0);

const onDragEnd = async({source,destination}) => {
  const newList = [...boards]
  const [removed]=newList.splice(source.index,1)
  newList.splice(destination.index,0,removed)

  const activeItem =newList.findIndex(e=> e.id === boardId)
  setActiveIndex(activeItem)
  dispatch(setBoards(newList))

  try{
    await boardApi.updatePosition({boards:newList})
  }catch(error){
    alert(error)
  }
}

const addBoard =async()=>{
  try{
    const res = await boardApi.create()
    const newList =[res,...boards]
    dispatch(setBoards(newList))
    navigate(`/boards/${res.id}`)
  }catch(error){
    alert(error)
  }
}

useEffect(() => {
      const getBoards = async () => {
        try {
          const res = await boardApi.getAll()
          dispatch(setBoards(res))
        } catch (err) {
          alert(err)
        }
      }
      getBoards()
    }, [dispatch])

useEffect(() => {
      const activeItem = boards.findIndex(e => e.id === boardId)
      if (boards.length > 0 && boardId === undefined) {
        navigate(`/boards/${boards[0].id}`)
      }
      setActiveIndex(activeItem)
    }, [boards, boardId, navigate])
    
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
                    <IconButton onClick={addBoard}>
                        <AddBoxOutlinedIcon />
                    </IconButton>  
                    </Box>
             </ListItem>
             
             <DragDropContext onDragEnd={onDragEnd}>
              <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            boards.map((item, index) => (
                            
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <ListItemButton
                                          ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            selected={index === activeIndex}
                                            component={Link}
                                            to={`/boards/${item.id}`}
                                            sx={{
                                              pl:'20px',
                                              cursor:snapshot.isDragging ? 'grab' : 'pointer!important'
                                            }}
                                          >
                                            <Typography 
                                              variant='body2'
                                              fontWeight="700"
                                              sx={{ whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}
                                              >
                                                {item.icon}{item.title}
                                            </Typography>

                                        </ListItemButton>
                                    )}
                                </Draggable>
                               
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            </DragDropContext>

        </List>
    </Drawer>
  )
}

export default Sidebar