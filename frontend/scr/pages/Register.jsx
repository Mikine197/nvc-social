import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered! Now login");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input className="border p-2 m-1" placeholder="Username"
        onChange={e => setForm({...form, username: e.target.value})}/>
      <input className="border p-2 m-1" placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})}/>
      <input className="border p-2 m-1" type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})}/>
      <button onClick={submit} className="bg-blue-500 text-white p-2 rounded">Register</button>
    </div>
  );
}
