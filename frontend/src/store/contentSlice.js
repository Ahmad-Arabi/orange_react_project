import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    likedItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchContentStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchContentSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchContentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    likeItem(state, action) {
      const itemId = action.payload;
      if (!state.likedItems.includes(itemId)) {
        state.likedItems.push(itemId);
      }
    },
    unlikeItem(state, action) {
      const itemId = action.payload;
      state.likedItems = state.likedItems.filter(id => id !== itemId);
    },
    addComment(state, action) {
      const { itemId, comment } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.comments.push(comment);
      }
    },
  },
});

export const {
  fetchContentStart,
  fetchContentSuccess,
  fetchContentFailure,
  likeItem,
  unlikeItem,
  addComment,
} = contentSlice.actions;

export default contentSlice.reducer;