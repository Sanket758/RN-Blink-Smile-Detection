import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
