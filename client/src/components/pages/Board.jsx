import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import boardApi from '../../api/boardApi'
import { Box, IconButton, TextField, Button, Typography,Divider} from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StartOutlined'
import StartBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DelectOutlinedIcon from '@mui/icons-material/DeleteOutlined'



const Board = () => {
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isMarked, setIsMarked] = useState(false);
  const [icon, setIcon] = useState('');


  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsMarked(res.marked)
        setIcon(res.icon)
        // console.log(res)
      } catch (error) {
        alert(error)
      }
    }
    getBoard()
  }, [boardId]);










  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        width: '100%'
      }}>
        <IconButton variant='outlined'>
          {
            isMarked ? (
              <StarOutlinedIcon color='warning' />
            ) : (
              <StartBorderOutlinedIcon />
            )
          }
        </IconButton>

        <IconButton variant='outlined' color='error' >
          <DelectOutlinedIcon />
        </IconButton>
      </Box>

      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          { /* {emoji} */}
          <TextField
            value={title}
            placeholder='Untitled'
            variant='outlined'
            fullWidth
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