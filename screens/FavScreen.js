import React from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wrapper, Flat, Search } from '../components/styled';
import AppConfig from '../config/appConfig';
import axios from 'axios';
import BookCardComponent from '../components/BookCard';
import BookCardPlaceholder from '../components/BookCardPlaceholder';
import LottieAnimationComponent from '../components/LottieAnimationComponent';

const { apiEndPoint } = AppConfig;

export default class FavScreen extends React.Component {
  state = {
    booksList: [...new Array(10).fill({})],
    isDataFetched: false,
    noResult: false,
    text: '',

  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
   // console.log("the data check")
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    console.log("async storage read favscreen",jsonValue)
   // return jsonValue != null ? JSON.parse(jsonValue) : null;
    
  
  //const booksList = {jsonValue};
    console.log("book list hg6",jsonValue)
  const { thumbnail, title, authors, averageRating, } = await jsonValue;
    // const allBooksList = (books => {
      // const {
       
      //     title,
      //     authors,
      //     publisher,
      //     publishedDate,
      //     description,
      //     imageLinks,
      //     averageRating,
        
      // } = book;
  //     const { thumbnail, title, authors, averageRating, } = jsonValue;
  //     console.log("the data check 456",thumbnail, title, authors, averageRating)
  //     return {
      
  //       thumbnail: thumbnail ? thumbnail : AppConfig.imageNotFound,
  //       title,
  //       authors: authors ? authors : '-',
        
       
       
  //       averageRating,
  //     };
  //  }
  //  );
  
  // console.log("the data check 456",thumbnail, title, authors, averageRating)
  //   const booksList = Object.values(
      // jsonValue.reduce(
      //   (acc, cur) => Object.assign(acc, { [cur.bookId]: cur }),
      //   {}
      // )
     // console.log("book list"),
    //   jsonValue
    // );
    // console.log("book list 2", booksList)
    this.setState({
      booksList,
      isDataFetched: true,
    });
  };

  _renderBookComponent = ({ item }) => {
    console.log("the render data 789",item)
    const {
      thumbnail,
      title,
      authors,
      publisher,
      bookId,
      averageRating,
    } = item;

    return (
      <BookCardComponent
        key={bookId}
        title={title}
        authors={authors}
        publisher={publisher}
        thumbnail={thumbnail}
        averageRating={averageRating}
        onPress={() =>
          this.props.navigation.navigate('BookDetail', {
            bookDetails: item,
          })
        }
      />
    );
  };

  renderPlaceholders = () =>
    this.state.booksList.map((e, i) => <BookCardPlaceholder key={i} />);

  renderX = filteredListData => (
    <React.Fragment>
      <Flat
        noMargin
        data={filteredListData}
        renderItem={this._renderBookComponent}
       // keyExtractor={item => item.bookId}
      />
    </React.Fragment>
  );

  renderNoResult = () => (
    <LottieAnimationComponent
      style={{
        height: responsiveHeight(40),
        width: responsiveHeight(40),
      }}
      animationSource={require('../assets/not-found.json')}
    />
  );

  render() {
    const { isDataFetched, noResult, text, booksList } = this.state;

    const filteredListData = isDataFetched
      ? [...booksList].filter(book => {
        console.log("the filtered data ",book,booksList)
          const { title } = book;

          if (text === '') return book;
          if (title.toLowerCase().includes(text.toLowerCase())) return book;
        })
      : booksList;

    return (
      <Wrapper noMargin>
        {/* <Search
          onSearchChange={changedText => this.setState({ text: changedText })}
          onFocus={() => console.log('On Focus')}
          onBlur={() => {}}
        /> */}
        {noResult
          ? this.renderNoResult()
          : isDataFetched
          ? this.renderX(filteredListData)
          : this.renderPlaceholders()}
      </Wrapper>
    );
  }
}
