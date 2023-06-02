import { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Box, IconButton, TextField, Button, Typography,Divider} from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StartOutlined'
import StartBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DelectOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EmojiSelector from '../common/EmojiSelector'
import boardApi from '../../api/boardApi'
import {setBoards} from '../../redux/features/boardSlice'
import {setMarkedList} from '../../redux/features/markedSlice'



let timer
const timeout = 500


const Board = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isMarked, setIsMarked] = useState(false);
  const [icon, setIcon] = useState('');

  const boards = useSelector((state)=>state.board.value)
  const markedList = useSelector((state)=>state.allMarked.value)
  

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsMarked(res.marked)
        setIcon(res.icon)
        console.log(res)
      } catch (error) {
        alert(error)
      }
    }
    getBoard()
  }, [boardId]);

  const onIconChange = async(newIcon)=>{
    let temp =[...boards]
    const index = temp.findIndex(e=>e.id===boardId)
    temp[index]={...temp[index],icon:newIcon}

    if(isMarked){
      let tempMarked =[...markedList]
      const markedIndex = tempMarked.findIndex(e=>e.id===boardId)
      tempMarked[markedIndex]={...tempMarked[markedIndex],icon:newIcon}
      dispatch(setMarkedList(tempMarked))
    }

    setIcon(newIcon);
    dispatch(setBoards(temp))
    try{
      await boardApi.update(boardId,{icon:newIcon})
    }catch(error){
      console.log(error)
      alert(error)
    }

  }


  const updateTitle=async(e)=>{
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    let temp =[...boards]
    const index = temp.findIndex(e=>e.id===boardId)
    temp[index]={...temp[index],title:newTitle}

    if(isMarked){
      let tempMarked =[...markedList]
      const markedIndex = tempMarked.findIndex(e=>e.id===boardId)
      tempMarked[markedIndex]={...tempMarked[markedIndex],title:newTitle}
      dispatch(setMarkedList(tempMarked))
    }

    dispatch(setBoards(temp))

    timer=setTimeout(async() => { 
      try{
        await boardApi.update(boardId,{title:newTitle})
      }catch(error){
        console.log(error)
        alert(error)
      }
     }, timeout)
  }

  const updateDescription =async(e)=>{
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer=setTimeout(async() => { 
      try{
        await boardApi.update(boardId,{description:newDescription})
      }catch(error){
        console.log(error)
        alert(error)
      }
     }, timeout)
  }

  const addMarked = async()=> {
    try {
     const board = await boardApi.update(boardId,{marked:!isMarked})
      let newMarkedList = [...markedList]
      if(isMarked){
        newMarkedList=newMarkedList.filter(e=>e.id !== boardId)
      }else{
        newMarkedList.unshift(board)
      }
      dispatch(setMarkedList(newMarkedList))
      setIsMarked(!isMarked)
    
    } catch (error) {
      alert(error)
    }
  }

  const deleteBoard =async()=>{
    try{
      await boardApi.delete(boardId)
      if(isMarked){
        const newMarkedList = markedList.filter(e=>e.id !==boardId)
        dispatch(setMarkedList(newMarkedList))
      }
      const newList =boards.filter(e=>e.id !==boardId)
      if(newList.length ===0){
        navigate('/boards')
      }else{
        navigate(`/boards/${newList[0].id}`)
      }
      dispatch(setBoards(newList))
    }catch(error){
      alert(error)
    }
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%'
      }}>
        <IconButton variant='outlined' onClick={addMarked}>
          {
            isMarked ? (
              <StarOutlinedIcon color='warning' />
            ) : (
              <StartBorderOutlinedIcon />
            )
          }
        </IconButton>

        <IconButton variant='outlined' color='error'  onClick={deleteBoard}>
          <DelectOutlinedIcon />
        </IconButton>
      </Box>

      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          { /* {emoji} */}
          <EmojiSelector icon={icon} onChange={onIconChange}/>
          <TextField
            value={title}
            placeholder='Untitled'
            variant='outlined'
            fullWidth
            onChange={updateTitle}
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
            }}
          />

          <TextField
            value={description}
            placeholder='Add a descrpition'
            variant='outlined'
            multiline
            fullWidth
            onChange={updateDescription}
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '1rem' }
            }}
          />
        </Box>

        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button>
              Add section
            </Button>
            <Typography variant='body2' fontWeight='700'>
              {sections.length} Sections
            </Typography>
          </Box>
          <Divider sx={{ margin:'10px 0'}}/>
          {/* { tasks } */}
    
        </Box>
      </Box>


    </>
  )
}

export default Board