import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NewsState {
  articles: any[],
  status: 'idle' | 'loading' | 'failed',
  error: string | null,
  page: number,
}

const initialState: NewsState = {
  articles: [],
  status: 'idle',
  error: null,
  page: 1,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async (page: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`);
  return response.data;
});

export const deletePost = async (id: number) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log(`Post with ID ${id} has been deleted`);
      return true;
    } else {
      console.error(`Failed to delete post with ID ${id}: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error: any) {
    console.error(`Failed to delete post with ID ${id}: ${error.message}`);
    return false;
  }
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export default newsSlice.reducer;