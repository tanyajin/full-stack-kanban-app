const monogoose =require('mongoose');
const {schemaOptions} =require('./schemaOptions');
const { default: mongoose } = require('mongoose');

const userSchema =new monogoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }

},schemaOptions)

module.exports=mongoose.model('User',userSchema)