import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

interface User {
  name: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<User | null>(null);

  const loadUserFromStorage = () => {
    const stored = localStorage.getItem('user');
    if (stored) user.value = JSON.parse(stored);
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  };

  const login = async (payload: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', payload);
    token.value = data.access_token;
    user.value = data.user;
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!token.value;

  return {
    token,
    user,
    register,
    login,
    logout,
    isAuthenticated,
    loadUserFromStorage,
  };
});
