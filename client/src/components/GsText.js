import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

function superDecodeURI(string) {
  if(!string) return '';
  if (string==='') return '';
  return string
    .replace(/%27/g, "'")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")

    .replace(/%24/g, "$")
    .replace(/%26/g, "&")
    .replace(/%2B/g, "+")
    .replace(/%2C/g, ",")

    .replace(/%2F/g, "/")
    .replace(/%3A/g, ":")
    .replace(/%3B/g, ";")
    .replace(/%3F/g, "?")
    .replace(/%40/g, "@")


    .replace(/%7B/g, "{")
    .replace(/%7D/g, "}")
    .replace(/%7C/g, "|")
    .replace(/%5C/g, "\\")

    .replace(/%5E/g, "^")
    .replace(/%7E/g, "~")
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]")
    .replace(/%60/g, "`")

    .replace(/%20/g, " ")
    .replace(/%22/g, '"')
    .replace(/%3C/g, "<")
    .replace(/%3E/g, ">")
    .replace(/%23/g, "#")
    .replace(/%25/g, "%");
}

/*
 */


const Comment = (props) => {
  return (<Text style={props.style}>{superDecodeURI(props.children)}</Text>);
};

Comment.propTypes = {

};

export default Comment;
