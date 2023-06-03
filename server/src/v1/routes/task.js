const router = require('express').Router({ mergeParams: true })
const {param,body}=require('express-validator')
const {tokenValidate}=require('../handlers/tokenValidate')
const { requestHandler } = require('../handlers/requestHandler')
const {objectIdValidate} =require('../handlers/objectIdValidate')
const taskHandler = require('../handlers/taskHandler')


router.post('/',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),

    body('sectionId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid section id')
        } else return Promise.resolve()
    }),

    requestHandler,
    tokenValidate,
    taskHandler.create
)


router.put('/update-position',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),

    requestHandler,
    tokenValidate,
    taskHandler.updatePosition
)

router.delete('/:taskId',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),

    param('taskId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid task id')
        } else return Promise.resolve()
    }),

    requestHandler,
    tokenValidate,
    taskHandler.delete
)

router.put('/:taskId',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),

    param('taskId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid task id')
        } else return Promise.resolve()
    }),

    requestHandler,
    tokenValidate,
    taskHandler.update
)

module.exports=router