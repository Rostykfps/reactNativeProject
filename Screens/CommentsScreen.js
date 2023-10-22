import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CommentItem from '../components/CommentItem';
import { FlatList } from 'react-native';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import SvgSendIcon from '../assets/svg/SvgSendIcon';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { db } from '../firebase/config';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';

export const CommentsScreen = ({ route }) => {
  const { postImage, userPostId, postId, commentsQuantity = 0 } = route.params;

  const { avatar, userId } = useSelector(state => state.auth);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const getAllComments = async () => {
    try {
      const commentsRef = await doc(db, 'posts', postId);

      onSnapshot(collection(commentsRef, 'comments'), snapshot => {
        setComments(
          snapshot.docs
            .map(doc => ({ ...doc.data() }))
            .sort((firstDate, secondDate) =>
              firstDate.commentDate.localeCompare(secondDate.commentDate),
            ),
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const uploadCommentToBd = async data => {
    try {
      const postDocRef = await doc(db, 'posts', postId);
      await addDoc(collection(postDocRef, 'comments'), data);
      await updateDoc(postDocRef, { commentsQuantity: commentsQuantity + 1 });
    } catch (error) {
      console.log(error.message);
    }
  };

  const flatListRef = useRef(null);

  const handleAddComment = () => {
    const newComment = {
      authorAvatar: avatar,
      comment: commentText,
      commentDate: moment().format('DD MMMM, YYYY | HH:mm'),
      owner: userPostId === userId,
    };
    if (!commentText) {
      return;
    }

    // setComments(prev => [...prev, newComment]);
    uploadCommentToBd(newComment);
    setCommentText('');

    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: postImage }}
        style={{
          marginTop: 32,
          marginBottom: 32,
          width: '100%',
          height: 240,
          backgroundColor: '#F6F6F6',
        }}
      />
      <FlatList
        data={comments}
        ref={flatListRef}
        renderItem={({ item }) => (
          <CommentItem
            avatar={item.authorAvatar}
            comment={item.comment}
            date={item.commentDate}
            owner={item.owner}
          />
        )}
        // keyExtractor={item => item.id}
        keyExtractor={(item, idx) => idx.toString()}
      />

      <View style={styles.commentInputWrapper}>
        <TextInput
          style={styles.commentInput}
          placeholderTextColor="#BDBDBD"
          placeholder="Коментувати..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity
          style={styles.commentSendBtn}
          onPress={handleAddComment}
        >
          <SvgSendIcon style={styles.svgArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFF',
  },
  commentInputWrapper: {
    marginTop: 16,
    marginBottom: 16,
  },
  commentInput: {
    // position: 'relative',
    width: '100%',
    height: 50,
    padding: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },
  commentSendBtn: {
    position: 'absolute',
    width: 34,
    height: 34,
    right: 8,
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  svgArrow: {
    height: 15,
    width: 15,
    transform: [{ rotate: '90deg' }],
  },
});
