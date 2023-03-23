import { RootStackParamsList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SignupScreenProps = NativeStackScreenProps<RootStackParamsList, 'Signup'>;
export type InputValuesType = { name: string; email: string; password: string };
