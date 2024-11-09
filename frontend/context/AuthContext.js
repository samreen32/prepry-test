import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform, ToastAndroid, AlertIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(null); // User token
  const [user, setUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null); // Admin token
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
        const storedAdminToken = await AsyncStorage.getItem('adminToken');
        if (storedAdminToken) {
          setAdminToken(storedAdminToken);
        }
        const storedUserData = await AsyncStorage.getItem('user');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
        const storedAdminData = await AsyncStorage.getItem('admin');
        if (storedAdminData) {
          setAdminInfo(JSON.parse(storedAdminData));
        }
      } catch (error) {
        console.error("Failed to load initial data from AsyncStorage:", error);
      }
      setAuthLoading(false);
    };
    loadInitialData();
  }, []);

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      AlertIOS.alert(message);
    }
  };

  const login = async (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const adminLogin = async (newAdminToken, newAdminInfo) => {
    setAdminToken(newAdminToken);
    setAdminInfo(newAdminInfo);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('adminToken', newAdminToken);
    await AsyncStorage.setItem('admin', JSON.stringify(newAdminInfo));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  const adminLogout = async () => {
    setAdminToken(null);
    setAdminInfo(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('adminToken');
    await AsyncStorage.removeItem('admin');
  };

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedAdminToken = await AsyncStorage.getItem('adminToken');
      if (storedToken || storedAdminToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking for token:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        adminToken,
        setAdminToken,
        adminInfo,
        showToast,
        login,
        logout,
        adminLogin,
        adminLogout,
        isAuthenticated,
        setIsAuthenticated,
        authLoading,
        setAuthLoading,
        setAdminInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
