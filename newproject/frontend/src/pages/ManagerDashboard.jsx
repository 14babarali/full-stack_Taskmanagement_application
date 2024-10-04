import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../redux/taskSlice';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Manager Dashboard</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default ManagerDashboard;
