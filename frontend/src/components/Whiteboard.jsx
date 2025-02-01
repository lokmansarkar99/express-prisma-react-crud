import axios from "axios";

const Whiteboard = ({ setForm, setEditingId, fetchUsers, setError, API_URL, users }) => {
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
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List With Whiteboard</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-gray-600">{user.age} years old</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Whiteboard;
