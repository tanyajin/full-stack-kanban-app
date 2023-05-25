const router = require('express').Router()
const {register,login} = require('../handlers/userHandler')

const {signupValidate,loginValidate}=require('../handlers/requestValidate')
const {tokenValidate}=require('../handlers/tokenValidate')


//注册路由
router.post('/signup',
    //注册信息合法性验证
    signupValidate,
    //注册操作
    register
)

//登录
router.post('/login',
    //登录信息合法性验证
    loginValidate,
    //登录操作
    login
)

router.post('/verify-token',
    tokenValidate,
    (req,res)=>{
        res.send(200).json({user:req.user})
    }
)

module.exports = router