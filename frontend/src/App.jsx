import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts and Pages
import DashboardLayout from './components/DashboardLayout';
import AdminHome from './pages/AdminHome';
import StudentList from './pages/StudentList';
import CourseList from './pages/CourseList';

// Import your other role dashboards when ready
import TeacherHome from './pages/TeacherHome'; 
import StudentHome from './pages/StudentHome';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          {/* DashboardLayout acts as the parent wrapper containing the Sidebar */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminHome />} /> 
            <Route path="students" element={<StudentList />} />
            <Route path="courses" element={<CourseList />} />
          </Route>
        </Route>

        {/* TEACHER ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
          <Route path="/teacher" element={<DashboardLayout />}>
            <Route index element={<TeacherHome />} />
            {/* Add teacher-specific sub-routes here like: path="grades" */}
          </Route>
        </Route>

        {/* STUDENT ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          console.log('Rendering Student Routes'); // Debugging line
          <Route path="/student" element={<DashboardLayout />}>
            <Route index element={<StudentHome />} />
            {/* Add student-specific sub-routes here like: path="schedule" */}
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
