import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io('http://localhost:5000');
export default function Inbox(){
  const [messages,setMessages]=useState([]);
  const [otherId,setOtherId]=useState('');
  const [text,setText]=useState('');
  const token=localStorage.getItem('token');
  const fetch=async()=>{ if(!otherId) return; const res=await axios.get(`http://localhost:5000/api/chat/private/${otherId}`,{ headers:{ Authorization:`Bearer ${token}` } }); setMessages(res.data); };
  useEffect(()=>{ socket.on('receive_message', m=> setMessages(prev=>[...prev,m])); },[]);
  const send=async()=>{ const res=await axios.post('http://localhost:5000/api/chat/private',{ receiverId: otherId, content: text },{ headers:{ Authorization:`Bearer ${token}` } }); socket.emit('send_message',{ room: otherId, ...res.data }); setText(''); };
  return (<div className='p-4'><h1>Inbox</h1><input placeholder='other user id' value={otherId} onChange={e=>setOtherId(e.target.value)}/><button onClick={fetch}>Load</button><div className='h-48 overflow-auto'>{messages.map((m,i)=>(<div key={i}><b>{m.sender.username}:</b> {m.content}</div>))}</div><input value={text} onChange={e=>setText(e.target.value)}/><button onClick={send}>Send</button></div>);
}
