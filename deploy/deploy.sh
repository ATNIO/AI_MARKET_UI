#!/usr/bin/env bash

#*********Usage*********************************************
Usage()
{
  echo "Usage: {start|stop|restart}"
  exit -1
}
#***************************************************************

BIN_DIR=$(cd "$(dirname "$0")"; pwd)
PRO_DIR=${BIN_DIR}/..



clear(){
        cd ${BIN_DIR}/ai_market_docker
        rm -rf ./www && rm -rf ./logs
        if [ $? -eq 0 ]; then
            echo "clear succ!"
        fi
}

build(){
        clear
        cd ${PRO_DIR}
        yarn install
        if [ $? -ne 0 ]; then
            echo " yarn install fail!"
            exit -1
        fi
        yarn build
        if [ $? -eq 0 ]; then
            echo "build succ!"
            mkdir ${BIN_DIR}/ai_market_docker/www && ${BIN_DIR}/ai_market_docker/logs
            cp -r ./dist/* ${BIN_DIR}/ai_market_docker/www
        fi
}

# dispatch the command
case "$1" in
build)
build
  ;;
clear)
clear
  ;;
*)
  Usage
  ;;
esac


# END OF FILE
