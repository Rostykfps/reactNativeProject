import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
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
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'Roboto-Medium',
            }}
          >
            Створити публікацію
          </Text>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <View>
          <View>
            <SvgCameraIcon />
          </View>
        </View>
        <Text>Завантажте фото</Text>
        <View>
          <TextInput placeholder="Назва..." />
          <View>
            <SvgMapPin />
            <TextInput placeholder="Місцевість..." />
          </View>
        </View>
        <TouchableOpacity>
          <Text>Опубліковати</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgTrash />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          borderBottomColor: 'black',
          borderWidth: 1,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    height: 88,
    paddingTop: 44,
    // borderWidth: 1,
    // borderColor: '#000',
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    // position: 'relative',
    // elevation: 1,
    borderWidth: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0.5 },
    // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    // borderBottomColor: 'black',
    // shadowOpacity: 0.3,
    // shadowRadius: 0,
    borderBottomColor: 'black',
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
  title: {},
});
