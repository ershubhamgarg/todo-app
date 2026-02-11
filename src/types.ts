export type Priority = 'High' | 'Medium' | 'Low';
export type Filter = 'All' | 'Today' | 'Upcoming' | 'Done';

export interface TodoItem {
  id: string;
  title: string;
  note: string;
  due: string;
  priority: Priority;
  tags: string[];
  completed: boolean;
  starred: boolean;
  reminderMinutes: number;
  reminderId: string | null;
  reminderSetAt: number | null;
  order: number;
}

export interface TodoStats {
  total: number;
  done: number;
  today: number;
}

export type ThemeMode = 'system' | 'light' | 'dark';
export type PaletteName = 'orange' | 'green' | 'blue' | 'red' | 'mono';

export interface ThemeColors {
  backgroundTop: string;
  backgroundBottom: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  outline: string;
  success: string;
  warning: string;
  danger: string;
  chip: string;
  tag: string;
  glow: string;
  avatarBg: string;
  primary: string;
  accent: string;
  primaryDark: string;
  darkChip: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Settings: undefined;
  Pin: { mode?: 'unlock' | 'set' | 'change' } | undefined;
  ConfirmPin: undefined;
};
