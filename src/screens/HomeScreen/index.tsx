import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '../../stores';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';


type HomeScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.userStore);
  const dispatch = useDispatch<Dispatch>();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log('logout')
    dispatch.userStore.logout();
  }

  console.log('user from Redux', user);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Hi,{user.userName}</Text>
      <Text style={styles.greeting}>Welcome back</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  greeting: {
    fontSize: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    maxWidth: 200,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#010203',
  },
  buttonText: {
    color: '#fff',
    textAlign:'center'
  },
});

export default HomeScreen;
