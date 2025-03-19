"use client"
import { Link } from "react-router-dom"
import { FaCalendarAlt, FaMoneyBillWave, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa"

const Home = () => {

  const projects = [
    {
      id: 1,
      name: "Build Hospital",
      description:
        "Build Hospital is born Meldall it will have 2000m. Build Hospital is born Meldall it w. Build Hospital I edull it will have 2000m.",
      startDate: "01/05/2025",
      endDate: "01/05/2026",
      budget: "$2,500,000",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Bufid Hostpital",
      description:
        "Build Hospital in bnr Meldall it will have 2000m. Build Hospital in bnr Meldall it w. Build Hospital I edull it will have 2000m.",
      startDate: "01/05/2025",
      endDate: "01/05/2026",
      budget: "$3,200,000",
      status: "Planning",
    },
    {
      id: 3,
      name: "City Mall Complex",
      description:
        "A modern shopping complex with entertainment facilities spanning 15,000 square meters in the heart of downtown.",
      startDate: "15/07/2025",
      endDate: "22/12/2026",
      budget: "$5,800,000",
      status: "Approved",
    },
    {
      id: 4,
      name: "Riverside Apartments",
      description:
        "Luxury residential complex with 120 units overlooking the river, featuring modern amenities and sustainable design.",
      startDate: "10/03/2025",
      endDate: "30/06/2026",
      budget: "$4,100,000",
      status: "Planning",
    },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
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
              key={project.id}
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
                        {project.startDate} - {project.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <FaMoneyBillWave className="text-teal-500 mr-2" />
                    <div>
                      <span className="text-xs text-gray-500">Budget</span>
                      <p className="text-sm font-medium">{project.budget}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/project/${project.id}/edit-project`}
                    className="flex-1 bg-amber-50 text-amber-600 px-4 py-2.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center space-x-1 font-medium border border-amber-200"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </Link>
                  <button
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-1 font-medium border border-red-200"
                    onClick={() => confirm(`Are you sure you want to delete ${project.name}?`)}
                  >
                    <FaTrashAlt />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <Link
                  to={`/project/${project.id}/tasks`}
                  className="w-full bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center font-medium"
                >
                  View Tasks
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

