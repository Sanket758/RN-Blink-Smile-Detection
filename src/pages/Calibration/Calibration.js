import React from 'react';
import {WebView} from 'react-native-webview';
const Calibration = () => {
  return (
    <WebView
      source={{uri: 'https://www.google.com/'}}
      style={{marginTop: 20}}
    />
  );
};

export default Calibration;
