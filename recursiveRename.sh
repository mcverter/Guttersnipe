echo "foo"

find -r . -type f -exec rename 's/Widget/Template/' '{}' \;