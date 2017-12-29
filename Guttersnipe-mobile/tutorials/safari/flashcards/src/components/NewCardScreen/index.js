import React, {Component} from 'react';
import {Styleheet, View} from "react-native";

import DeckModel from './../../data/Deck';
import Button from '../Button';
import LabeledInput from '../LabeledIput';
import NormalText from '../NormalText';
import colors from './../../styles/colors';

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {front: "", back: ""}
  }

  _handleFront = text => {
    this.setState({front: text})
  }
  _handleBack = text => {
    this.setState({back: text})
  }
  _createCard = () => {
    console.warn("Not implemented")
  }
  _reviewDeck = () => {
    console.warn("Not implemented")
  }
  _doneCreating = () => {
    console.warn("Not implemented")
  }

  render() {
    return (
      <View>
        <LabeledInput
        label="Front"
        clearOnSubmit={false}
        onEntry={this._handleFront}
        onChange={this._handleFront}
        />
        <LabeledInput
          label="Front"
          clearOnSubmit={false}
          onEntry={this._handleBack}
          onChange={this._handleBack}
        />

        <Button style={styles.createButton} onPress={this._createCard}>
          <NormalText>Create Card</NormalText>
        </Button>

        <View>
          <Button style={styles.secondaryButton} onPress={this._doneCreating}>
            <NormalText>Done</NormalText>
          </Button>

          <Button style={styles.secondaryButton} onPress={this._reviewDeck}>
            <NormalText>Review Deck</NormalText>
          </Button>

        </View>
      </View>
    )
  }

 }

 const styles = Styleheet.create({
   createButton: {
     backgroundColor: colors.green
   },
   secondaryButton: {
     backgroundColor: colors.blue
   },
   buttonRow: {
     flexDirection: "flow"
   }
 })
