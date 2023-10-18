import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CommentItem from '../components/CommentItem';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import SvgSendIcon from '../assets/svg/SvgSendIcon';
import moment from 'moment';
import { useSelector } from 'react-redux';

export const CommentsScreen = ({ route }) => {
  const { image } = route.params;
  console.log('image2 :>> ', image);

  const { avatar } = useSelector(state => state.auth);
  console.log('avatar1 :>> ', avatar);

  const [comments, setComments] = useState([
    {
      authorAvatar: null,
      comment:
        'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
      commentDate: '09 червня, 2020 | 08:40',
      owner: false,
    },
    {
      authorAvatar: avatar,
      comment:
        'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
      commentDate: '09 червня, 2020 | 09:14',
      owner: true,
    },
    {
      authorAvatar: null,
      comment: 'Thank you! That was very helpful!',
      commentDate: '09 червня, 2020 | 09:20',
      owner: false,
    },
  ]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    const newComment = {
      authorAvatar: avatar,
      comment: commentText,
      commentDate: moment().format('DD MMMM, YYYY | HH:mm'),
      owner: true,
    };
    if (!commentText) {
      return;
    }
    setComments(prev => [...prev, newComment]);
    setCommentText('');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
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
