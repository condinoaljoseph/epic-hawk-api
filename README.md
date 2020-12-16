# epic-hawk-api

Best practices for create microservices api using mysql2 and sequelize. Big thanks to this [guide](https://medium.com/swlh/build-simple-nodejs-api-for-microservice-7da5bf207630).

### Tech Stack

-   MySQL
-   Node JS
    -   [myql2](https://www.npmjs.com/package/mysql2)
    -   [sequelize](https://sequelize.org/master/manual/getting-started.html)

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

### Run pending migrations

```bash
$ npx sequelize db:migrate
```

#### Seeding tables:

```bash
$ npx sequelize db:seed:all
```
