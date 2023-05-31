const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const {schemaOptions} = require('./schemaOptions')

const boardSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    icon:{
        type:String,
        default:"📃"
    },
    title:{
        type:String,
        default:'Untitled'
    },
    description:{
        type:String,
        default:`Add description here
        💗You can add multiline description
        💗 Let's start... `
    },
    position:{
        type:Number
    },
    marked:{
        type:Boolean,
        default:false
    },
    markedPosition:{
        type:Number,
        default:0
    }
},schemaOptions)

module.exports=mongoose.model('Board',boardSchema)