import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import styles from './Main.styles';

const Main = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="black" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.sectionTitle}>Main page</Text>
          <Button
            onPress={() => navigation.navigate('CameraScreen', {})}
            title="Run Camera"
          />
          <Button
            onPress={() => navigation.navigate('Information', {})}
            title="More Info"
          />
          <Button
            onPress={() => navigation.navigate('Calibration', {})}
            title="Calibrate"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
