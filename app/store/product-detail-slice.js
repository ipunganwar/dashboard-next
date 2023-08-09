import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  details: {
    id: 0,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  },
};
