import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser, stateChangeUser } from '../redux/auth/authOperation';
import Home from './Home';
import AuthStack from './AuthStack';

export default function Main() {
  const dispatch = useDispatch();

  const { stateChange } = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(signOutUser());
    dispatch(stateChangeUser());
  }, []);
  return (
    <NavigationContainer>
      {stateChange ? <Home /> : <AuthStack />}
      {/* <Home /> */}
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
}
