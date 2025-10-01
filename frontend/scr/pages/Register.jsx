import { useState } from "react";
import axios from "axios";
export default function Register(){
  const [form,setForm]=useState({username:'',email:'',password:''});
  const submit=async()=>{ await axios.post('http://localhost:5000/api/auth/register', form); alert('Registered, now login'); window.location='/login'; };
  return (<div className='p-4'><h1>Register</h1><input placeholder='username' onChange={e=>setForm({...form,username:e.target.value})}/><input placeholder='email' onChange={e=>setForm({...form,email:e.target.value})}/><input placeholder='password' type='password' onChange={e=>setForm({...form,password:e.target.value})}/><button onClick={submit}>Register</button></div>);
}
