#!/usr/bin/bash

repository=$0
version=$1

echo $version
http_code=$(curl --silent -L -o /dev/null -I --write-out %{http_code} https://hub.docker.com/v2/repositories/$repository/tags/$version)

echo $http_code
if [ $http_code -eq 200 ]; then
  echo "Version has been deployed. Exiting"
  exit -1
else
  echo "Version hasn't been deployed."
fi
