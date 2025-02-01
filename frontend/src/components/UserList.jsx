import {useEffect} from 'react'
import axios from 'axios'

const UserList = ({setForm, setEditingId, fetchUsers,setError, users, API_URL}) => {
    
    
    
    

    useEffect(() => {
        fetchUsers();
      }, []);
    
  


      const handleEdit = (user) => {
        setForm(user);
        setEditingId(user.id);
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          fetchUsers();
        } catch (error) {
          console.error("Delete Error:", error.response?.data || error.message);
          setError("Failed to delete user.");
        }
      };
    
  return (
    <div className="mt-6 w-full max-w-2xl">
    {users.length === 0 ? (
      <p className="text-center text-gray-500">No users found.</p>
    ) : (
      <ul className="grid grid-cols-1   gap-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
            <p className="font-bold text-lg text-gray-700">{user.name}</p>
            <p className="text-gray-600">{user.age} years old</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default UserList
