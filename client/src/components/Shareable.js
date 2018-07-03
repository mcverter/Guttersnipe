import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const Shareable = (props)  => {
  // ({id, subcategory, category, name, description, address, time, geolocation, icalendar})

  console.log(props);
    return (
        <View>
          <Text>          SHareable</Text>
        </View>
    );
};
const styles = StyleSheet.create({

});

Shareable.propTypes = {

};

export default Shareable;

/*
address
:
"Atlantic%20at%20Court%20130%20Court%20St%20Brooklyn%2C%20NY%2011201"
category
:
null
description
:
""
geolocation
:
"01010000006F641EF9837F52C0BFF2203D45584440"
icalendar
:
null
id
:
"bd221824-b1ca-447b-b508-5f77d5a6d4cd"
name
:
"Trader%20Joe%27s"
subcategory
:
"dumpster"
time
:
"Lately%20%28fall%202012%29%2C%20usually%20not%20until%20about%20midnight%3B%20sometimes%20earlier.%20Be%20forewarned%2C%20the%20initial%20reaction%20of%20this%20store%27s%20management%20was%20to%20have%20the%20police%20ticket%20dumpster%20divers%20for%20trespass%20or%20littering%3B%20the%20situation%20could%20always%20take%20a%20turn%20for%20the%20worse."
__proto__
:
 */
