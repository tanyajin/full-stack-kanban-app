import authAip from "../api/authApi";


//令牌验证工具
const tokenValidate={
    isAuthenticated: async ()=>{
        const token =localStorage.getItem('token')
        if(!token){
            console.log("tools/前端未获取到token")
            return false
        }
        try{
            const res =await authAip.verifyToken()
            return res.user
        }catch{
            console.log("tools/前端token验证未通过")
            return false
        }
    }
}

export default tokenValidate