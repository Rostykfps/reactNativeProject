import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SvgLogOut from '../assets/svg/SvgLogOut';

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.arrowWrapper}>
            <SvgLogOut />
          </TouchableOpacity>
          <Text style={styles.title}>Публікації</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 16,
    // paddingRight: 16,
    backgroundColor: '#FFF',
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
    right: 16,
    bottom: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },
});
