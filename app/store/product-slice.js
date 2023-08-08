import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStorageBrand,
  getStorageCategory,
  removeStorageBrand,
  removeStorageCategory,
  setStorageBrand,
  setStorageCategory,
  setStorageList,
  getStorageList,
  removeStorageList,
} from "../../utils/webStorage";

const initialState = {
  products: {
    list: [],
    totalList: 0,
    page: 0,
    totalPage: 0,
    limit: 0,
  },
  filter: {
    minPrice: "",
    maxPrice: "",
  },
  sidebar: {
    brandList: [],
    categoryList: [],
    errorMsg: "",
  },
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBrandFilter(state, action) {
      if (action?.payload?.brandFilter.length > 0) {
        state.sidebar.brandList = action?.payload?.brandFilter;
        setStorageBrand(action?.payload?.brandFilter);
      }
    },
    setCategoryFilter(state, action) {
      if (action?.payload?.categoryFilter.length > 0) {
        state.sidebar.categoryList = action?.payload?.categoryFilter;
        setStorageCategory(action?.payload?.categoryFilter);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = Object.assign(state.products, { ...action.payload });
    }),
      builder.addCase(fetchSearch.fulfilled, (state, action) => {
        state.products = Object.assign(state.products, { ...action.payload });
      });
    builder.addCase(fetchSidebarFilter.fulfilled, (state, action) => {
      state.sidebar = Object.assign(state.sidebar, { ...action.payload });
    });
    builder.addCase(fetchFilter.fulfilled, (state, action) => {
      let temp = [];
      const minPrice = action?.payload?.minPrice;
      const maxPrice = action?.payload?.maxPrice;

      const brandFilter = state?.sidebar?.brandList.filter(
        (opt) => opt?.checked,
      );
      if (brandFilter.length > 0) {
        brandFilter.forEach((item) => {
          const apiData = action?.payload?.list?.filter(
            (opt) => opt?.brand === item.title,
          );
          temp.push(...apiData);
        });
      }

      const categoryFilter = state?.sidebar?.categoryList.filter(
        (opt) => opt?.checked,
      );

      if (categoryFilter.length > 0) {
        categoryFilter.forEach((item) => {
          const apiData = action?.payload?.list?.filter(
            (opt) => opt?.category === item.title,
          );
          temp.push(...apiData);
        });
      }

      if (+minPrice > 0) {
        temp = temp.filter((opt) => opt?.price >= +minPrice);
      }
      if (+maxPrice > 0) {
        temp = temp.filter((opt) => opt?.price <= +maxPrice);
      }

      const setDataFilter = temp.length > 0 ? temp : action?.payload?.list;
      state.products.list = setDataFilter;
      setStorageList(setDataFilter);

      state.filter = Object.assign(state.filter, {
        minPrice: +minPrice,
        maxPrice: +maxPrice || "",
      });
    });
    builder.addCase(resetFilter.fulfilled, (state, action) => {
      state.products.list = action?.payload?.list;
      state.sidebar = Object.assign(state.sidebar, {
        brandList: action?.payload?.brandList,
        categoryList: action?.payload?.categoryList,
      });
      state.filter = Object.assign(state.filter, {
        minPrice: "",
        maxPrice: "",
      });

      removeStorageCategory();
      removeStorageBrand();
      removeStorageList();
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/getAll",
  async ({ limit = 10, skip = 0 }) => {
    try {
      // const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const response = await fetch(`https://dummyjson.com/products`);
      const result = await response.json();

      const cachedDataList = getStorageList();

      return {
        list:
          cachedDataList.length > 0 ? cachedDataList : result?.products || [],
        totalList: result?.total || 0,
        limit: result?.limit || 0,
      };
    } catch (error) {}
  },
);

export const fetchSidebarFilter = createAsyncThunk(
  "products/sidebarFilter",
  async () => {
    const cacheBrand = getStorageBrand();
    const cacheCategory = getStorageCategory();

    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();

    const setBrandList = result?.products?.map((obj) => ({
      title: obj?.brand,
      checked: false,
    }));
    const uniqueBrands = setBrandList.filter(
      (value, index, self) =>
        self.findIndex((v) => v?.title === value?.title) === index,
    );

    const setCategoryList = result?.products?.map((obj) => ({
      title: obj?.category,
      checked: false,
    }));
    const uniqueCategory = setCategoryList.filter(
      (value, index, self) =>
        self.findIndex((v) => v?.title === value?.title) === index,
    );

    return {
      brandList: cacheBrand.length > 0 ? cacheBrand : uniqueBrands,
      categoryList: cacheCategory.length > 0 ? cacheCategory : uniqueCategory,
    };
  },
);

export const fetchSearch = createAsyncThunk(
  "products/search",
  async ({ param = "" }) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${param}`,
      );
      const result = await response.json();

      const totalList = result?.total || 0;
      const limit = result?.limit || 0;

      return {
        list: result?.products || [],
        totalList,
        limit,
      };
    } catch (error) {}
  },
);

export const fetchFilter = createAsyncThunk(
  "products/filters",
  async ({ min = "", max = "" }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products`);
      const result = await response.json();

      return {
        list: result?.products || [],
        minPrice: min,
        maxPrice: max,
      };
    } catch (error) {
      console.warn(error);
    }
  },
);

export const resetFilter = createAsyncThunk("products/reset", async () => {
  try {
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json();

    const setBrandList = result?.products?.map((obj) => ({
      title: obj?.brand,
      checked: false,
    }));
    const uniqueBrands = setBrandList.filter(
      (value, index, self) =>
        self.findIndex((v) => v?.title === value?.title) === index,
    );

    const setCategoryList = result?.products?.map((obj) => ({
      title: obj?.category,
      checked: false,
    }));
    const uniqueCategory = setCategoryList.filter(
      (value, index, self) =>
        self.findIndex((v) => v?.title === value?.title) === index,
    );

    return {
      list: result?.products || [],
      brandList: uniqueBrands,
      categoryList: uniqueCategory,
    };
  } catch (error) {
    console.warn(error);
  }
});

export const { setBrandFilter, setCategoryFilter } = products.actions;
export default products.reducer;
