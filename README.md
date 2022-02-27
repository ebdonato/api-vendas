# Containers Docker

## Postgres

```
docker run --name apivendas-postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=apivendas -p 5432:5432 -v ${PWD}/docker/dbdata:/var/lib/postgresql/data -d postgres:13
```

## Redis

```
docker run --name apivendas-redis -p 6379:6379 -d -t redis:alpine
```

## Redis Insight

```
docker run --name redis-client -v ${PWD}/docker/redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
```
