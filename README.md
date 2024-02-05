
```bash

nest new nestjs-api-rest


yarn install

yarn run start:dev

yarn build


# generate a new controller
# nest g controller products
# generate a new service
# nest g service products

# generate all resources related to products
nest g resource products


# prisma orm
npx prisma init

yarn add prisma -D
yarn add @prisma/client

npx prisma generate

# prisma/schema.prisma
npx prisma migrate dev

# DATABASE_URL="mysql://user:password@localhost:3306/nestjs_api_rest?charset=utf8mb4"

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

npx prisma format


# generate a new module
nest g module prisma

nest g service prisma


# object validation
yarn add class-validator class-transformer --save


# add filters - advice
nest g filter not-found-error
nest g filter server-error
nest g filter unprocessable-entity



# generate all resources related to stock-inputs
nest g resource stock-inputs
nest g resource stock-outputs



yarn add @nestjs/throttler --save


```
