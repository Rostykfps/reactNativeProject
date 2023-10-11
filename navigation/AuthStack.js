import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../Screens/RegistrationScreen';
import { LoginScreen } from '../Screens/LoginScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Registration"
      //   initialRouteName="Login"
      screenOptions={{
        cardStyle: { backgroundColor: '#FFF' },
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
