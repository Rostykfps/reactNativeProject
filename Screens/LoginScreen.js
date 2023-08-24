import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/images/photo_bg.jpg')}
      >
        <View style={styles.registrationForm}>
          {/* <View style={styles.addPhoto}>
            <TouchableOpacity style={{ position: 'relative' }}>
              <Image
                style={styles.addBtn}
                source={require('../assets/images/add_btn.png')}
              />
            </TouchableOpacity>
          </View> */}
          <Text style={styles.title}>Увійти</Text>

          <View style={{ width: '100%' }}>
            <TextInput
              style={{ ...styles.input, marginBottom: 16 }}
              placeholderTextColor="#BDBDBD"
              placeholder="Адреса електронної пошти"
            />
            <View>
              <TextInput
                style={styles.input}
                placeholderTextColor="#BDBDBD"
                placeholder="Пароль"
              />
              <TouchableOpacity>
                <Text style={styles.showPassword}>Показати</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={{ width: '100%' }}>
            <Text style={styles.registerBtn}>Увійти</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Немає акаунту? </Text>
            <TouchableOpacity>
              <Text style={{ ...styles.text, textDecorationLine: 'underline' }}>
                Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    right: 10,
    bottom: 10,
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
