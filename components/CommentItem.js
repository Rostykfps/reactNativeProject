import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';

const CommentItem = ({ avatar, comment, date, owner }) => {
  return (
    <View
      style={[
        styles.itemWrapper,
        owner ? styles.notOwnerItemWrapper : styles.ownerItemWrapper,
      ]}
    >
      <Image source={{ avatar }} style={styles.avatar} />
      <View
        style={[
          styles.commentWrapper,
          owner ? styles.ownerCommentWrapper : styles.notOwnerCommentWrapper,
        ]}
      >
        <Text style={styles.commentText}>{comment}</Text>
        <Text style={styles.commentDate}>{date}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  itemWrapper: { marginBottom: 24 },
  ownerItemWrapper: {
    flexDirection: 'row',
  },
  notOwnerItemWrapper: {
    flexDirection: 'row-reverse',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },
  commentWrapper: {
    padding: 16,
    width: Dimensions.get('window').width - 76,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
  },
  ownerCommentWrapper: {
    borderTopRightRadius: 0,
    marginRight: 16,
  },
  notOwnerCommentWrapper: {
    borderTopLeftRadius: 0,
    marginLeft: 16,
  },
  commentText: {
    color: '#212121',
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    lineHeight: 18,
  },
  commentDate: {
    marginTop: 8,
    color: '#BDBDBD',
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
  },
});
