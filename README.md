## To start:

`npm run dev`

### Step to build this project:

`npm i -g @nestjs/cli`
`nest new nestjs-ecommerce`
Install mongodb:
`sudo apt update`
`sudo apt upgrade`
`sudo apt install mongodb`
`mongo --version`
Status of mongodb:
`sudo service mongodb start`
`sudo service mongodb status`
Go to mongo:
`mongo`

```
use admin
db.createUser(
  {
    user: "admin",
    pwd: "your_admin_password",
    roles: [ {role: "userAdminAnyDatabase", db: "admin"} ]
  }
)
```

Now you can go to 'mongodb://localhost:27017/your-database-name'

## Createing the product management feature

### Gen our product resources

`nest g mo product`
`nest g s product --no-spec`
`nest g co product --no-spec`
The --no-spec argument tells Nest that we don't want to gen additional test file.

### Configuring the MongoDB database

`npm i --save @nestjs/mongoose mongoose`

1. Imports MongooseModule and use it to set up a new store db in app.module.ts
2. Create a product model schema in product.schema.ts in new folder "schema" and edit in product.module.ts
3. Create product DTO files in new folder "dto": create-product.dto.ts, filter-product.dto.ts

### Create product service methods

Create all mothods that need to use (filter, add, update, delete,...) in product.service.ts file

### Create product controller methods

Now we need to create the API endpoints for POST, GET, PUT and DELETE in product.controller.ts

## Create the user management feature

### Gen our management resource

`nest g mo user`
`nest g s user --no-spec`

### Create a user schema and DTO

### Config the resources

Import schema to user.module.ts

`npm i bcrypt`
`npm i -D @types/bcrypt`

### Create user service methods

Add content to user.service.ts

### Create user authentication and authorization

Install well-known Passport library
`npm i --save @nestjs/passport passport passport-local`
`npm i --save-dev @types/passport-local`
Install dotenv package for managing environment variables
`npm i dotenv`

### Gen our user authentication and authorization resources

`nest g mo auth`
`nest g s auth --no-spec`
`nest g co auth --no-spec`

Add service auth.service.ts

### Create a local authentication strategy
