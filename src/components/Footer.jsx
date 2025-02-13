const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Left section with logo or text */}
            <div>
              <h4 className="text-lg font-semibold">Your Company Name</h4>
              <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
  
            {/* Middle section with links */}
            <div className="space-x-6">
              <a href="#about" className="text-sm hover:text-blue-400">About Us</a>
              <a href="#services" className="text-sm hover:text-blue-400">Services</a>
              <a href="#contact" className="text-sm hover:text-blue-400">Contact</a>
              <a href="#privacy" className="text-sm hover:text-blue-400">Privacy Policy</a>
            </div>
  
            {/* Right section with social icons */}
            <div className="space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  