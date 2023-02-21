<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
</p>

Based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

```bash
$ npm install
```

#### Running app only with database containers

Update DATABASE_HOST=localhost in .env file.

```bash
# Start docker with db and adminer.
$ docker-compose up -d
# Its important for migrations run.
$ npm run build
# Run all migrations.
$ npm run migration:run
# Start dev mode.
$ npm run start:dev
```

#### Running app fully on docker

After all containers started, it takes some time for migrations to run.

```bash
# run docker
$ docker-compose -f docker-compose.node.yml up -d
```

#### Remove docker containers and its volumes

```bash
$ docker-compose down -v
```

#### Links

1. [Homepage](http://localhost:3000/)
2. [Swagger](http://localhost:3000/swagger)
