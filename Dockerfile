# Use the official PHP 8.1 Apache image as base
FROM php:8.1-apache

# Install additional dependencies
RUN apt-get update && \
    apt-get install -y \
        zip \
        git \
        default-mysql-client && \
    rm -rf /var/lib/apt/lists/*


# Enable PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

FROM richarvey/nginx-php-fpm:1.7.2

COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]
