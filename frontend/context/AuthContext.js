import React, { createContext, useContext, useState } from "react";
import { Platform, ToastAndroid, AlertIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      AlertIOS.alert(message);
    }
  };

  const login = async (token, user) => {
    setToken(token);
    setUser(user);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  const adminLogin = async (adminToken, adminInfo) => {
    setAdminToken(adminToken);
    setAdminInfo(adminInfo);
    await AsyncStorage.setItem('adminToken', adminToken);
    await AsyncStorage.setItem('admin', JSON.stringify(adminInfo));
  };

  const adminLogout = async () => {
    setAdminToken(null);
    setAdminInfo(null);
    await AsyncStorage.removeItem('adminToken');
    await AsyncStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        adminToken,
        adminInfo,
        showToast,
        login,
        logout,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
