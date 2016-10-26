#!/bin/sh
{
    echo "This script requires superuser access to install apt packages."
    echo "You will be prompted for your password by sudo."

    # clear any previous sudo permission
    sudo -k

    # run inside sudo
    sudo sh <<SCRIPT

  # add heroku repository to apt
  echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list

  # install heroku's release key for package verification
  wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add -

  # update your sources
  apt-get update

  # install the toolbelt
  apt-get install -y heroku-toolbelt

  # install ruby if needed (vervet)
  if ! type ruby >/dev/null 2>&1; then
    apt-get install -y ruby
  fi

SCRIPT
}
