#!/usr/bin/env bash

npm run build:prod
rsync -avz dist/* member@haomo-studio.com:/var/www/html/software_factory/vue-element/