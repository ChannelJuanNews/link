# link

# link-backend

The Link-Backend project is created using Node, Express, GraphQL & PostgreSQL

Make sure you have PostgreSQL installed and running

$`yarn install` - Install backend dependencies. Nodes will be installed in the local directory
`./link-backend/node_modules/`

$`yarn create:migration` - Runs npx to create migrations @ `./link-backend/src/migrations`

$`redis-server`

- Redis server must be up to save session data.

$`yarn watch` - Run tsc transpiler (typescript -> JS generation) in watch mode.

$`yarn dev` - Init backend endpoints

# TODO: recheck node dependencies on backend

# link-web

The Link-Web project is created using Next.js which is a framework that gives us support for hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more

$`yarn install`
-Install frontend dependencies. Nodes will be installed in the local directory
`./link-web/node_modules`
TODO:
NOTE: currently we are storing local node source code in two directories, one
at the backend and one at the front-end. Consider merging node_modules.

$`yarn gen` - Generate Apollo-server-express graphql code.

$`yarn dev` - Init graphql server, db connections, front-end endpoints, ...

Consider installing @chakra-ui/react with legacy peer dependencies (front end)

$`npm install @chakra-ui/react --legacy-peer-deps`

### TODO: Broken dependencies and deprecated packages should be cleaned out or swapped out with newer supported nodes. 'Jest' package also seems to be deprecated

// warning "@chakra-ui/react > @chakra-ui/modal@1.6.1" has incorrect peer dependency "framer-motion@>=3.0.0"

//warning " > jest-puppeteer@4.4.0" has incorrect peer dependency "puppeteer@>= 1.5.0 < 3".

<hr />

# Dealing with CORS issues

## link-backend

1.  In the file `src/index.ts` change the following line of code to include your origin ip address. Change the default value to `http://localhost:3000` or to your local network ip for testing on mobile devices that are connected to the same router. You can find this IP address running the following command on macOS

        ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'

    on linux try the following command. If this does not work, use google.

        ip addr show

    After you find your ip address, change the value after the `||` statement to whatever your ip address is. Remember to append the port that the application is running in, which happens to be port `3000`. This value might change sometime in the future so please ensure that it is the correct ip address and the correct port

        origin: process.env.SERVER || "http://192.168.211.115:3000"

    What we are doing is we are telling the client that the cookies set from cross origin are okay if they differ. This will allow you to login/register and view/edit profile, etc.

    remember to delete & re-build your `dist` folder since hot module replacement might not catch the string change.

2.  This file change occurs in two differnt locations in same `src/index.ts` file. Change the lines that contain the following two function calls

        app.use(
          cors({
            origin: process.env.SERVER || "http://192.168.211.115:3000",
            credentials: true,
          })
        );

    and the following function call

        apollo.applyMiddleware({
          app,
          cors: {
            credentials: true,
              origin: process.env.SERVER || "http://192.168.211115:3000",
            },
        });

## link-web

1.  in the file `codegen.yml` change the schema url to the same url as above

        overwrite: true
        schema: "http://192.168.211.115:3001/graphql"
        documents: "src/graphql/**/*.graphql"
        generates:
          src/generated/graphql.tsx:
            plugins:
              - "typescript"
              - "typescript-operations"
              - "typescript-urql"

    then run `yarn gen` to re-generate the GraphQL queries that are now pointed to the new endpoint

2.  in the file `src/pages/_app.tsx` change the URQL client to point to the new GraphQL endpoint

        const client = createClient({
                url: process.env.SERVER_GRAPHQL || "http://192.168.211.115:3001/graphql",
                fetchOptions: {
                        credentials: "include",
                },
        });

    Then remember to re-build the `.next` directory. Delete it and run `yarn dev`
