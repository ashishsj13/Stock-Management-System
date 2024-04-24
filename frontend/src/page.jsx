import { motion } from 'framer-motion';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setMessage('');
    }, 1000); // Clear message/error after 5 seconds

    return () => clearTimeout(timer); // Clear the timer when component unmounts
  }, [error, message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password
      });
      setMessage('Registration successful. Please log in.');
      setUsername('');
      setPassword('');
      setIsLogin(true);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image.jpg')" }}></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
      >
        <h1 className="text-4xl font-bold mb-6">Welcome to Stock Management System</h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col items-center justify-center mb-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-200 mb-2 px-4 py-2 rounded-lg text-black" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 mb-4 px-4 py-2 rounded-lg text-black" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md font-semibold">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col items-center justify-center mb-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-200 mb-2 px-4 py-2 rounded-lg text-black" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 mb-4 px-4 py-2 rounded-lg text-black" />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-md font-semibold">Register</button>
          </form>
        )}
        <button onClick={toggleForm} className="text-white-500 hover:text-blue-600 mb-4">{isLogin ? 'Create an account' : 'Already have an account? Login'}</button>
      </motion.div>
    </div>
  );
};

export default Home;
