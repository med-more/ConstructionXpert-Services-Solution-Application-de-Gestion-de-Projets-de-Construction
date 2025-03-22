import { Link } from "react-router-dom"
import { useState } from "react"
import { FaTools } from "react-icons/fa"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-1 left-12 right-12 z-50 bg-teal-500 backdrop-blur-md rounded-3xl p-4 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1.5 shadow-md flex items-center justify-center w-9 h-9">
            <Link to={"/"}>
              <FaTools className="text-teal-500 text-xl" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white">
            <Link to={"/"}>
              <span className="hidden sm:inline">Construction</span>
            </Link>
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-white relative group font-medium">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? (
              <span className="block w-6 h-6 relative">
                <span className="block absolute w-6 h-0.5 bg-white transform rotate-45 top-1/2"></span>
                <span className="block absolute w-6 h-0.5 bg-white transform -rotate-45 top-1/2"></span>
              </span>
            ) : (
              <span className="block w-6 h-6 relative">
                <span className="block absolute w-6 h-0.5 bg-white top-2"></span>
                <span className="block absolute w-6 h-0.5 bg-white top-1/2 -translate-y-1/2"></span>
                <span className="block absolute w-6 h-0.5 bg-white bottom-2"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-teal-600/95 backdrop-blur-md mt-4 rounded-lg p-4 shadow-xl">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:bg-teal-700/50 py-2 px-4 rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
