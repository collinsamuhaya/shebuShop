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
# Install PHP extensions required by Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer (dependency manager for PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the Laravel project files into the container
COPY . .

# Install project dependencies using Composer
RUN composer install --no-interaction --no-dev --prefer-dist

# Generate the application key
RUN php artisan key:generate

# Expose port 8000 for accessing the Laravel service
EXPOSE 9000

# Start the Laravel service
CMD php artisan serve --host=0.0.0.0 --port=9000

