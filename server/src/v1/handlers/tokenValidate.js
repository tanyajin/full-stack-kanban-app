const jsonwebtoken =require('jsonwebtoken');
const User =require('../models/userSchema')

//令牌验证中间件
const tokenDecode = (req)=>{
    const bearerHeader =req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ')[1];
        try{
            const decodedToken = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            )
            return decodedToken;
        }catch{
            console.log('handlers/tokenValidate ：令牌解密出错')
            return false;
        }    
    }else{
        console.log('handlers/tokenValidate ：未获取到令牌')
        return false;
    }
   
}

exports.tokenValidate = async(req,res,next)=>{
    const decodedToken=tokenDecode(req);
    if(decodedToken){
        const user=await User.findById(decodedToken.id);
        if(!user) {
            console.error('令牌验证中间件报错')
            return res.status(401).json('unathorized')
        }
        req.user=user;
        next();
    }else{
        console.error('令牌验证中间件报错，无法生成解密令牌')
        res.status(401).json('unathorized')
    }
}