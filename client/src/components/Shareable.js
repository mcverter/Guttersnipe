import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Utils from '../utils'

import PropTypes from 'prop-types';


const Shareable = ({shareable})  => {
  const {
    id,
    subcategory,
    category,
    name,
    description,
    address,
    time,
    geolocation,
    icalendar} = shareable;

  return (
    <View>
      <View>
        <Text>{Utils.superDecodeURI(name)}</Text>
      </View>
      <View>
        <Text>{Utils.superDecodeURI(category)}</Text>
        <Text>{Utils.superDecodeURI(subcategory)}</Text>
      </View>
      <View><Text>{Utils.superDecodeURI(description)}</Text></View>
      <View><Text>{Utils.superDecodeURI(address)}</Text></View>
      <View><Text>{Utils.superDecodeURI(time)}</Text></View>
      <View>
        <Text>{Utils.superDecodeURI(address)}</Text>
      </View>
      <View><Text>View Map</Text></View>
      <View><Text>View Calendar</Text></View>

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

/*
reable
:
Object
address
:
"150%20N%207th%20St%2C%20Brooklyn%2C%20NY%2011249"
category
:
null
description
:
""
geolocation
:
"0101000000A36DA1D0577D52C0475854C4E95B4440"
icalendar
:
null
id
:
"4c9f01be-d19b-4688-897c-a27f09fb2600"
name
:
"Sunac%20Natural%20Foods"
subcategory
:
"dumpster"
time
:
""
__proto__
:
Object
 */
