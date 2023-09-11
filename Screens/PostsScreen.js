import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import SvgCameraIcon from '../assets/svg/SvgCameraIcon';
import SvgMapPin from '../assets/svg/SvgMapPin';
import SvgTrash from '../assets/svg/SvgTrash';

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.arrowWrapper}>
            <SvgArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>Створити публікацію</Text>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <View style={styles.photoWrapper}>
          <TouchableOpacity style={styles.iconWrapper}>
            <SvgCameraIcon />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Завантажте фото</Text>
        <TextInput
          style={styles.inputName}
          placeholderTextColor="#BDBDBD"
          placeholder="Назва..."
        />
        <View style={{ marginTop: 16, paddingTop: 10 }}>
          <View style={{}}>
            <SvgMapPin style={styles.locationIcon} />
          </View>
          <TextInput
            style={styles.inputLocation}
            placeholderTextColor="#BDBDBD"
            placeholder="Місцевість..."
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.submitBtn}>Опубліковати</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.trashBtn}>
            <SvgTrash />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  header: {
    height: 88,
    paddingTop: 44,
    elevation: 1,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 0,
    // borderBottomColor: '#000',

    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    // borderBottomWidth: 0.5,
    borderRadius: 0,
  },

  headerWrapper: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },

  arrowWrapper: {
    position: 'absolute',
    left: 16,
    bottom: 10,
  },
  titleWrapper: {
    width: '100%',
    height: 44,
    textAlign: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },

  photoWrapper: {
    height: 240,
    marginTop: 32,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  inputName: {
    height: 50,
    marginTop: 32,
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  inputLocation: {
    height: 50,
    paddingLeft: 28,
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locationIcon: {
    position: 'absolute',
    top: 13,
  },
  submitBtn: {
    textAlign: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 16,
    color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },

  trashBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: 70,
    paddingHorizontal: 23,
    paddingVertical: 8,
    marginTop: 32,
    marginBottom: 16,
    color: '#BDBDBD',
  },
});
