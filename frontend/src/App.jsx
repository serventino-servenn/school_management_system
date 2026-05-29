import { Routes, Route ,Outlet} from 'react-router-dom';
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

import { AuthProvider } from './context/AuthContext';

const  PublicLayout =  () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    // 2. Wrap everything in the AuthProvider so useAuth() is accessible everywhere
    <AuthProvider>
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ADMIN ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
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
          </Route>
        </Route>

        {/* STUDENT ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          {/* Note: The raw console.log was removed from here to prevent routing syntax crashes */}
          <Route path="/student" element={<DashboardLayout />}>
            <Route index element={<StudentHome />} />
          </Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;

