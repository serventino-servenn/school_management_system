import React, { useState, useEffect } from 'react';
import UserManagementHeader from '../../../components/admin/UserManagementHeader';
import UserControlBar from '../../../components/admin/UserControlBar';
import UserTable from '../../../components/admin/UserTable';
import PaginationFooter from '../../../components/admin/PaginationFooter';
import { Users } from 'lucide-react';
import { getUsers,register} from '../../../services/api';
import CreateOperatorModal from '../../../components/admin/CreateOperatorModal';


const AdminUsers = () => {
  // 1. Core Component States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Control Bar Roles Configuration map setup matches your selector components loop expectations
  const rolesList = ['ALL', 'STUDENT', 'TEACHER', 'ADMIN'];
// );

const fetchUsers = async () => {
    try {
        setLoading(true);

        const { data } = await getUsers(currentPage - 1, rowsPerPage);
        setUsers(data.content);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalElements);

    } catch (error) {
        console.error("Error fetching users:", error);

    } finally {
        setLoading(false);
    }
};

const handleSaveUser = async (formData) => {
    if (selectedUser) {
        await updateUser(selectedUser.id, formData);
    } else {
        await createUser(formData);
    }

    await fetchUsers();
    handleCloseModal();
};

const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
};     

const handleToggleStatus = (userId) => {
    console.log(`Toggling status for user ${userId}`);
};


useEffect(() => {
    const delay = setTimeout(() => {
        fetchUsers();
    }, 150);

    return () => clearTimeout(delay);
}, [currentPage, rowsPerPage]);

  // Guard clause: Reset page dynamically if search boundaries truncate current view selection rules
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);  



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
        users={users}
        loading={loading}
        onToggleStatus={handleToggleStatus}
      />
      {/* Component 4: Dynamic Metrics and Navigation Footer */}
      <PaginationFooter
        totalItems={totalItems}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
       />

      {/* Component 5: Overlay Action Form Modal handles record creation pipeline entries */}
      <CreateOperatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
      
    </div>
  );
};

export default AdminUsers;
