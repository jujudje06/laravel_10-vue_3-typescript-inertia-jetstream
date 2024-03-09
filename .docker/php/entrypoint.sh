#!/bin/bash

set -e

rm composer.lock
composer install

php -r "file_exists('.env') || copy('.env.example', '.env');"
php artisan key:generate
php artisan config:cache
php artisan migrate

php artisan ide-helper:generate
php artisan ide-helper:models -N
php artisan ide-helper:meta

npm install
npm run build

exec php-fpm
