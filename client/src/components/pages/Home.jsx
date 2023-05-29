import { useState } from 'react'
import{Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from 'react-redux'
import { setBoards } from '../../redux/features/boardSlice'
import { useNavigate } from 'react-router-dom'
import boardApi from '../../api/boardApi'

const Home = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const [loading, setLoading] = useState(false);

  const createBoard = async()=>{
    setLoading(true)
    try{
      const res = await boardApi.create()
      dispatch(setBoards([res]))
      navigate(`/boards/${res.id}`)
    }catch(error){
      alert(error)
    }finally{
      setLoading(false)
    }
  }

  return (
      <Box sx={{
        height:'100%',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        
      }}> 
          <LoadingButton
            variant='outlined'
            color='success'
            onClick={createBoard}
            loading={loading}
            sx={{
              
              position:'absolute',
              top: '50%', // 垂直居中，距离顶部偏移 50%
              left: '50%', // 水平居中，距离左侧偏移 50%  
            }}
          >
            Click here to create your first board
          </LoadingButton>
      </Box>
  )
}

export default Home