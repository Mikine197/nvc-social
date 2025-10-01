import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location = "/";
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border p-2 m-1" placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})}/>
      <input className="border p-2 m-1" type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={submit} className="bg-green-500 text-white p-2 rounded">Login</button>
    </div>
  );
}
