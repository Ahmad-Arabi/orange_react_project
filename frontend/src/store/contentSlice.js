import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Async thunk for fetching all content
export const fetchContents = createAsyncThunk(
    'content/fetchContents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/content');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
        }
    }
);

// Async thunk for fetching a single content item
export const fetchContentById = createAsyncThunk(
    'content/fetchContentById',
    async (contentId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/content/${contentId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch content');
        }
    }
);

// Async thunk for creating new content
export const createContent = createAsyncThunk(
    'content/createContent',
    async (contentData, { rejectWithValue }) => {
        try {
            const response = await api.post('/content', contentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create content');
        }
    }
);

// Async thunk for fetching user's content
export const fetchUserContents = createAsyncThunk(
    'content/fetchUserContents',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get('/content', {
                params: { user_id: userId }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user content');
        }
    }
);

const contentSlice = createSlice({
    name: 'content',
    initialState: {
        contents: [],
        currentContent: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearContentError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchContents
            .addCase(fetchContents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContents.fulfilled, (state, action) => {
                state.loading = false;
                state.contents = action.payload;
            })
            .addCase(fetchContents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while fetching content';
            })
            // Handle fetchContentById
            .addCase(fetchContentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContentById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentContent = action.payload;
            })
            .addCase(fetchContentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while fetching content';
            })
            // Handle createContent
            .addCase(createContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContent.fulfilled, (state, action) => {
                state.loading = false;
                state.contents.unshift(action.payload);
            })
            .addCase(createContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while creating content';
            })
            // Handle fetchUserContents
            .addCase(fetchUserContents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserContents.fulfilled, (state, action) => {
                state.loading = false;
                state.contents = action.payload;
            })
            .addCase(fetchUserContents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred while fetching user content';
            });
    },
});

export const { clearContentError } = contentSlice.actions;
export default contentSlice.reducer;