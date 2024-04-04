import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircleInput from './CircleInput'; 

jest.mock('../services/CalculateServices', () => ({
  calculateService: {
    calculateCircleArea: jest.fn().mockImplementation(radius => Math.PI * radius ** 2),
    calculateCircleCircumference: jest.fn().mockImplementation(radius => 2 * Math.PI * radius),
    calculateRingArea: jest.fn().mockImplementation((outerRadius, innerRadius) => Math.PI * (outerRadius ** 2 - innerRadius ** 2)),
    isPointInsideCircle: jest.fn().mockImplementation((radius, x, y) => x ** 2 + y ** 2 <= radius ** 2),
    isPointInsideRing: jest.fn().mockImplementation((outerRadius, innerRadius, x, y) => {
      const dist = x ** 2 + y ** 2;
      return dist <= outerRadius ** 2 && dist >= innerRadius ** 2;
    }),
  }
}));

describe('CircleInput Component', () => {
  test('calculates the area of a circle correctly', () => {
    render(<CircleInput />);
    const outerRadiusInput = screen.getByLabelText(/зовнішній радіус круга\/кільця/i);
    fireEvent.change(outerRadiusInput, { target: { value: '10' } });
    const calculateButton = screen.getByRole('button', { name: /розрахувати та перевірити/i });
    fireEvent.click(calculateButton);
    expect(screen.getByText(/площа круга:/i)).toHaveTextContent('314.16'); // Перевірка на основі приблизного значення π * r^2
  });
});

