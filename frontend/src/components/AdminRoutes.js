// adminRoutes.js - Centralized View Registry
import { LayoutDashboard, Users, BookOpen, TrendingUp } from "lucide-react";

export const ADMIN_VIEWS = {
  OVERVIEW: {
    path: "/admin",
    label: "Overview",
    subtitle: "System Control",
    icon: <LayoutDashboard size={20} />,
  },
  USERS: {
    path: "/admin/users",
    label: "User Management",
    subtitle: "Student & Teacher Lifecycles",
    icon: <Users size={20} />,
  },
  COURSES: {
    path: "/admin/course-management",
    label: "Courses Management",
    subtitle: "Cohorts & Academic Tracks",
    icon: <BookOpen size={20} />,
  },
  ANALYTICS: {
    path: "/admin/analytics",
    label: "Analytics",
    subtitle: "Enrollments & Financial Health",
    icon: <TrendingUp size={20} />,
  }
};

// Convert to array only when rendering the navigation elements
export const menuItems = Object.values(ADMIN_VIEWS);
