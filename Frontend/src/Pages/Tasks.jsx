"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaCalendarAlt, FaPlus, FaEdit, FaTools, FaTrashAlt } from "react-icons/fa"

const Tasks = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true)
      } else {
        setShowFloatingButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const project = {
    id: projectId,
    name: "Build Hospital",
    description: "Construction of a new 2000m² hospital facility with modern medical equipment and infrastructure.",
    startDate: "01/05/2025",
    endDate: "01/05/2026",
    budget: "$2,500,000",
  }

  const allTasks = [
    {
      id: 1,
      name: "Foundation Excavation",
      description: "Excavate the site and prepare foundation base",
      startDate: "01/05/2025",
      endDate: "15/05/2025",
      assignedTo: "John Smith",
      resources: 8,
    },
    {
      id: 2,
      name: "Concrete Foundation Pouring",
      description: "Pour concrete for the main building foundation",
      startDate: "16/05/2025",
      endDate: "30/05/2025",
      assignedTo: "Mike Johnson",
      resources: 12,
    },
    {
      id: 3,
      name: "Structural Framework",
      description: "Erect the main structural steel framework",
      startDate: "01/06/2025",
      endDate: "30/06/2025",
      assignedTo: "Construction Team A",
      resources: 15,
    },
    {
      id: 4,
      name: "Electrical Wiring Planning",
      description: "Design and plan the electrical wiring system",
      startDate: "15/06/2025",
      endDate: "30/06/2025",
      assignedTo: "Electrical Team",
      resources: 6,
    },
    {
      id: 5,
      name: "Plumbing Installation",
      description: "Install main plumbing systems throughout the building",
      startDate: "01/07/2025",
      endDate: "31/07/2025",
      assignedTo: "Plumbing Contractors",
      resources: 9,
    },
    {
      id: 6,
      name: "HVAC System Installation",
      description: "Install heating, ventilation, and air conditioning systems",
      startDate: "15/07/2025",
      endDate: "15/08/2025",
      assignedTo: "HVAC Specialists",
      resources: 7,
    },
  ]

  const filteredTasks = allTasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border border-gray-200">
          <div className="bg-gradient-to-r from-teal-500 to-teal-800 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{project.name}</h1>
                  <p className="text-teal-100 mt-1">{project.description}</p>
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                <div className="text-xs text-teal-100">Project Duration</div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-teal-200" />
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full mb-5 sm:w-auto">
          <Link
            to={`/project/${projectId}/add-task`}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors ml-auto"
          >
            <FaPlus />
            <span>New Task</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{task.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
              </div>

              <div className="px-4 py-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaCalendarAlt className="text-teal-500 mr-1 text-xs" />
                      {task.startDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaCalendarAlt className="text-teal-500 mr-1 text-xs" />
                      {task.endDate}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-2">
                  <Link
                    to={`/project/${projectId}/task/${task.id}/resources`}
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 border border-blue-200"
                  >
                    <FaTools className="text-xs" />
                    <span>Resources ({task.resources})</span>
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={`/project/${projectId}/task/${task.id}/edit-task`}
                      className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center border border-amber-200"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => confirm(`Are you sure you want to delete "${task.name}"?`)}
                      className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center border border-red-200"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/project/${projectId}/add-task`}
          className={`fixed bottom-8 right-8 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center transform hover:scale-110 z-50 ${
            showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <FaPlus className="h-6 w-6" />
        </Link>
      </div>
    </div>
  )
}

export default Tasks

