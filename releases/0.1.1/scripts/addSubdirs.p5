#!/bin/bash
# for var in "$@"
# do
#    echo "$var"
# done  


# bash addSubdirs.sh ../public/modules/ controllers

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
	    echo $subdir | gawk '{print substr($0,2)}'

        if [ ! -e ]
        then
    	    mkdir ${subdir}"/cd "$1
    	fi
	fi
    done
fi


