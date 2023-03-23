import { View, Text, ActivityIndicator, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import InputGroup from '../../components/InputGroup';
import { SignupScreenProps, InputValuesType } from './SignupScreen.types';

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [error, setError] = useState<string>('');
  const [inputValues, setInputValues] = useState<InputValuesType>(
    {
      name: '',
      email: '',
      password: '',
    },
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setError('');
    setInputValues(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const onSubmit = () => {};
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputContainer}>
          {error && <Text style={styles.validationError}>{error}</Text>}
          <View>
            <InputGroup
              label="Name"
              placeholder="Enter your name"
              onChangeText={value => handleInputChange('name', value)}
              keyboardType="default"
              value={inputValues.name}
              autoCapitalize="none"
            />
            <InputGroup
              label="Email"
              placeholder="Enter your email"
              onChangeText={value => handleInputChange('password', value)}
              value={inputValues.password}
              autoCorrect={false}
              secureTextEntry={true}
            />
            <InputGroup
              label="Password"
              placeholder="Enter your password"
              onChangeText={value => handleInputChange('password', value)}
              value={inputValues.password}
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
        </View>
        <Pressable style={styles.loginButton} onPress={onSubmit}>
          <Text style={styles.loginButtonText}>
            {isLoading ? (
              <ActivityIndicator animating={isLoading} size="small" color="#fdfdfd" />
            ) : (
              'Signup'
            )}
          </Text>
        </Pressable>

        <Text style={styles.newAccount}>
          Already have an account?
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 35,
    color: '#000',
  },
  input: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputContainer: {
    paddingTop: 50,
  },
  loginButton: {
    borderRadius: 5,
    padding: 10,
    maxWidth: 500,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#010203',
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  validationError: {
    color: 'red',
    marginBottom: 25,
    textAlign: 'center',
  },
  newAccount: {
    marginTop: 20,
    color: '#181818',
  },
  signupLink: {
    color: '#2b1bbd',
    paddingLeft:5
  },
});
export default SignupScreen;
