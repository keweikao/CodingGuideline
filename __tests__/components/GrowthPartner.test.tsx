// __tests__/components/GrowthPartner.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GrowthPartner } from '@/components/app/GrowthPartner';

describe('GrowthPartner', () => {
  it('should render the IDLE state when no tasks are completed', () => {
    render(<GrowthPartner totalTasks={3} completedTasks={0} currentDay={1} />);
    expect(screen.getByAltText('Idle Growth Partner')).toBeInTheDocument();
    expect(screen.getByText('Day 1')).toBeInTheDocument();
  });

  it('should render the ACTIVE state when some tasks are completed', () => {
    render(<GrowthPartner totalTasks={3} completedTasks={1} currentDay={5} />);
    expect(screen.getByAltText('Active Growth Partner')).toBeInTheDocument();
    expect(screen.getByText('Day 5')).toBeInTheDocument();
  });

  it('should render the ACTIVE state even when all tasks are completed', () => {
    render(<GrowthPartner totalTasks={3} completedTasks={3} currentDay={10} />);
    expect(screen.getByAltText('Active Growth Partner')).toBeInTheDocument();
    expect(screen.getByText('Day 10')).toBeInTheDocument();
  });

  it('should update its state when props change', () => {
    const { rerender } = render(<GrowthPartner totalTasks={3} completedTasks={0} currentDay={1} />);
    expect(screen.getByAltText('Idle Growth Partner')).toBeInTheDocument();

    // Change props to active
    rerender(<GrowthPartner totalTasks={3} completedTasks={2} currentDay={1} />);
    expect(screen.getByAltText('Active Growth Partner')).toBeInTheDocument();
  });
});
