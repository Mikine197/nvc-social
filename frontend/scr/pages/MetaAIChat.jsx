import { useState } from "react";
import axios from "axios";
export default function MetaAIChat(){
  const [messages,setMessages]=useState([]); const [prompt,setPrompt]=useState('');
  const token=localStorage.getItem('token');
  const send=async()=>{ const res=await axios.post('http://localhost:5000/api/ai/inbox',{ prompt },{ headers:{ Authorization:`Bearer ${token}` } }); setMessages(prev=>[...prev, { role:'user', content: prompt }, { role:'ai', content: res.data.reply }]); setPrompt(''); };
  return (<div className='p-4'><h1>Meta AI</h1><div className='h-48 overflow-auto'>{messages.map((m,i)=>(<div key={i} className={m.role==='ai'?'text-blue-600':''}><b>{m.role==='ai'?'Meta AI':'You'}:</b> {m.content}</div>))}</div><input value={prompt} onChange={e=>setPrompt(e.target.value)}/><button onClick={send}>Send</button></div>);
}
