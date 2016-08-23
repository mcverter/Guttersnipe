#!/bin/bash

echo "foo"


echo "My name is $1 and I come from $2"

if [ $# -lt 2 ]
    then
        echo "$0 error: you must supply two arguments"
    else
        echo "My name is $1 and I come from $2"
fi


# find . -type f -exec rename 's/Widget/Template/' '{}' \;
