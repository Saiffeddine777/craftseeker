const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/messages', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log('connected to the messaging database')
}).catch(err=>{
    console.log(err)
})

const ChatRoomsSchema = new Schema({
    uniqueId :String,
    users:Array,
    messages: Array
})

 const ChatRoom = mongoose.model("Chatroom",ChatRoomsSchema)

module.exports={
    ChatRoom
}

