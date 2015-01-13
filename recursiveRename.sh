echo "foo"

find . -type f -exec rename 's/Widget/Template/' '{}' \;
