"use client"
import { Link } from "react-router-dom"
import { FaCalendarAlt, FaMoneyBillWave, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/projects")
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button when scrolled down more than 200px
      if (window.scrollY > 200) {
        setShowFloatingButton(true)
      } else {
        setShowFloatingButton(false)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:7000/api/projects/${id}`)
        setProjects(projects.filter(project => project._id !== id))
      } catch (error) {
        console.error("Error deleting project:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Projects</h1>
            <p className="text-gray-600">Manage your construction projects</p>
          </div>
          <Link
            to="/add-project"
            className="bg-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
          >
            <FaPlus />
            <span>New Project</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
                <h2 className="text-xl font-bold text-white mt-2">{project.name}</h2>
              </div>

              <div className="p-5">
                <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="text-teal-500 mr-2" />
                    <div>
                      <span className="text-xs text-gray-500">Project Duration</span>
                      <p className="text-sm">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <FaMoneyBillWave className="text-teal-500 mr-2" />
                    <div>
                      <span className="text-xs text-gray-500">Budget</span>
                      <p className="text-sm font-medium">{project.budget} dh</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/project/${project._id}/edit-project`}
                    className="flex-1 bg-amber-50 text-amber-600 px-4 py-2.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center space-x-1 font-medium border border-amber-200"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Link>
                  <button
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-1 font-medium border border-red-200"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <Link
                  to={`/project/${project._id}/tasks`}
                  className="w-full bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center font-medium"
                >
                  View Tasks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link
        to="/add-project"
        className={`fixed bottom-8 right-8 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center transform hover:scale-110 z-50 ${
          showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <FaPlus className="h-6 w-6" />
      </Link>
    </div>
  )
}

export default Home