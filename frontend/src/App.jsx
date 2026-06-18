import { Routes, Route ,Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts and Pages
import DashboardLayout from './components/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminCourses from './pages/admin/courses/AdminCourses';
import CourseForm from './pages/admin/courses/CourseForm';
import CourseDetails from './pages/admin/courses/CourseDetails';
// import AdminEnrollments from './pages/AdminEnrollment';
import AdminAnalytics from './pages/admin/analytics/AdminAnalytics';

//teacher and layouts
import TeacherLayout from './components/TeacherLayout';
import TeacherAttendance from './pages/TeacherAttendance';
import TeacherGradeBook from './pages/TeacherGradeBook';
import TeacherLessons from './pages/TeacherLessons';
import TeacherResources from './pages/TeacherResources';

// srtudent and layouts
import StudentLayout from './components/StudentLayout';
import StudentHome from './pages/StudentHome';
import StudentAcademicRecord from './pages/StudentAcademicRecord';
import CourseEnrollment from './pages/CourseEnrollment';
import AiStudyBuddy from './pages/AiStudyBuddy';
import SmartAlerts from './pages/SmartAlerts';
import FinancialPortal from './pages/FinancialPortal';

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
            {/* dashboard */}
            <Route index element={<AdminHome />} /> 
            {/* user management */}
            <Route path="users" element={<AdminUsers />} />
            {/* course management */}
            {/* Course Management */}
            <Route path="course-management" element={<Outlet />}>
              <Route index element={<AdminCourses />} />
              <Route path="new" element={<CourseForm/>} />
              <Route path=":courseId" element={<CourseDetails />} />
              <Route path=":courseId/edit" element={<CourseForm/>} />
            </Route>
            {/* <Route path="courses" element={<AdminCourses />} /> */}
            {/* <Route path="enrollments" element={<AdminEnrollments />} /> */}
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>

        {/* TEACHER ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path='gradebook' element={<TeacherGradeBook />} />
            <Route path="lessons" element={<TeacherLessons />} />
            <Route path="resources" element={<TeacherResources />} />
          </Route>
        </Route>

        {/* STUDENT ROUTES (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          {/* Note: The raw console.log was removed from here to prevent routing syntax crashes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path="profile" element={<StudentAcademicRecord />} />
            <Route path="enrollment" element={<CourseEnrollment />} />
            <Route path="ai-buddy" element={<AiStudyBuddy />} />
            <Route path="alerts" element={<SmartAlerts />} />
            <Route path="financial" element={<FinancialPortal />} />
          </Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;

