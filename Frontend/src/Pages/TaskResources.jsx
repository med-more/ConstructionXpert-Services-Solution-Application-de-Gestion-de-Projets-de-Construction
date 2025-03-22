"use client";

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaHardHat,
  FaWarehouse,
  FaTools,
  FaTruck,
  FaBoxOpen,
  FaWeightHanging,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

const TaskResources = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [resources, setResources] = useState([]);
  const [task, setTask] = useState(null);
  const [project, setProject] = useState(null);

  // Fetch project, task, and resources from the backend
  useEffect(() => {
    const fetchProjectTaskAndResources = async () => {
      try {
        // Fetch project details
        const projectResponse = await axios.get(`http://localhost:7000/api/projects/${projectId}`);
        setProject(projectResponse.data);

        // Fetch task details
        const taskResponse = await axios.get(`http://localhost:7000/api/tasks/${taskId}`);
        setTask(taskResponse.data);

        // Fetch resources for the task
        const resourcesResponse = await axios.get(`http://localhost:7000/api/resource/task/${taskId}`);
        setResources(resourcesResponse.data);
      } catch (error) {
        console.error("Error fetching project, task, or resources:", error);
      }
    };

    fetchProjectTaskAndResources();
  }, [projectId, taskId]);

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

  // Handle resource deletion
  const handleDeleteResource = async (resourceId) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`http://localhost:7000/api/resource/${resourceId}`);
        setResources(resources.filter((resource) => resource._id !== resourceId));
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    }
  };

  if (!task || !project) {
    return <div>Loading...</div>;
  }

  // Function to get resource type icon
  const getResourceIcon = (type) => {
    switch (type) {
      case "Labor":
        return <FaHardHat className="text-blue-500" />;
      case "Material":
        return <FaWarehouse className="text-amber-500" />;
      case "Equipment":
        return <FaTools className="text-green-500" />;
      case "Tool":
        return <FaTools className="text-purple-500" />;
      case "Transport":
        return <FaTruck className="text-red-500" />;
      default:
        return <FaBoxOpen className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Task Header */}
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
                  <div className="text-teal-100 text-sm mb-1">Project: {project.name}</div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Resources: {task.name}</h1>
                  <p className="text-teal-100 mt-1">{task.description}</p>
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-white">
                <div className="text-xs text-teal-100">Task Duration</div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-teal-200" />
                  <span>
                    {new Date(task.startDate).toLocaleDateString()} -{" "}
                    {new Date(task.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end mb-6">
          <Link
            to={`/project/${projectId}/task/${taskId}/add-resource`}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-teal-600 transition-colors shadow-sm"
          >
            <FaPlus />
            <span>Add Resource</span>
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="mr-3 p-2 rounded-lg bg-gray-100">{getResourceIcon(resource.type)}</div>
                  <h3 className="font-bold text-gray-800 text-lg">{resource.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Quantity</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaWeightHanging className="text-teal-500 mr-1 text-xs" />
                      {resource.quantity}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Type</div>
                    <div className="font-medium text-gray-700">{resource.type}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500">Supplier</div>
                    <div className="font-medium text-gray-700 flex items-center">
                      <FaBuilding className="text-teal-500 mr-1 text-xs" />
                      {resource.supplier}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
                <Link
                  to={`/project/${projectId}/task/${taskId}/edit-resource/${resource._id}`}
                  className="text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1 border border-amber-200"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDeleteResource(resource._id)}
                  className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 border border-red-200"
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add New Resource Button */}
        <Link
          to={`/project/${projectId}/task/${taskId}/add-resource`}
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

export default TaskResources;