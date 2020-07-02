/**
 * @format
 */

import '../src/screens/explore/node_modules/react-native';
import React from '../src/node_modules/react';
import App from '../src';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
