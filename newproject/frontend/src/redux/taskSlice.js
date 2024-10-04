import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get('http://localhost:5000/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});



export default taskSlice.reducer;
