import { View, Image, Text } from 'react-native';
import SvgCommentsIcon from '../assets/svg/SvgCommentsIcon';
import { TouchableOpacity } from 'react-native';
import SvgMapPin from '../assets/svg/SvgMapPin';
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ name, image, location, coordinates }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 34 }}>
      <Image source={{ uri: image }} style={{ width: '100%', height: 240 }} />
      {console.log('image', image)}
      <Text
        style={{
          marginTop: 8,
          marginBottom: 8,
          fontSize: 17,
          fontFamily: 'Roboto-Medium',
        }}
      >
        {name}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
            <SvgCommentsIcon />
          </TouchableOpacity>
          <Text
            style={{
              color: '#BDBDBD',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginLeft: 6,
            }}
          >
            0
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => navigation.navigate('Map', { coordinates })}
          >
            <SvgMapPin />
          </TouchableOpacity>
          <Text
            style={{
              color: '#212121',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginLeft: 4,
              textDecorationLine: 'underline',
            }}
          >
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostItem;
