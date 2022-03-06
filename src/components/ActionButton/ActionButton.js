import React from 'react';
import { Button, Text } from "react-native";
import styles from './ActionButton.styles';


const ActionButton = ({title, onClick, color, disabled}) => {
  return (
    <Button
      title={title}
      onPress={onClick}
      color={color}
      disabled={disabled}
      style={styles.buttonStyle}
      mode="text"
    >
      <Text style={styles.buttonText}></Text>
    </Button>
  );
};

export default ActionButton;
