const User =require('../models/userSchema')
const CryptoJS =require('crypto-js')
const jsonwebtoken =require('jsonwebtoken')

//用户路由
//注册函数
exports.register=async(req,res)=>{
    const {password} =req.body;
    try{
        //1. AES加密算法对密码进行加密，赋值给req中的密码
        req.body.password=CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        )
        //2. 等待创建用户完毕(向数据库中写入数据)
        const user =await User.create(req.body)
        //令牌加密
        const token =jsonwebtoken.sign(
            //数据库自动生成的id
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:'24h'}
        )
        console.error("controllers/user.js/register 注册成功")
        res.status(201).json({user,token})

    }catch(err){
        console.error("controllers/user.js/register 注册报错")
        res.status(500).json(err)
    }
}

//登录函数
exports.login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username}).select('password username');
        if(!user){
            console.error('用户不存在')
            return res.status(401).json({
                errors:[
                    {
                        param:'username',
                        msg:'invalid username'

                    }
                ]
            })
        }

        const decryptedPass =CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY

        ).toString(CryptoJS.enc.Utf8)

        if(decryptedPass!==password){
            console.error('密码错误')
            return res.status(401).json({
                errors:[
                    {
                        param:'password',
                        msg:'invalid password'

                    }
                ]
            })
        }

        user.password=undefined;
        //令牌加密
        const token = jsonwebtoken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:'24h'}
        )

        console.error("controllers/user.js/login 登录成功")
        res.status(200).json({user,token})

    }catch(err){
        console.error("controllers/user.js/login 登录报错")
        res.status(500).json(err)
    }
}
