# Container Docker para Postgres

```
docker run --name apivendas-postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=apivendas -p 5432:5432 -v ${PWD}/docker/dbdata:/var/lib/postgresql/data -d postgres:13
```
