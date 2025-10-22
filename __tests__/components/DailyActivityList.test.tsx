// __tests__/components/DailyActivityList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DailyActivityList, Activity } from '@/components/app/DailyActivityList';

const mockActivities: Activity[] = [
  { id: '1', description: 'Read a book', isCompleted: false, isCustom: false },
  { id: '2', description: 'Go for a walk', isCompleted: true, isCustom: false },
  { id: '3', description: 'Write a journal entry', isCompleted: false, isCustom: false },
];

describe('DailyActivityList', () => {
  it('should render a list of activities', () => {
    render(<DailyActivityList activities={mockActivities} onToggleComplete={jest.fn()} onUpdateDescription={jest.fn()} />);
    
    expect(screen.getByText('Read a book')).toBeInTheDocument();
    expect(screen.getByText('Go for a walk')).toBeInTheDocument();
    expect(screen.getByText('Write a journal entry')).toBeInTheDocument();
  });

  it('should show completed activities with a line-through', () => {
    render(<DailyActivityList activities={mockActivities} onToggleComplete={jest.fn()} onUpdateDescription={jest.fn()} />);
    
    const completedActivity = screen.getByText('Go for a walk');
    expect(completedActivity).toHaveClass('line-through');
  });

  it('should call onToggleComplete when a checkbox is clicked', async () => {
    const onToggleComplete = jest.fn();
    render(<DailyActivityList activities={mockActivities} onToggleComplete={onToggleComplete} onUpdateDescription={jest.fn()} />);
    
    const checkbox = screen.getByLabelText('Read a book');
    await userEvent.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledWith('1', true);
  });

  it('should enter edit mode on double-click', async () => {
    render(<DailyActivityList activities={mockActivities} onToggleComplete={jest.fn()} onUpdateDescription={jest.fn()} />);
    
    const activityLabel = screen.getByText('Read a book');
    await userEvent.dblClick(activityLabel);

    const input = screen.getByDisplayValue('Read a book');
    expect(input).toBeInTheDocument();
  });

  it('should call onUpdateDescription when saving an edit', async () => {
    const onUpdateDescription = jest.fn();
    render(<DailyActivityList activities={mockActivities} onToggleComplete={jest.fn()} onUpdateDescription={onUpdateDescription} />);
    
    const activityLabel = screen.getByText('Read a book');
    await userEvent.dblClick(activityLabel);

    const input = screen.getByDisplayValue('Read a book');
    await userEvent.clear(input);
    await userEvent.type(input, 'Read a great book');
    fireEvent.blur(input);

    expect(onUpdateDescription).toHaveBeenCalledWith('1', 'Read a great book');
  });

  it('should save an edit when Enter is pressed', async () => {
    const onUpdateDescription = jest.fn();
    render(<DailyActivityList activities={mockActivities} onToggleComplete={jest.fn()} onUpdateDescription={onUpdateDescription} />);
    
    const activityLabel = screen.getByText('Read a book');
    await userEvent.dblClick(activityLabel);

    const input = screen.getByDisplayValue('Read a book');
    await userEvent.type(input, '{enter}');

    expect(onUpdateDescription).toHaveBeenCalledWith('1', 'Read a book');
  });
});
