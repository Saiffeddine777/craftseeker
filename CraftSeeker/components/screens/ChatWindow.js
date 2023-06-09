import { View, Text, Button, TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { TextInput,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { io } from 'socket.io-client'
import { TouchableOpacity } from 'react-native'
// import { NativeBaseConfigProvider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Link from './Link'

// import { Center, Divider } from "native-base";
export default function ChatWindow(props) {
  const [toggle ,setToggle] = useState(false)
  const  [messageText, setMessageText] = useState("")
  const  [uniqueId ,setUniqueId] = useState("")
  const  [messages,setMessages] = useState([])
  const [inputContainerHeight, setInputContainerHeight] = useState(0);
  const [receiverName ,setReceiverName] = useState("")
  const [senderId ,setSenderId] = useState("")
  const [receiverId ,setReceiverId] = useState("")

  const handleToggle = function(){
    setToggle(!toggle)
  }

  useEffect(()=>{
    setUniqueId(props.route.params.data.roomId)
    setReceiverName(props.route.params.data.receiverName)
    setSenderId(props.route.params.data.id )
    setReceiverId(props.route.params.data.receiverId)
  },[])


  const socket = io(`http://${Link}:6000`,{
    query :{uniqueId :`${props.route.params.data.roomId}`}
  })

  useEffect(()=>{
    socket.on("messages",(data)=>{
      setMessages(data)
      console.log(messages)
    })  
  },[toggle]) 
  // add messages as a dependency
  
  const getDate=()=>{
    const date = new Date(); // create a new Date object for the current date and time
    const month = date.toLocaleString('default', { month: 'long' }); // get the month name
    const day = date.getDate(); // get the day of the month
    const year = date.getFullYear(); // get the year
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); // format the time in 12-hour clock with AM/PM
    const formattedDate = `${month} ${day}, ${year}`; // create the formatted date string
     return formattedDate
}
  const handleMessageSending=()=>{
    const messageObj = {
      uniqueId :uniqueId,
      senderId: senderId,
      receiverId :receiverId,
      createdAt : getDate(),
      messageText:messageText
    }
    if (messageObj.messageText.length){
      socket.emit("receive",messageObj)
    }
    handleToggle()
  }



  return (
 
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style = {styles.titleContainer}>
        <Text style = {styles.title}>{receiverName}</Text>
        </View>
        <View>
          <ScrollView style={styles.scroll}>
          {messages.map((e, i) => {
            console.log(e.messageText);
            const isSent= senderId===e.sender
            const messageContainerStyle = isSent? styles.sentMessageContainer : styles.receivedMessageContainer
            const messageTextStyle = isSent? styles.sendMessageText : styles.receivedMessageText
            return (
              <View  key={i} style ={ messageContainerStyle} >
                <Text style ={messageTextStyle}>{e.messageText}</Text>
                <Text style ={styles.dateText}>{e.createdAt}</Text>
              </View>
            );
          })}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            title="message"
            onChangeText={text => setMessageText(text)}
            style={styles.input}
            value={messageText}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleMessageSending}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
                                                      

);
}

const styles = StyleSheet.create({
  dateText:{
    fontSize:12,
    color :'#999',
  },
  scroll:{
    height:580,
    position:"absolute",
    left: 20
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 8,
    borderRadius: 20,
    marginVertical: 8,
  },
  sentMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#36C2FF',
    padding: 10,
    borderRadius: 20,
    marginVertical: 8,
    right:20,
    marginLeft: '25%',

  },
  receivedMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#A862A4',
    padding: 10,
    borderRadius: 20,
    marginVertical: 8,
    marginRight: '20%',
  },
  messageText: {
    fontSize: 'white',
  },
  sendMessageText: {
    color: 'black',
  },
  receivedMessageText: {
    color: 'black',
  },

  titleContainer: {
    backgroundColor: 'white',
    padding: 13,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: ' ',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    borderWidth: 16,
    height: '100%',
    top: '0%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#036BB9',
    borderRadius: 10,
  },
  
  subcontainer: {
    borderWidth: 8,
    height: '102%',
    width: '102%',
    borderRadius: 8,
    left: '-1.5%',
    borderColor: 'white',
    top: '-1%',
  },
  inputContainer: {
    position: 'absolute',
    bottom:-500,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderRadius: 50,
    marginBottom:-150
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 80,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});