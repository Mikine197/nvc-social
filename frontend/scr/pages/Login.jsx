import { useState } from "react";
import axios from "axios";
export default function Login(){
  const [form,setForm]=useState({email:'',password:''});
  const submit=async()=>{ const res=await axios.post('http://localhost:5000/api/auth/login', form); localStorage.setItem('token', res.data.token); localStorage.setItem('user', JSON.stringify(res.data.user)); window.location='/'; };
  return (<div className='p-4'><h1>Login</h1><input placeholder='email' onChange={e=>setForm({...form,email:e.target.value})}/><input placeholder='password' type='password' onChange={e=>setForm({...form,password:e.target.value})}/><button onClick={submit}>Login</button></div>);
}
