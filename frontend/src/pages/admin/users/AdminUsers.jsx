import React, { useState, useEffect } from 'react';
import UserManagementHeader from '../../../components/admin/UserManagementHeader';
import UserControlBar from '../../../components/admin/UserControlBar';
import UserTable from '../../../components/admin/UserTable';
import PaginationFooter from '../../../components/admin/PaginationFooter';
import { Users } from 'lucide-react';
import { getUsers } from '../../../services/api';
import CreateOperatorModal from '../../../components/admin/CreateOperatorModal';


const AdminUsers = () => {
  // 1. Core Component States
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [selectedRole, setSelectedRole] = useState('All Status');

  // Control Bar Roles Configuration map setup matches your selector components loop expectations
  const rolesList = ['All Status', 'Standard', 'Manager', 'Admin'];

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
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  
  // Guard clause: Reset page dynamically if search boundaries truncate current view selection rules
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchTerm, selectedRole, totalPages, currentPage]);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // 4. Action Handler: Save New Provisioned Operator directly into local view array frame
  const handleSaveUser = (newOperator) => {
    setUsers((prevUsers) => [newOperator, ...prevUsers]);
  };

  // 5. Action Handler Placeholder for Table row triggers
  const handleToggleStatus = (userId) => {
    console.log(`Toggling status for user ID: ${userId}`);
  };

  // 6. API Fetch Hook (Using standard lifecycle wrappers)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock fallback check array payload injection if API call is unconfigured initially
        const { data } = await getUsers();
        setUsers(data);
        
        // Sample initial dataset mock to instantly visualize UI metrics
        // setUsers([
        //   { id: 'USR-839201', firstName: 'Sarah', lastName: 'Connor', email: 's.connor@sky.school', role: 'Admin', createdAt: '2026-03-15T08:30:00.000Z' },
        //   { id: 'USR-294012', firstName: 'Marcus', lastName: 'Wright', email: 'mwright@cyber.school', role: 'Manager', createdAt: '2026-05-20T14:15:00.000Z' },
        //   { id: 'USR-748291', firstName: 'John', lastName: 'Connor', email: 'jconnor@resistance.school', role: 'Standard', createdAt: '2026-06-01T11:05:00.000Z' }
        // ]);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    /* Outer canvas wrapper handling theme aesthetics */
    <div className="space-y-8 relative">
      
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
        roles={rolesList} // Passed array reference explicit config rules down to subcomponent
      />

      {/* Subheading anchor matching the admin theme specs */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Users size={14} className="text-slate-400" />
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

      {/* Component 5: Overlay Action Form Modal handles record creation pipeline entries */}
      <CreateOperatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
      
    </div>
  );
};

export default AdminUsers;
