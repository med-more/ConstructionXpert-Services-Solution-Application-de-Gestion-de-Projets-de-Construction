"use client";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaTasks, FaFileAlt, FaCalendarAlt, FaSave, FaArrowLeft, FaEdit } from "react-icons/fa";
import { useEffect } from "react";

const EditTask = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`http://localhost:7000/api/tasks/${taskId}`, values);
        console.log("Task updated:", response.data);
        navigate(`/project/${projectId}/tasks`);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  });

  // Fetch task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/tasks/${taskId}`);
        const task = response.data;

        // Format dates to YYYY-MM-DD for the input fields
        const formattedStartDate = new Date(task.startDate).toISOString().split("T")[0];
        const formattedEndDate = new Date(task.endDate).toISOString().split("T")[0];

        // Set the form values
        formik.setValues({
          name: task.name,
          description: task.description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <FaEdit className="mr-3" />
              Edit Task
            </h2>
            <p className="mt-2 opacity-90">Update the details for this construction task</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Task Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTasks className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter task name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FaFileAlt className="text-gray-400" />
                  </div>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
                    placeholder="Describe the task details and requirements"
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">End Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                    {formik.touched.endDate && formik.errors.endDate ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
              <Link
                to={`/project/${projectId}/tasks`}
                className="inline-flex items-center justify-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Tasks
              </Link>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => formik.resetForm()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;