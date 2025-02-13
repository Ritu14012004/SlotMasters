import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Add Interviewer", path: "/add-interviewer" },
    { name: "Interviewer List", path: "/interviewers" },
    { name: "Schedule Interview", path: "/schedule-interview" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo - Left aligned */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-300">
          {/* Optional: Add an icon alongside the text */}
          <span className="text-3xl">🎯</span>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">SlotMaster</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl" 
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className={`hidden md:flex space-x-6`}>
          {navItems.map((item) => (
            <li key={item.path} className={`px-3 py-2 rounded-md ${location.pathname === item.path ? "bg-white text-blue-600" : ""}`}>
              <Link to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <ul className={`md:hidden ${isOpen ? "block mt-4" : "hidden"} space-y-2`}>
          {navItems.map((item) => (
            <li key={item.path} className={`px-3 py-2 rounded-md ${location.pathname === item.path ? "bg-white text-blue-600" : ""}`}>
              <Link to={item.path} onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
