const router = require('express').Router()

const {body}=require('express-validator')
const {tokenValidate}=require('../handlers/tokenValidate')
const boardHandler = require('../handlers/boardHandler')

router.post('/',
tokenValidate,
boardHandler.create

)

router.get('/',
tokenValidate,
boardHandler.getAll

)

module.exports = router

