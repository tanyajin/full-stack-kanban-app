const router = require('express').Router()

const {param}=require('express-validator')
const {tokenValidate}=require('../handlers/tokenValidate')
const boardHandler = require('../handlers/boardHandler')
const {objectIdValidate}=require('../handlers/objectIdValidate')
const {requestHandler}=require('../handlers/requestHandler')
router.post('/',
tokenValidate,
boardHandler.create

)

router.get('/',
tokenValidate,
boardHandler.getAll

)

router.put('/',
tokenValidate,
boardHandler.updatePosition

)

router.get('/:boardId',
param('boardId').custom(value=>{
    if(!objectIdValidate(value)){
        return Promise.reject('invalid id')
    }else{
        return Promise.resolve()
    }
}),
requestHandler, 
tokenValidate,
boardHandler.getOne
)

module.exports = router

