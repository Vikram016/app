import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      (state.userInfo = null), AsyncStorage.clear();
    },
  },
});

export const loadUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");

    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.log("Error loading user info from asyncStorage", error);
    return null;
  }
};

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
