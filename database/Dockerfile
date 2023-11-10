FROM postgres:latest
ENV POSTGRES_USER nobuzztest
ENV POSTGRES_PASSWORD nobuzztest
ENV POSTGRES_DB nobuzztest
EXPOSE 5432
COPY init.sql /docker-entrypoint-initdb.d/

