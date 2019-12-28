import 'react-native-gesture-handler';
import { rootNavigator } from './router';
import { createAppContainer } from 'react-navigation';


console.disableYellowBox = true;
export default createAppContainer(rootNavigator);
