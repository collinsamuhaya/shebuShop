FROM php:8.1-fpm-alpine
FROM node:14.15.0 as vuejs

LABEL authors="Collins Amuhaya"

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
#install php dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    libzip-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl


RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 8082
EXPOSE 6001

ADD scripts/ /srv/

CMD ["/bin/sh", "/srv/startup.sh"]
FROM node:current-alpine

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

EXPOSE 8081

CMD ["./node_modules/.bin/vite", "--host", "0.0.0.0", "--port", "8081"]
