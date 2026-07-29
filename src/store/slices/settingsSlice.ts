import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'dark' | 'light';
  autoRefresh: boolean;
  notificationsEnabled: boolean;
  timeFormat24h: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  autoRefresh: true,
  notificationsEnabled: true,
  timeFormat24h: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    toggleAutoRefresh(state) {
      state.autoRefresh = !state.autoRefresh;
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleTimeFormat(state) {
      state.timeFormat24h = !state.timeFormat24h;
    }
  },
});

export const { 
  toggleTheme, 
  setTheme,
  toggleAutoRefresh, 
  toggleNotifications, 
  toggleTimeFormat 
} = settingsSlice.actions;
export default settingsSlice.reducer;
