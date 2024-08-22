import React from 'react';
import RoutesScreen from '../src/features/routes/RoutesScreen';
import { render, fireEvent } from '@testing-library/react-native';

describe(RoutesScreen, function () {
  it('should render a map', function () {
    const { getByTestId } = render(<RoutesScreen />);
    const map = getByTestId('map');
    expect(map).toBeTruthy();
  });
});
