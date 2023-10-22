import { View, Image, Text } from 'react-native';
import SvgCommentsIcon from '../assets/svg/SvgCommentsIcon';
import { TouchableOpacity } from 'react-native';
import SvgMapPin from '../assets/svg/SvgMapPin';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import SvgCommentsIconActive from '../assets/svg/SvgCommentsIconActive';

const PostItem = ({
  postName,
  postImage,
  location,
  coordinates,
  userPostId,
  postId,
  commentsQuantity = 0,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.postWrapper}>
      <Image source={{ uri: postImage }} style={styles.postImage} />
      <Text style={styles.postName}>{postName}</Text>
      <View style={styles.postData}>
        <View style={styles.directionRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostStack', {
                screen: 'Comments',
                params: { postImage, userPostId, postId, commentsQuantity },
              })
            }
          >
            {commentsQuantity ? <SvgCommentsIconActive /> : <SvgCommentsIcon />}
          </TouchableOpacity>
          <Text style={styles.commentsText}>{commentsQuantity}</Text>
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
