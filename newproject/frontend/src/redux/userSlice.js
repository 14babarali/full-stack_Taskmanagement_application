// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for user actions
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await axios.post('/api/users', newUser);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`/api/users/${userId}`);
  return userId;
});

export const assignManager = createAsyncThunk('users/assignManager', async ({ userId, managerId }) => {
  const response = await axios.put(`/api/users/${userId}/assign-manager`, { managerId });
  return response.data;
});

// Initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(assignManager.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const existingUser = state.users.find(user => user._id === updatedUser._id);
        if (existingUser) {
          existingUser.managerId = updatedUser.managerId;
        }
      });
  },
});

export default userSlice.reducer;
