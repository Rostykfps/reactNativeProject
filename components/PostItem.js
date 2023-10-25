import { View, Image, Text } from 'react-native';
import SvgCommentsIcon from '../assets/svg/SvgCommentsIcon';
import { TouchableOpacity } from 'react-native';
import SvgMapPin from '../assets/svg/SvgMapPin';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import SvgCommentsIconActive from '../assets/svg/SvgCommentsIconActive';
import SvgLike from '../assets/svg/SvgLike';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';

const PostItem = ({
  postName,
  postImage,
  location,
  coordinates,
  userPostId,
  postId,
  commentsQuantity = 0,
  likesQuantity = 0,
  profileScreen = false,
  userId,
}) => {
  const [likes, setLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);

  const navigation = useNavigation();

  const getAllLikes = async () => {
    try {
      const ref = query(collection(db, 'posts', postId, 'likes'));
      onSnapshot(ref, snapshot => {
        const AllLikes = snapshot.docs.map(doc => ({
          ...doc.data(),
          likeId: doc.id,
        }));

        setLikes(AllLikes);
        const likeStatus = AllLikes.find(status => status[userId]);
        setLikeStatus(likeStatus);
      });
    } catch (error) {
      console.log('error-message', error.message);
    }
  };

  useEffect(() => {
    getAllLikes();
  }, []);

  const addLike = async postId => {
    try {
      const likeStatus = likes.find(status => status[userId]);
      setLikeStatus(likeStatus);

      const postDocRef = await doc(db, 'posts', postId);
      if (likeStatus) {
        const likeDocRef = doc(db, 'posts', postId, 'likes', likeStatus.likeId);

        await deleteDoc(likeDocRef);

        await updateDoc(postDocRef, {
          likesQuantity: likesQuantity - 1,
        });
        setLikeStatus(false);
        return;
      }

      await addDoc(collection(postDocRef, 'likes'), { [userId]: true });
      await updateDoc(postDocRef, { likesQuantity: likesQuantity + 1 });
      setLikeStatus(true);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <Text
            style={
              commentsQuantity ? styles.activeCommentsText : styles.commentsText
            }
          >
            {commentsQuantity}
          </Text>
          {profileScreen && (
            <>
              <TouchableOpacity
                style={{ marginLeft: 24 }}
                onPress={() => {
                  addLike(postId);
                }}
              >
                <SvgLike color={likeStatus ? '#FF6C00' : '#BDBDBD'} />
              </TouchableOpacity>
              <Text
                style={
                  likesQuantity
                    ? styles.activeCommentsText
                    : styles.commentsText
                }
              >
                {likesQuantity}
              </Text>
            </>
          )}
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

  activeCommentsText: {
    color: '#212121',
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
