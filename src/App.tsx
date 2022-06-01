import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

import {useAuthState} from'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore';



firebase.initializeApp({
  apiKey: "AIzaSyAlPUcBL_GPI01UbfONNnpVwG8jzsNlDA4",
  authDomain: "sunny-203817.firebaseapp.com",
  databaseURL: "https://sunny-203817.firebaseio.com",
  projectId: "sunny-203817",
  storageBucket: "sunny-203817.appspot.com",
  messagingSenderId: "654741076658",
  appId: "1:654741076658:web:f71a846fad51800618e7ab"
})


const auth = firebase.auth()
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
    
    <header></header>
    <section>
      {user? <ChatRoom/>: <SignIn/>}
    </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () =>{
    const provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInwWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query =messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query,{idField:'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e)=>{
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id}  message={msg}/>)}
      </div>

      <form onSubmit={sendMessage}>
        <input type={'text'} value={formValue} onChange={(e:any)=> setFormValue(e.target.value)}/>
        <button>Send</button>
      </form>
    </>
  )
}


function ChatMessage({props}:any){
  const {text, uid, photoURL} =props.message;
  const messageClass = uid === auth.currentUser.uid? 'sent': 'recieved';
  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  )
}
export default App;
