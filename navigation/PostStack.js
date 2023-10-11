import { createStackNavigator } from '@react-navigation/stack';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { MapScreen } from '../Screens/MapScreen';
import { TouchableOpacity } from 'react-native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import { useNavigation } from '@react-navigation/core';

const Stack = createStackNavigator();

export default function PostStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#FFF' },
        // headerShown: false,
      }}
    >
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
          title: 'Коментарі',
          backgroundColor: '#fff',
          headerStyle: {
            backgroundColor: '#fff',
            // height: 88,
            // paddingTop: 44,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            borderBottomColor: '#000',

            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <SvgArrowLeft onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          title: 'Місцевість',
          backgroundColor: '#fff',
          headerStyle: {
            backgroundColor: '#fff',
            // height: 88,
            // paddingTop: 44,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            borderBottomColor: '#000',

            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <SvgArrowLeft onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
