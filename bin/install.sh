#!/bin/bash

if [ ! -f composer.json ]; then
    echo "Please make sure to run this script from the root directory of this repo."
    exit 1
fi

cp -v .env.example .env
composer install --no-interaction
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
npm install
npm run build
