import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Inbox from "./pages/Inbox";
import Groups from "./pages/Groups";
import MetaAIChat from "./pages/MetaAIChat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/meta" element={<MetaAIChat />} />
      </Routes>
    </BrowserRouter>
  );
}
