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

export const LoginScreen = () => {
  const [isSecure, setIsSecure] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onRegistration = data => {
    Keyboard.dismiss();

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
      toValue: shift ? 200 : 144,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [shift]);

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
                <Text style={styles.title}>Увійти</Text>

                <View style={{ width: '100%' }}>
                  <Controller
                    control={control}
                    rules={{
                      required: "Це обов'язкове поле",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Введіть коректну адресу електронної пошти',
                      },
                    }}
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
                    Увійти
                  </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Немає акаунту? </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        ...styles.text,
                        textDecorationLine: 'underline',
                      }}
                    >
                      Зареєструватися
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
  scrollViewContainer: {
    minHeight: screenSize.height,
    justifyContent: 'flex-end',
  },
  formWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 144,
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
  showPassword: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    position: 'absolute',
    right: 16,
    bottom: 15,
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
