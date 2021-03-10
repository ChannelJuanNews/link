# link

# link-backend 
The Link-Backend project is created using Node, Express, GraphQL & PostgreSQL 

Make sure you have PostgreSQL installed and running 

$`yarn install` 
        - Install backend dependencies. Nodes will be installed in the local directory
        `./link-backend/node_modules/`

$`yarn create:migration`
        - Runs npx to create migrations @ `./link-backend/src/migrations`

$`redis-server`  
        - Redis server must be up to save session data.         

$`yarn watch`
        - Run tsc transpiler (typescript -> JS generation) in watch mode. 

$`yarn dev`
        - Init backend endpoints

# TODO: recheck node dependencies on backend

# link-web
The Link-Web project is created using Next.js which is a framework that gives us support for hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more


$`yarn install`
        -Install frontend dependencies. Nodes will be installed in the local directory
        `./link-web/node_modules`
        TODO:
        NOTE: currently we are storing local node source code in two directories, one
        at the backend and one at the front-end. Consider merging node_modules.

$`yarn gen`
        - Generate Apollo-server-express graphql code.

$`yarn dev`
        - Init graphql server, db connections, front-end endpoints, ...



Consider installing @chakra-ui/react with legacy peer dependencies (front end)

$`npm install @chakra-ui/react --legacy-peer-deps`

# TODO: Broken dependencies and deprecated packages should be cleaned out or swapped out with newer supported nodes. 'Jest' package also seems to be deprecated

// warning "@chakra-ui/react > @chakra-ui/modal@1.6.1" has incorrect peer dependency "framer-motion@>=3.0.0"

//warning " > jest-puppeteer@4.4.0" has incorrect peer dependency "puppeteer@>= 1.5.0 < 3".
