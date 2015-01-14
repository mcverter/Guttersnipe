#!/bin/bash
# for var in "$@"
# do
#    echo "$var"
# done

echo "foo"

if [ $# -lt 2 ]
then
    echo "$0 error: you must supply two arguments"
else

    cd $1

    shift 1
    echo $1

    for subdir in *
    do   

	if [ -d $subdir ]
	then
	    mkdir ${subdir}"/"$1
	fi
    done
fi
