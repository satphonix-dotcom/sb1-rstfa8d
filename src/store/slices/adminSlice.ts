```typescript
// Update the admin slice to include user management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { User } from '../../types';

interface AdminState {
  stats: {
    totalRevenue: number;
    activeUsers: number;
    activeVendors: number;
    totalProducts: number;
  };
  users: User[];
  pendingVendors: any[];
  pendingProducts: any[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async () => {
    const response = await api.get('/admin/users');
    return response.data;
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, status }: { userId: string; status: string }) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { status });
    return response.data;
  }
);

// ... existing thunks ...

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {
      totalRevenue: 0,
      activeUsers: 0,
      activeVendors: 0,
      totalProducts: 0
    },
    users: [],
    pendingVendors: [],
    pendingProducts: [],
    loading: false,
    error: null
  } as AdminState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Existing cases...
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  }
});

export default adminSlice.reducer;
```