import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const RegistrationScreen = () => {
  const [isSecure, setIsSecure] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      email: '',
      password: '',
    },
  });

  const onRegistration = data => {
    Keyboard.dismiss();

    console.log(data);

    reset();
  };

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/images/photo-bg.jpg')}
        >
          <View style={styles.registrationForm}>
            <View style={styles.addPhoto}>
              <TouchableOpacity style={{ position: 'relative' }}>
                <Image
                  style={styles.addBtn}
                  source={require('../assets/images/add-btn.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={{ width: '100%' }}>
              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              >
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
                  rules={{
                    required: "Це обов'язкове поле",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                        message: 'Пароль повинен містити щонайменше 8 символів',
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
              </KeyboardAvoidingView>
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
                <Text style={styles.text}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },

  registrationForm: {
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
  addBtn: {
    position: 'absolute',
    top: 81,
    left: 107,
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
