import { motion } from 'framer-motion';
import Header from './Header';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header */}
      <Header />
      {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image.jpg')" }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Content */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white"
        >
          <h1 className="text-4xl font-bold mb-6">Welcome to Stock Management System</h1>
          <NavLink to="/home" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md font-semibold">
            View Stock
          </NavLink>

        </motion.div>
      </div>
  );
}
