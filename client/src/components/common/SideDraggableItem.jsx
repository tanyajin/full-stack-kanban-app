import { ListItemButton } from '@mui/material'
import React from 'react'
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import {useSelector} from 'react-redux'


export default function SideDraggableItem() {
    const boards =useSelector((state)=>state.board.value)
     const onDragEnd=()=>{
    
     }



  return (
   
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
            {(provided)=>(
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {
                        boards.map((item,index)=>{
                            <Draggable key={item.id}draggableId={item.id} index={index}>
                                {(provided,snapshot)=>{
                                    <ListItemButton>

                                        
                                    </ListItemButton>
                                }}

                            </Draggable>
                        
                        })

                    } 


                </div>


            )}



        </Droppable>
    </DragDropContext>
    
  )
}
