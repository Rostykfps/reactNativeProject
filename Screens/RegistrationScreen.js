import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { signUpUser } from '../redux/auth/authOperation';
import { auth, storage } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { authStateChange } from '../redux/auth/authSlice';
import { uploadAvatarToDb } from '../utils/uploadAvatarToDb';

export const RegistrationScreen = () => {
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isSecure, setIsSecure] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: 'Test',
      email: 'test@test.te',
      password: 'Test1234!',
    },
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRegistration = async data => {
    const { login, email, password } = data;
    Keyboard.dismiss();

    try {
      const avatarUrl = avatar ? await uploadAvatarToDb(avatar) : '';
      const newUser = {
        login,
        email,
        password,
        avatar: avatarUrl,
      };
      // dispatch(signUpUser({ login, email, password, avatar }));
      dispatch(signUpUser(newUser));
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      return error.message;
    }

    // navigation.navigate('Posts');

    reset();
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  const [shift, setShift] = useState(false);
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    const listenerShow = Keyboard.addListener('keyboardDidShow', () => {
      setShift(true);
    });
    const listenerHide = Keyboard.addListener('keyboardDidHide', () => {
      setShift(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(position, {
      toValue: shift ? 190 : 78,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

  const pickAvatar = async () => {
    if (avatar) {
      setAvatar(null);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // const uploadAvatarToDb = async avatar => {
  //   if (avatar) {
  //     // const avatarId = Date.now().toString();

  //     try {
  //       const file = await uriToBlob(avatar);

  //       const fileName = avatar.split('/').pop();

  //       const storageRef = ref(storage, `avatars/${fileName}`);

  //       await uploadBytes(storageRef, file);

  //       const downloadURL = await getDownloadURL(storageRef);

  //       return downloadURL;
  //     } catch (error) {
  //       console.warn('uploadImageToServer: ', error);
  //     }
  //   }
  // };

  // function uriToBlob(avatar) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();

  //     // If successful -> return with blob
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };

  //     // reject on error
  //     xhr.onerror = function () {
  //       reject(new Error('uriToBlob failed'));
  //     };

  //     // Set the response type to 'blob' - this means the server's response
  //     // will be accessed as a binary object
  //     xhr.responseType = 'blob';

  //     // Initialize the request. The third argument set to 'true' denotes
  //     // that the request is asynchronous
  //     xhr.open('GET', avatar, true);

  //     // Send the request. The 'null' argument means that no body content is given for the request
  //     xhr.send(null);
  //   });
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <StatusBar style="auto" />
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/images/photo-bg.jpg')}
          >
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              bounces={false}
            >
              <Animated.View
                style={[styles.formWrapper, { paddingBottom: position }]}
              >
                <View style={styles.addPhoto}>
                  <Image style={styles.avatar} source={{ uri: avatar }} />
                  <TouchableOpacity
                    style={styles.avatarBtnWrapper}
                    onPress={pickAvatar}
                  >
                    {avatar ? (
                      <Image
                        style={styles.delBtn}
                        source={require('../assets/images/del-btn.png')}
                      />
                    ) : (
                      <Image
                        style={styles.addBtn}
                        source={require('../assets/images/add-btn.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Реєстрація</Text>

                <View style={{ width: '100%' }}>
                  <Controller
                    control={control}
                    rules={{
                      required: "Це обов'язкове поле",
                      pattern: {
                        value:
                          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                        message: 'Поле повинно містити лише літери',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{ ...styles.input, marginBottom: 16 }}
                        placeholderTextColor="#BDBDBD"
                        placeholder="Логін"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="login"
                  />

                  {errors.login && (
                    <Text style={{}}>{errors.login?.message}</Text>
                  )}

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{ ...styles.input, marginBottom: 16 }}
                        keyboardType="email-address"
                        placeholderTextColor="#BDBDBD"
                        placeholder="Адреса електронної пошти"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                    name="email"
                  />

                  {errors.email && (
                    <Text style={{}}>{errors.email?.message}</Text>
                  )}

                  <View>
                    <Controller
                      control={control}
                      rules={{
                        required: "Це обов'язкове поле",
                        minLength: {
                          value: 8,
                          message:
                            'Пароль повинен містити щонайменше 8 символів',
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                          message:
                            'Пароль повинен містити хоча б одну велику літеру, одну маленьку літеру, одну цифру і один спеціальний символ',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <TextInput
                            style={{ ...styles.input }}
                            secureTextEntry={isSecure}
                            placeholderTextColor="#BDBDBD"
                            placeholder="Пароль"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                          <TouchableOpacity>
                            <Text
                              style={styles.showPassword}
                              onPress={toggleSecureTextEntry}
                            >
                              {isSecure ? 'Показати' : 'Приховати'}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                      name="password"
                    />

                    {errors.password && (
                      <Text style={{}}>{errors.password?.message}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={{ width: '100%' }}>
                  <Text
                    style={styles.registerBtn}
                    onPress={handleSubmit(onRegistration)}
                  >
                    Зареєстуватися
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Вже є акаунт? </Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.text}
                      onPress={() => navigation.navigate('Login')}
                    >
                      Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </ScrollView>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const screenSize = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    top: 0,
    position: 'absolute',
    height: screenSize.height,
    width: screenSize.width,
    resizeMode: 'cover',
  },
  formWrapper: {
    marginTop: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 78,
  },
  addPhoto: {
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    top: -60,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    // top: -60,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
  },
  avatarBtnWrapper: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 81,
    left: 107,
    borderRadius: 100,
  },
  addBtn: {
    position: 'absolute',
    // top: 81,
    // left: 107,
  },
  delBtn: {
    position: 'absolute',
    left: -6,
    top: -6,
  },

  title: {
    marginBottom: 33,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
  },
  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    width: '100%',
  },
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: 'flex-end',
  },
  showPassword: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    position: 'absolute',
    right: 16,
    bottom: 14,
  },
  registerBtn: {
    textAlign: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 43,
    marginBottom: 16,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  text: {
    color: '#1B4371',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});
