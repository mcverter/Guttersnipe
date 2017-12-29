import React, {Component} from "react";
import {StyleSheet, Text, View, SectionList} from "react-native";
import BookItem from './BookItem';
import NYT from "./NYT";

class SimpleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: []
    };
  }
  componentDidMount() {
    this._refreshData();
  }
  /**/
  _renderItem = ({item}) => {
    return <BookItem
      coverURL={item.book_image}
      title={item.key}
      author={item.author}
    />
  }

  _addKeysToBooks = books => {
    return books.map(book => {
      return Object.assign(book, {key: book.title})
    })
  }

  _renderHeader = ({section}) => {
    return (
      <Text style={styles.headingText}>
        {section.title}
      </Text>
    )
  }
  _refreshData = () => {
    Promise
      .all([
        NYT.fetchBooks("hardcover-fiction"),
        NYT.fetchBooks("hardcover-nonfiction")
      ])
      .then(results=>{
        if(results.length !== 2) {
          console.error("Unexpected results")
        }
        this.setState({
          sections: [
            {
              title: "Hardcover Fiction",
              data: this._addKeysToBooks(results[0])
            },
            {
              title: "Hardcover NonFiction",
              data: this._addKeysToBooks(results[1])
            }

          ]
        })
      })

  }

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sections}
          renderSectionHeader={this._renderHeader}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 22 },
  headingText : {
    fontSize: 24,
  alignSelf: "center",
    backgroundColor: "#FFF",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 2
  }
});
export default SimpleList;
