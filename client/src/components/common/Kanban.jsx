import { Box, Button, Typography,Divider} from '@mui/material'

const Kanban = () => {
  return (
   <>
      <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button>
              Add section
            </Button>
            <Typography variant='body2' fontWeight='700'>
              {/* {sections.length} Sections */}
            </Typography>
          </Box>
          <Divider sx={{ margin:'10px 0'}}/>
   </>
  )
}

export default Kanban