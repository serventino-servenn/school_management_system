import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import AdminHome from './pages/AdminHome';
import StudentList from './pages/StudentList';
import CourseList from './pages/CourseList';


function App() {
  return (
    <>
      <Navbar />
         <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardLayout />} />

            {/* Admin Routes - Nested inside the layout */}
            <Route path="/admin" element={<AdminHome />}>
              <Route index element={<AdminHome />} /> {/* This is the default dashboard page */}
              <Route path="students" element={<StudentList />} />
              <Route path="courses" element={<CourseList />} />
            </Route>
          </Routes>

      <Footer />
    </>
   
  );
}

export default App
