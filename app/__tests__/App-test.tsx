/**
 * @format
 */

import 'react-native';
import 'jest-styled-components';

import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import StackNavigator from '../src/App';


beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

jest.mock('react-navigation', () => ({
  NavigationEvents: 'mockNavigationEvents',
}));

it('renders correctly', () => {
  renderer.create(<StackNavigator />).toJSON();
});
