import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const InputData = ({
  label,
  placeholder,
  keywordType,
  onChangeText,
  namaState,
  value,
}) => {
  return (
    <>
      <Text style={sytles.label}>{label}</Text>
      <TextInput
        keyboardType={keywordType}
        style={sytles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(namaState, text)}
      />
    </>
  );
};

export default InputData;

const sytles = StyleSheet.create({
  label: {
    fontSize: 30,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
