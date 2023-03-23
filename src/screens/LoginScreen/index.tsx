import { View, Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputGroup from '../../components/InputGroup';
import { RootState, Dispatch } from '../../stores';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreenProps } from './LoginScreen.types';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useDispatch<Dispatch>();
  const { isLoading, errorMessage } = useSelector((state: RootState) => state.userStore);

  const [error, setError] = useState<string>('');
  const [inputValues, setInputValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setError('');
    setInputValues(prevState => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const onSubmit = async () => {
    if (
      !inputValues.email ||
      !inputValues.email.trim() ||
      !inputValues.password ||
      !inputValues.password.trim()
    ) {
      return setError('Please fill all required fields');
    } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
      return setError('Please enter a valid email');
    } else {
      setError('');
    }

    try {
      await dispatch.userStore.login(inputValues);
      setInputValues({ email: '', password: '' });
      navigation.navigate('Home');
    } catch (error: any) {
      setError(errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          {error && <Text style={styles.validationError}>{error}</Text>}
          <View>
            <InputGroup
              label="Email"
              placeholder="Enter your email"
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              value={inputValues.email}
              autoCapitalize="none"
              caretHidden={false}
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
              'Login'
            )}
          </Text>
        </Pressable>

        <Text style={styles.newAccount}>
          New Here?
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
            Create new account
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
  },
});
export default LoginScreen;
