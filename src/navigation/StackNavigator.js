import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../pages/Main';
import CameraScreen from '../pages/CameraScreen';
import Information from '../pages/Information';
import Calibration from '../pages/Calibration';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="Information" component={Information} />
      <Stack.Screen name="Calibration" component={Calibration} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
