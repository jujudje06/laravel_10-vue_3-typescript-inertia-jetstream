FROM php:8.3-fpm

ENV DOCK_CONF_PATH=.docker/php

COPY ${DOCK_CONF_PATH}/php.ini /usr/local/etc/php/
COPY ${DOCK_CONF_PATH}/docker.conf /usr/local/etc/php-fpm.d/docker.conf
COPY ${DOCK_CONF_PATH}/.bashrc /root/

RUN apt-get update \
  && apt-get install -y build-essential zlib1g-dev default-mysql-client  \
    curl gnupg procps vim git unzip libzip-dev libpq-dev dos2unix \
  && docker-php-ext-install zip pdo_mysql pdo_pgsql pgsql

RUN apt-get install -y libicu-dev \
  && docker-php-ext-configure intl \
  && docker-php-ext-install intl

ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# redis
RUN pecl install redis && docker-php-ext-enable redis

# pcov
RUN pecl install pcov && docker-php-ext-enable pcov

# Xdebug
RUN pecl install xdebug \
  && docker-php-ext-enable xdebug \
  && echo ";zend_extension=xdebug" > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Node.js, NPM, Yarn
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
RUN npm install yarn -g

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
        --install-dir=/usr/local/bin \
        --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin
RUN composer config --global process-timeout 3600
RUN composer global require "laravel/installer"

# Entrypoint
COPY ${DOCK_CONF_PATH}/entrypoint.sh /usr/bin/entrypoint.sh
RUN dos2unix /usr/bin/entrypoint.sh \
    && chmod +x /usr/bin/entrypoint.sh

WORKDIR /root
RUN git clone https://github.com/seebi/dircolors-solarized

EXPOSE 9000

WORKDIR /var/www

COPY . .

ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]
