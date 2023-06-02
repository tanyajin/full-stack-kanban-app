import { useState,useEffect } from 'react'
import {DragDropContext,Droppable,Draggable } from "react-beautiful-dnd"
import {ListItem,Typography,Box,ListItemButton} from '@mui/material'
import { useDispatch,useSelector } from 'react-redux'
import {useParams,Link,useNavigate} from 'react-router-dom'  
import boardApi from '../../api/boardApi'
import {setMarkedList} from '../../redux/features/markedSlice'

const MarkedList = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const list = useSelector((state)=>state.allMarked.value)
    const [activeIndex, setActiveIndex] = useState(0);
    const {boardId}=useParams()

    useEffect(() => {
     const getBoards =async () =>{
        try{
          const res =await boardApi.getMarked()
          dispatch(setMarkedList(res))
        }catch(error){
          alert(error)
        }
     }
     getBoards()     
  }, []);

  const onDragEnd=()=>{

  }

  return (
    <>
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
    <DragDropContext onDragEnd={onDragEnd}>
              <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {
                            list.map((item, index) => (
                            
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

    </>
  )
}

export default MarkedList