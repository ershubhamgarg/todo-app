import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import StatsCard from '../src/components/StatsCard';
import QuickAdd from '../src/components/QuickAdd';
import SectionHeader from '../src/components/SectionHeader';
import CustomHeader from '../src/components/CustomHeader';
import TodoCard from '../src/components/TodoCard';
import Toast from '../src/components/Toast';
import type { TodoItem } from '../src/types';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const sampleTodo: TodoItem = {
  id: '1',
  title: 'Test Task',
  note: 'Note',
  due: 'Today',
  priority: 'High',
  tags: ['Work'],
  completed: false,
  starred: false,
  reminderMinutes: 0,
  reminderId: null,
  reminderSetAt: null,
  order: 1,
};

describe('Components', () => {
  it('renders StatsCard', () => {
    const { getByText } = wrap(<StatsCard stats={{ total: 3, done: 1, today: 2 }} />);
    expect(getByText('Today Focus')).toBeTruthy();
  });

  it('renders QuickAdd and adds task', () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    const { getByPlaceholderText, getByRole } = wrap(<QuickAdd onAdd={onAdd} />);
    fireEvent.changeText(getByPlaceholderText('Quick add a task'), 'New Task');
    fireEvent.press(getByRole('button'));
    expect(onAdd).toHaveBeenCalled();
  });

  it('renders SectionHeader', () => {
    const { getByText } = wrap(<SectionHeader title="Your Flow" subtitle="1/2 done" />);
    expect(getByText('Your Flow')).toBeTruthy();
  });

  it('renders CustomHeader', () => {
    const { getByText } = wrap(<CustomHeader title="LetsDoIt" subtitle="Focus" />);
    expect(getByText('LetsDoIt')).toBeTruthy();
  });

  it('renders TodoCard and toggles expand', () => {
    const onPress = jest.fn();
    const { getByText, queryByText } = wrap(
      <TodoCard
        todo={sampleTodo}
        onToggle={() => null}
        onStar={() => null}
        onPress={onPress}
        onDetails={() => null}
        drag={() => null}
        isActive={false}
        draggable={false}
        now={Date.now()}
        expanded={false}
      />
    );
    expect(getByText('Test Task')).toBeTruthy();
    expect(queryByText('View Details')).toBeNull();
  });

  it('renders Toast', () => {
    const { getByText } = wrap(<Toast message="Saved" />);
    expect(getByText('Saved')).toBeTruthy();
  });
});
