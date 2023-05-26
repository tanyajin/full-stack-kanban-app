import{Box} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const Home = () => {
  const createBoard =()=>{
    
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