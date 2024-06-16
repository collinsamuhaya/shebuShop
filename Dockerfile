FROM php:8.0-fpm

 #Copy composer.lock and composer.json
#COPY  ./composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl



# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# Install PHP extensions

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions mbstring pdo_mysql zip exif pcntl gd



# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#Installing node 12.x
RUN curl -sL https://deb.nodesource.com/setup_12.x| bash -
RUN apt-get install -y nodejs


# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

RUN chown -R www:www /var/www
# Copy existing application directory contents
#COPY ./src/. /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

#RUN composer install --no-scripts --no-autoloader

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
FROM php:8.1-fpm

RUN apt-get update -y \
	&& apt-get install -y libmcrypt-dev openssl openssh-client git zip unzip \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Fixed version of composer for php 8.1
COPY --from=composer:2.4.3 /usr/bin/composer /usr/bin/composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN pecl install mcrypt-1.0.5 
RUN docker-php-ext-enable mcrypt
RUN docker-php-ext-install mysqli pdo_mysql

ARG working_dir=/var/www/laravel-app/
RUN useradd --uid 1000 --user-group -ms /bin/bash www
#RUN mkdir $working_dir && chown -R www:www $working_dir

WORKDIR /tmp
ADD https://github.com/laravel/laravel/archive/refs/tags/v9.0.0.tar.gz .
RUN tar -xzvf v9.0.0.tar.gz && mv laravel-9.0.0 $working_dir

RUN chown -R www:www $working_dir
WORKDIR $working_dir
USER www

RUN rm -rf vendor composer.lock && \
	composer config disable-tls true && \
	composer install --no-dev --no-scripts --ignore-platform-reqs && \
	composer dump-autoload && \
	composer clear-cache && \


CMD php artisan migrate && php artisan serve --host=0.0.0.0 --port=9000


