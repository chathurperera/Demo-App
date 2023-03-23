import { View, TextInput, Text, StyleSheet } from 'react-native';
import React from 'react';
import { InputGroupProps } from './InputGroup.types';

const InputGroup = ({ label, ...textInputConfig }: InputGroupProps) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} style={styles.input} />
      {/* <Text style={styles.validationError}>{label}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  validationError: {
    color: 'red',
  },
});

export default InputGroup;
