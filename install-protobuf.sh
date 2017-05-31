#!/bin/sh
set -ex
# check to see if protobuf folder is empty
if [ ! -d "$HOME/protobuf/lib" ]; then
  wget https://github.com/google/protobuf/releases/download/v$PROTOBUF_VER/protoc-$PROTOBUF_VER-linux-x86_64.zip
  unzip protoc-$PROTOBUF_VER-linux-x86_64.zip -d $HOME/protobuf/
else
  echo "Using cached directory."
fi