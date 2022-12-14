import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk("tour/createTour", async ({ updatedTourData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      console.log("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk("tour/getTours", async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk("tour/getTour", async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk("tour/getToursByUser", async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk("tour/deleteTour", async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      console.log("Post Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk("tour/updateTour", async ({ id, updatedTourData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      console.log("Post Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk("tour/searchTours", async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeTour = createAsyncThunk("tour/likeTour", async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
    name: "tour",
    initialState: {
      tour: {},
      tours: [],
      userTour: [],
      error: "",
      loading: false,
    },
    extraReducers: {
      [createTour.pending]: (state, action) => {
        state.loading = true;
      },
      [createTour.fulfilled]: (state, action) => {
        state.loading = false;
        state.tours = [action.payload];
      },
      [createTour.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [getTours.pending]: (state, action) => {
        state.loading = true;
      },
      [getTours.fulfilled]: (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      },
      [getTours.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [getTour.pending]: (state, action) => {
        state.loading = true;
      },
      [getTour.fulfilled]: (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      },
      [getTour.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [getToursByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getToursByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.userTours = action.payload;
      },
      [getToursByUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [deleteTour.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteTour.fulfilled]: (state, action) => {
        state.loading = false;       
        const {arg} = action.meta; // Contains post id
        if(arg){
          state.userTours = state.userTours.filter((item) => item._id !== arg);
          state.tours = state.tours.filter((item) => item._id !== arg);
        }
      },

      [deleteTour.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [updateTour.pending]: (state, action) => {
        state.loading = true;
      },
      [updateTour.fulfilled]: (state, action) => {
        state.loading = false;       
        const { arg } = action.meta; // Contains post id
        if(arg){
          state.userTours = state.userTours.map((item) => item._id === arg ? action.payload : item);
          state.tours = state.tours.map((item) => item._id === arg ? action.payload : item);
        }
      },
      [updateTour.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [searchTours.pending]: (state, action) => {
        state.loading = true;
      },
      [searchTours.fulfilled]: (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      },
      [searchTours.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [likeTour.pending]: (state, action) => {},
      [likeTour.fulfilled]: (state, action) => {
        state.loading = false;       
        const { arg } = action.meta; // Contains post id
        
        if(arg){
          state.tours = state.tours.map((item) => item._id === arg ? action.payload : item);
        }
      },
      [likeTour.rejected]: (state, action) => {
        state.error = action.payload.message;
      },
    },
  });

  export default tourSlice.reducer;