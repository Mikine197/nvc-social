import { useEffect, useState } from "react";
import axios from "axios";
export default function Groups(){
  const [groups,setGroups]=useState([]); const [name,setName]=useState('');
  const token=localStorage.getItem('token');
  useEffect(()=>{ axios.get('http://localhost:5000/api/chat/group',{ headers:{ Authorization:`Bearer ${token}` } }).catch(()=>{}); },[]);
  const create=async()=>{ const res=await axios.post('http://localhost:5000/api/chat/group',{ name },{ headers:{ Authorization:`Bearer ${token}` } }); alert('Created'); };
  return (<div className='p-4'><h1>Groups</h1><input value={name} onChange={e=>setName(e.target.value)}/><button onClick={create}>Create</button></div>);
}
