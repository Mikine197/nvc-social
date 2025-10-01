import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/posts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setPosts(res.data);
  };

  const createPost = async () => {
    await axios.post("http://localhost:5000/api/posts", { content }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setContent("");
    fetchPosts();
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">NVC Social Feed</h1>
      <textarea className="w-full border p-2" value={content}
        onChange={e => setContent(e.target.value)} placeholder="What's on your mind?"/>
      <button onClick={createPost} className="bg-blue-500 text-white p-2 mt-2 rounded">Post</button>
      
      <div className="mt-4">
        {posts.map(p => (
          <div key={p._id} className="border rounded p-2 mb-2">
            <p className="font-bold">{p.author.username}</p>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
