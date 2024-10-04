import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from '../components/TaskList';
import { fetchTasks, deleteTask, updateTask } from '../redux/taskSlice';
import { fetchUsers, createUser, deleteUser, assignManager } from '../redux/userSlice';


// In AdminDashboard.js
console.log('AdminDashboard component mounted');

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const users = useSelector((state) => state.users.users);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'regular' }); // Default is 'regular'
  const [assignUser, setAssignUser] = useState({ userId: '', managerId: '' });

  useEffect(() => {
    console.log('Component mounted');
    console.log('Fetching tasks and users');
    dispatch(fetchTasks()); // Fetch all tasks
    dispatch(fetchUsers()); // Fetch all users
  }, [dispatch]);

  // Handle creating a new user (Admin can create new Managers and Regular Users)
  const handleCreateUser = () => {
    dispatch(createUser(newUser));
    setNewUser({ name: '', email: '', role: 'regular' }); // Reset form
  };

  // Handle assigning a Manager to a User
  const handleAssignManager = () => {
    dispatch(assignManager(assignUser));
    setAssignUser({ userId: '', managerId: '' }); // Reset form
  };

  // Handle deleting a task (Admin can delete any task)
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Handle deleting a user (Admin can delete any user)
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  // Handle editing a task's status
  const handleUpdateTask = (taskId, status) => {
    dispatch(updateTask({ taskId, status }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {console.log('Rendering AdminDashboard')}
      {/* Create New User Section */}
      <div className="my-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Create New User</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded-md flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded-md flex-1"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 rounded-md flex-1"
          >
            <option value="regular">Regular User</option>
            <option value="manager">Manager</option>
          </select>
          <button onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Create User
          </button>
        </div>
      </div>

      {/* Assign Manager to User Section */}
      <div className="my-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Assign Manager to User</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <select
            value={assignUser.userId}
            onChange={(e) => setAssignUser({ ...assignUser, userId: e.target.value })}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">Select User</option>
            {users.filter(user => user.role === 'regular').map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          <select
            value={assignUser.managerId}
            onChange={(e) => setAssignUser({ ...assignUser, managerId: e.target.value })}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">Select Manager</option>
            {users.filter(user => user.role === 'manager').map((manager) => (
              <option key={manager._id} value={manager._id}>{manager.name}</option>
            ))}
          </select>
          <button onClick={handleAssignManager} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Assign Manager
          </button>
        </div>
      </div>

      {/* User Management Section */}
      <div className="my-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">All Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center p-2 border rounded-md">
              <div>
                <strong>{user.name}</strong> - {user.email} ({user.role})
              </div>
              <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Task Management Section */}
      <div className="my-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">All Tasks</h2>
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
