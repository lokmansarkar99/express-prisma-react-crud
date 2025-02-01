
import axios from 'axios'
const UserForm = ({form, setForm, editingId, setEditingId, fetchUsers, error, setError, API_URL}) => {
    
    
    
    


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
          const formData = { ...form, age: Number(form.age) }; // Ensure `age` is a Number
    
          if (editingId) {
            await axios.put(`${API_URL}/${editingId}`, formData);
            setEditingId(null);
          } else {
            await axios.post(API_URL, formData);
          }
    
          setForm({ name: "", age: "", email: "", phone: "" });
          fetchUsers();
        } catch (error) {
          console.error("Submit Error:", error.response?.data || error.message);
          setError("Failed to submit data.");
        }
      };
  return (
    <div className="w-full mx-auto max-w-md p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">React CRUD App</h2>

    {error && <p className="text-red-500">{error}</p>}

    {/* Form */}
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div className="mb-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div className="mb-4">
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div className="mb-4">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <div className="mb-4">
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <button type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
        {editingId ? "Update" : "Add"}
      </button>
    </form>
  </div>
  )
}

export default UserForm
