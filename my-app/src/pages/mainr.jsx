// src/pages/MainR.jsx
import { useNavigate } from 'react-router-dom';

export default function MainR() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">MainR Page</h1>
      <p className="text-gray-600 mb-8">This is a placeholder for your MainR page.</p>
      <button 
        onClick={handleLogout} 
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
