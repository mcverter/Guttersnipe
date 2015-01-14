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
	    echo subdir is $subdir
	    new_subdir=${subdir}"/"$1
	    mkdir $new_subdir
	 
	fi
    done
fi
