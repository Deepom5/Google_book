import React,{useState, useEffect} from 'react';
import { View, TouchableOpacity , StyleSheet } from 'react-native';
import ProgressiveImage from 'react-native-image-progress';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Body, Rate, BookCard } from './styled';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BookCardComponent = props => {
  useEffect(() => {
    getData();
  },[])
  
  const { thumbnail, title, authors, averageRating, onPress } = props;

  const rating = averageRating ? <Rate rating={averageRating} /> : null;
  const [fav, setFav] = useState(false);
  const [favItem, setFavItem] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //console.log("the data console",props);
  const getData = async () => {
    try {
      
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("async storage read",jsonValue)
      setFavItem(jsonValue);
    } catch(e) {
      // error reading value
    }
  }
  const removeFavorite = id => {
    let index = fav.indexOf(id);
    console.log(index);
    let temp = [...fav.slice(0, index), ...fav.slice(index + 1)];
    storeData(temp);

  };
  const storeData = async (value) => {
    try {
      const jsonValue1 = await AsyncStorage.getItem('@storage_Key')
      let item =jsonValue1;
      item=[...jsonValue1, value]
      setFavorites(favItem => [...favItem, value])
      
      console.log("async storage write 4",value)
      //const jsonValue = JSON.stringify()
      await AsyncStorage.setItem('@storage_Key', item)
      console.log("async storage write",item)
    } catch (e) {
      // saving error
    }
  }
  const onClickFav = () => {
    
    setFav(!fav);
    if(!fav)
    { console.log("the data console 617",props);
      storeData(props)}
    
  }
  return (
    <BookCard>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          padding: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            height: responsiveHeight(16),
            width: responsiveWidth(16),
            marginRight: 10,
          }}
        >
          <ProgressiveImage
            source={{ uri: thumbnail }}
            style={{
              borderRadius: 4,
              resizeMode: 'contain',
              height: '100%',
              width: '100%',
            }}
            imageStyle={{ borderRadius: 1 }}
            blurRadius={0}
            indicatorProps={{
              size: 28,
            }}
          />
        </View>

        <View
          style={{
            flex: 3,
            padding: 5,
          }}
        >
          <Body medium bold>
            {title}
          </Body>
          <Body numberOfLines={1} ellipsizeMode="tail">
            by {authors}
          </Body>
          {rating}
        </View>
        <View>
          <TouchableOpacity onPress={onClickFav}>
          <Body large style={fav?styles.heartStyle:styles.heartStyleNo}>
      {' '}
      ♥︎{' '}
    </Body>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </BookCard>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heartStyle: { color: '#e31b23' },
   heartStyleNo: { color: 'grey' },
});

export default BookCardComponent;
