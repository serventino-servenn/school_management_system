import React, { useState, useEffect } from 'react';
import UserManagementHeader from '../../../components/admin/UserManagementHeader';
import UserControlBar from '../../../components/admin/UserControlBar';
import UserTable from '../../../components/admin/UserTable';
import PaginationFooter from '../../../components/admin/PaginationFooter';
import { Users } from 'lucide-react';
import { getUsers } from '../../../services/api';

const AdminUsers = () => {
  // 1. Core Component States
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [selectedRole, setSelectedRole] = useState('All Status');

  // 2. Client-side Filtering Logic (Filters users based on search bar text and role toggle)
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      selectedRole === 'All Status' || 
      user.role?.toLowerCase() === selectedRole.toLowerCase();

    return matchesSearch && matchesRole;
  });

  // 3. Pagination Math (Uses filtered results so page count fixes itself when searching)
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // 4. Action Handler Placeholder
  const handleToggleStatus = (userId) => {
    console.log(`Toggling status for user ID: ${userId}`);
  };

  // 5. API Fetch Hook
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock wrapper around your custom API call logic
        const { data } = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    /* Outer canvas wrapper handling dark theme aesthetics */
    <div className="space-y-8">

      
      {/* Structural abstract design backdrop asset */}
      {/* <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-slate-900 via-slate-900/40 to-transparent pointer-events-none hidden md:block" /> */}

      {/* Main Content Container constraining width on wider desktop resolutions */}
      {/* <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10"> */}
        
        {/* Component 1: Unique Dynamic Header Section */}
        <UserManagementHeader 
          totalUsers={users.length} 
          setIsModalOpen={setIsModalOpen} 
        />
        
        {/* Component 2: Omnibar Input Search and Filter Strip */}
        <UserControlBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        {/* Subheading anchor exactly like your <BookMarked /> section */}
        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Users size={14} />
            Identity Infrastructure
            </h3>
        </div>

        {/* Component 3: Unique Data Matrix Row System Display */}
        <UserTable 
          users={currentUsers} 
          onToggleStatus={handleToggleStatus} 
        />

        {/* Component 4: Dynamic Metrics and Navigation Footer */}
        <PaginationFooter 
          totalItems={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
      {/* </div> */}
    </div>
  );
};

export default AdminUsers;
