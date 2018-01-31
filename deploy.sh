#!/usr/bin/env bash

npm run build:prod
rsync -avz dist/* member@haomo-studio.com:/var/www/html/software_factory/vue-element/

cmd="git clone xxx" && ret=`ps -ef|grep -v grep|grep ${cmd}` && if [ -z $ret ]; then echo '空字符串'; else echo '非空字符串'; fi