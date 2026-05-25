import { writable } from 'svelte/store';

export const user = writable(null);
export const isAuthenticated = writable(false);

export function setUser(userData, token) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  user.set(userData);
  isAuthenticated.set(true);
}

export function logout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  user.set(null);
  isAuthenticated.set(false);
}

export function loadUser() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (saved && token) {
      user.set(JSON.parse(saved));
      isAuthenticated.set(true);
    }
  }
}
