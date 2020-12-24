# epic-hawk-api

Microservices API using PostgreSQL and sequelize for [Epic Hawk](https://github.com/condinoaljoseph/epic-hawk) website. Big thanks to this [guide](https://medium.com/swlh/build-simple-nodejs-api-for-microservice-7da5bf207630).

### Tech Stack

> Note: You can easily use or migrate database on either Postgres or MySQL. Just be sure to install the database package for connecting in node js then run migrations. I recommend to use postgres as database because heroku supports postgres on deployment and its free.

- NodeJS
- PostgreSQL (used / **recommended**)
  - [pg](https://www.npmjs.com/package/pg)
- MySQL (dont forget to install using `npm i mysql2` when you use this)
  - [myql2](https://www.npmjs.com/package/mysql2)
- Sequelize
  - [sequelize](https://sequelize.org/master/manual/getting-started.html)

### Installation

Install the dependencies using `npm install`:

```bash
$ npm install
```

### Migrations

> Note: Run below command if and only you have `sequelize-cli` install on your dev dependencies or local machine.

#### Create migrations:

```bash
$ npx sequelize migration:create --name=create_users
```

#### Run pending migrations

```bash
$ npx sequelize db:migrate
```

#### Seeding tables:

```bash
$ npx sequelize db:seed:all
```
