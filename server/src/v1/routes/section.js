const router = require('express').Router({ mergeParams: true })
const {param}=require('express-validator')
const {tokenValidate}=require('../handlers/tokenValidate')
const { requestHandler } = require('../handlers/requestHandler')
const sectionHandler = require('../handlers/sectionHandler')

router.post('/',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid id')
        } else return Promise.resolve()
    }),
    requestHandler,
    tokenValidate,
    sectionHandler.create
)

router.put('/:sectionId',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),
    param('sectionId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid section id')
        } else return Promise.resolve()
    }),
    requestHandler,
    tokenValidate,
    sectionHandler.update
)

router.delete('/:sectionId',
    param('boardId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
    }),
    param('sectionId').custom(value => {
        if (!objectIdValidate(value)) {
            return Promise.reject('invalid section id')
        } else return Promise.resolve()
    }),
    requestHandler,
    tokenValidate,
    sectionHandler.delete
)


module.exports = router