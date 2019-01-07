import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";

class addShareablePage extends Component {
  _handlePress(url) {
  /*  Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return utilOpenURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
      */
  }

  render() {
    return (
      <div style={styles.addShareablePageContainer}>
        <div style={styles.addShareableHeaderContainer}>
          <div style={styles.addShareableHeaderText}>
            ADD A NEW SHAREABLE
            {"\n"}
            (Press Button Below or
            {"\n"}
            Enter Address in Browser)
          </div>
        </div>
        <RaisedButton
          style={styles.addShareableInputContainer}
          onPress={() =>
            this._handlePress("https://goo.gl/forms/eIUoxhBjJCzXaWnU2")
          }
        >
          <div style={styles.addShareableInputText}> In a Form </div>
          <div style={styles.addShareableInputText}>
            https://goo.gl/forms/eIUoxhBjJCzXaWnU2
          </div>
        </RaisedButton>
        <RaisedButton
          style={styles.addShareableInputContainer}
          onPress={() =>
            this._handlePress(
              "https://docs.google.com/spreadsheets/d/1KbeTJR_P4kx-Wd5J9qSOUcwpf8SuHYzjgjRK-bi6Bfg/edit?usp=sharing"
            )
          }
        >
          <div style={styles.addShareableInputText}> In a Spreadsheet</div>
          <div style={styles.addShareableInputText}>goo.gl/z3szjU</div>
        </RaisedButton>
      </div>
    );
  }
}

const styles = {
  addShareablePageContainer: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  addShareableHeaderContainer: {
    backgroundColor: "#D46A6A",
    flex: 2,
    padding: 20,
    margin: 20,
    width: "80%"
  },
  addShareableHeaderText: {
    color: "black",
    fontWeight: "900",
    textAlign: "center"
  },
  addShareableInputContainer: {
    backgroundColor: "red",
    flex: 2,
    padding: 20,
    margin: 20,
    width: "80%"
  },
  addShareableInputText: {
    color: "black",
    fontWeight: "900",
    textAlign: "center"
  }
};

addShareablePage.propTypes = {};
export default addShareablePage;
