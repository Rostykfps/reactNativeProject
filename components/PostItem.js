import { View, Image, Text } from 'react-native';
import SvgCommentsIcon from '../assets/svg/SvgCommentsIcon';
import { TouchableOpacity } from 'react-native';
import SvgMapPin from '../assets/svg/SvgMapPin';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const PostItem = ({ name, image, location, coordinates }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.postWrapper}>
      <Image source={{ uri: image }} style={styles.postImage} />
      <Text style={styles.postName}>{name}</Text>
      <View style={styles.postData}>
        <View style={styles.directionRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostStack', {
                screen: 'Comments',
                params: { image },
              })
            }
          >
            <SvgCommentsIcon />
          </TouchableOpacity>
          <Text style={styles.commentsText}>0</Text>
        </View>
        <View style={styles.directionRow}>
          <TouchableOpacity
            style={styles.directionRow}
            onPress={() =>
              navigation.navigate('PostStack', {
                screen: 'Map',
                params: { coordinates },
              })
            }
          >
            <SvgMapPin />
          </TouchableOpacity>
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postWrapper: {
    marginBottom: 34,
  },
  postImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
  },
  postName: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },
  postData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directionRow: {
    flexDirection: 'row',
  },
  commentsText: {
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginLeft: 6,
  },
  locationText: {
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});
