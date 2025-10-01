import { useState, useEffect } from "react";
import axios from "axios";
export default function Feed(){
  const [posts,setPosts]=useState([]); const [content,setContent]=useState('');
  const token=localStorage.getItem('token');
  const fetchPosts=async()=>{ try{ const res=await axios.get('http://localhost:5000/api/posts',{ headers:{ Authorization:`Bearer ${token}` } }); setPosts(res.data);}catch(e){} };
  useEffect(()=>{ fetchPosts(); },[]);
  const create=async()=>{ await axios.post('http://localhost:5000/api/posts',{content},{ headers:{ Authorization:`Bearer ${token}` } }); setContent(''); fetchPosts(); };
  return (<div className='p-4'><h1>NVC Feed</h1><textarea value={content} onChange={e=>setContent(e.target.value)}/><button onClick={create}>Post</button><div>{posts.map(p=>(<div key={p._id}><b>{p.author.username}</b><p>{p.content}</p></div>))}</div></div>);
}
