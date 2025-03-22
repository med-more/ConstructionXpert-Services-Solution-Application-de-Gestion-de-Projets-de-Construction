import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTools,
  FaTrashAlt,
} from "react-icons/fa";

const Tasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [resourceCounts, setResourceCounts] = useState({});

  // Fetch project and tasks from the backend
  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        // Fetch project details
        const projectResponse = await axios.get(`http://localhost:7000/api/projects/${projectId}`);
        setProject(projectResponse.data);

        // Fetch tasks for the project
        const tasksResponse = await axios.get(`http://localhost:7000/api/tasks/project/${projectId}`);
        setTasks(tasksResponse.data);

        // Fetch resource counts for each task
        const counts = {};
        for (const task of tasksResponse.data) {
          const resourcesResponse = await axios.get(`http://localhost:7000/api/resource/task/${task._id}`);
          counts[task._id] = resourcesResponse.data.length;
        }
        setResourceCounts(counts);
      } catch (error) {
        console.error("Error fetching project, tasks, or resources:", error);
      }
    };

    fetchProjectAndTasks();
  }, [projectId]);

  // Handle scroll to show/hide floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:7000/api/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Project Header */}
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
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 w-full mb-5 sm:w-auto">
          <Link
            to={`/project/${projectId}/add-task`}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors ml-auto"
          >
            <FaPlus />
            <span>New Task</span>
          </Link>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Task Header */}
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{task.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
              </div>

              {/* Task Details */}
              <div className="px-4 py-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaCalendarAlt className="text-teal-500 mr-1 text-xs" />
                      {new Date(task.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaCalendarAlt className="text-teal-500 mr-1 text-xs" />
                      {new Date(task.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-2">
                  <Link
                    to={`/project/${projectId}/task/${task._id}/resources`}
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 border border-blue-200"
                  >
                    <FaTools className="text-xs" />
                    <span>Resources ({resourceCounts[task._id] || 0})</span>
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to={`/project/${projectId}/task/${task._id}/edit-task`}
                      className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center border border-amber-200"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
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

        {/* Floating Add New Task Button */}
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
  );
};

export default Tasks;