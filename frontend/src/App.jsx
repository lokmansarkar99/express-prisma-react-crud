import { useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";




function App() {
  const API_URL = import.meta.env.VITE_API_URL + "/users";
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      setError("Failed to load users.");
    }
  };





  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
  
    <UserForm form={form} setForm={setForm} editingId={editingId} setEditingId={setEditingId} fetchUsers={fetchUsers} error={error} setError={setError} API_URL={API_URL} />
    <UserList setForm={setForm}  setEditingId={setEditingId} fetchUsers={fetchUsers} setError={setError} API_URL={API_URL} users={users} />
  
</div>
  );
}

export default App;
