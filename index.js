/**
 * @format
 */

import {AppRegistry} from 'react-native';
import StackNavigator from './app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => StackNavigator);
