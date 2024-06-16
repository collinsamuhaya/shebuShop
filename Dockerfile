FROM php:8.1-fpm-alpine

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

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
