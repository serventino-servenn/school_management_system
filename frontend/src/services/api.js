import axios  from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

//dashboard 
export const getMetrics = () => api.get('/admin/dashboard/stats');
export const getInsights = () => api.get('/admin/dashboard/insights');
//courses
export const getCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const createCourse = (courseData) => api.post('/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const assignInstructor = (courseId, teacherId) =>
    api.put(`/courses/${courseId}/instructor/${teacherId}`);
// Add this to your api.js file alongside your other requests
// Requests page 0 with a large size window to pull all instructors into the list
// export const getAllTeachers = () => api.get('/users?role=TEACHER&page=0&size=50');

export const getUsersByRole = (
    role,
    page = 0,
    size = 100
) =>
    api.get(`/users?role=${role}&page=${page}&size=${size}`);



//users
export const getUsers = (page, size) => api.get(`/users?page=${page}&size=${size}`);
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const toggleUserStatus = (id) => api.patch(`/users/${id}/toggle-status`);
// export const createUser = (userData) => api.post('/users', userData);

export default api;