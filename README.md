# README

Welcome to [Chat App]

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

After installing the dependencies, let's now create a Secret Key for our `.env`. Try checking out the `.env.example` for examples

```
yarn rw g secret
```

Now that we have generated the Secret Key, let's now go develop the database. In this case, I am using `PostgreSQL`

```
yarn rw prisma migrate dev
```

Now we are ready to run our Chat App
```
yarn rw dev
```

Your browser should automatically open to http://localhost:8910.

> **The Redwood CLI**
>
> Congratulations on running your first Redwood CLI command!
> From dev to deploy, the CLI is with you the whole way.
> And there's quite a few commands at your disposal:
> ```
> yarn redwood --help
> ```
> For all the details, see the [CLI reference](https://redwoodjs.com/docs/cli-commands).
