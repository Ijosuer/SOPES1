# Dockerfile

# Utiliza la imagen oficial de MySQL como base
FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=josue

# Copia el script de inicialización a la carpeta /docker-entrypoint-initdb.d/
COPY ./init.sql /docker-entrypoint-initdb.d/
