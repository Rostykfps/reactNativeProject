import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser, stateChangeUser } from '../redux/auth/authOperation';
import Home from './Home';
import AuthStack from './AuthStack';

export default function Main() {
  const dispatch = useDispatch();

  const { stateChange } = useSelector(state => state.auth);
  const test = useSelector(state => state.auth);
  console.log('stateChange1 :>> ', test);
  // const stateChange = useSelector(state => state.auth.stateChange);

  useEffect(() => {
    // dispatch(signOutUser());
    console.log('stateChange :>> ', stateChange);
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
