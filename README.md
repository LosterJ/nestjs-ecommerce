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

To management this db, you need some dbms like mongodb-compass:

1. wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb
2. sudo dpkg -i mongodb-compass_1.40.4_amd64.deb
3. mongodob-compass

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

Create strategies folder in auth directory, with name 'local.strategies.ts'.
In this file, we do 2 things:

1. Calls the super() method in the constructor. We can pass an options object here if we need to and go through an example later.
2. Adds a validate() method, which uses validateUser() from the auth service to verify the user.

### Create an authentication strategy with jwt

Return a JWT for logged users for use in subsequent calls to protected API endpoints.
`npm i --save @nestjs/jwt passport-jwt`
`npm i --save-dev @types/passport-jwt`
In strategies directory, create jwt.strategy.ts file.
In the code, we set an options object with prooperties: jwtFromRequest, ignoreExpiration, secretOrKey

Modify the auth.service.ts

1. Added JwtService to the constructor
2. used the login() method to sign a jwt

Update auth.module.ts

1. add UserModule, PassportModule, JwtModule in imports array
2. register() method to provide the necessary options: secret key and signOptions object, which set the token expiration to 3600s
3. add LocalStrategy and JwtStrategy in the providers array

### Create local and JWT guards

In auth directory, create a new guards folder. Add a local.guard.ts and jwt.guard.ts files.
Now we can't use this but we'll see how to use these guards in a minute.

### Create user roles management (Authorization functionality)

To implement this feature in ecommerce app, we'll use role-based access control.
This need 3 files: role.enum.ts, roles.decorator.ts, role.guard.ts.

1. Create enums folder in auth directory and create role.enum.ts. Go back to the user.schema.ts file and uncommented code (relative to roles).
2. Create decorators folder in auth directory and add roles.decorator.ts file.
3. In guards directory, create a roles.guard.ts file

### Controller methods

In auth.controller.ts file:

- POST auth/register : used to create a new user
- POST auth/login : used to log in a registered user, to verify the user, we use the LocalAuthGuard
- GET auth/user : used to access the user's profile, use JwtGuard to authenticate the user, RolesGuard plus @Roles decorator to provide the appropriate authorization depending on the user's roles
- GET auth/admin : used to access the admin dashboard,...

## Create the store cart feature

### Create store cart resouce

`nest g mo cart`
`nest g s cart --no-spec`
`nest g co cart --no-spec`

### Create the schemas and DTOs

We need 2 schemas for store cart feature:

- describing the product in cart
- describing the cart itself

1. Create new schemas folder

- add **item.schema.ts** file in this new folder
- create **cart.schema.ts** file
- in the **user** directory, create a new **dtos** folder and add an **item.dto.ts** file

2. Config the cart module **cart.module.ts**
3. Create cart service methods **cart.service.ts**
4. Create cart controller methods **cart.controller.ts**

## Conculusion

This pretty basic and can be extended to include even more features
Some ideas you can try:

- Add pagination for the products
- Add validation for received data
- Create an order module, in which you can store and manage a particual user's various orders

About this project:

1. createCart/addItemToCart

- pros: you can reduce quantity by passing the negative number in quantity
- cons:
  - error 500 when you create w/o itemDto in req's body
  - the quantity of item can be negative and totalPrice can be effected

2. removeItemFromCart

- cons: after you remove some item in cart, the totalPrice do not update

3. deleteCart

- cons:
  - in this project, you can delete the other's cart
  - error 500 when you delete the not exist cart
