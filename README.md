
# gymFind-rest-api

Hello everyone.


This project allows users to view the nearest gyms to them and rate gyms.
## Install package dependencies

```javascript
npm install
```
## Environment variables

`PORT`

`NODE_ENV`

`SITE_NAME`

`MONGO_URI`

`JWT_SECRET_KEY`

`JWT_EXPIRE`

`EMAIL_USERNAME`

`EMAIL_PASSWORD`
## Start

```bash
  npm start
```

  
## Usage API

#### Auth

```http
  /api/auth
```
| URL  | METHOD     |     DESCRIPTION                
| :-------- | :------- | :------------------------- |
| `/user/register` | `post` | user register |
| `/gym/register` | `post` | gym register |
| `/login` | `post` | login |
| `/forgotPassword` | `post` | forgot password |
| `/newPassword/:token` | `put` | new password |
| `/newConfirmToken` | `put` | new confirm token |
| `/confirmAccount/:token` | `post` | confirm account |


#### User

```http
  /api/user
```

| URL  | METHOD     |     DESCRIPTION                |REQUIRED
| :-------- | :------- | :------------------------- | :------
| `/getAllGyms` | `get` | fetches all gyms ||
| `/getNearbyGyms` | `get` | fetches nearby gyms |auth|
| `/getGym/:id/:slug` | `get` | fetch gym ||
| `/setRating` | `post` | rate the gym |auth, confirm|
| `/editProfile` | `put` | edit your profile |auth|
| `/changedPassword` | `put` | changed your password |auth|
| `/ppChanged` | `put` | changed your photo |auth|


#### Gym

```http
  /api/gym
```

| URL  | METHOD     |     DESCRIPTION                |REQUIRED
| :-------- | :------- | :------------------------- | :------
| `/editProfile` | `put` | edit your profile |auth, confirm|
| `/changedPassword` | `put` | changed your password |auth, confirm|
| `/photoUpload` | `put` | new photo upload. |auth, confirm|
| `/ppChanged` | `put` | changed your photo |auth, confirm|



#### Admin

```http
  /api/admin
```

| URL  | METHOD     |     DESCRIPTION                
| :-------- | :------- | :------------------------- |
| `/getGym` | `get` | get gym|
| `/getGym/:id` | `get` | changed your password|
| `/suspendGym/:id` | `put` |suspend gym|
| `/unsuspendGym/:id` | `put` | unsuspend gym|
| `/deleteGym/:id` | `delete` | delete gym|
| `/getUsers` | `get` | get users|
| `/getUser/:id` | `get` | get user|
| `/deleteUser/:id` | `delete` | delete user |

## Used npm packages

**bcrypt:** A cryptographic hash function library used for hashing and verifying user passwords.

**dotenv:** A library used to manage environment variables for the project. It is commonly used during development to securely manage sensitive information.

**express:** A fast and flexible web framework for developing Node.js-based web applications.

**express-async-handler:** A helper module that facilitates the use of async/await operations within Express middleware and route functions.

**jsonwebtoken:** A library providing JSON Web Token (JWT) based authentication and authorization. It is commonly used for user authentication in web applications.

**mongoose:** An Object Data Modeling (ODM) library for MongoDB. It simplifies database operations and enables the creation of structured data models on MongoDB.

**multer:** A middleware for Express.js that simplifies file uploading operations. It is commonly used in web applications to allow users to upload files.

**nodemailer:** A library used for sending emails in Node.js. It is compatible with various email service providers such as SMTP, Sendmail, and Amazon SES.

**slugify:** A library used to convert strings into URL-friendly formats. It replaces spaces, special characters, and other irregular characters appropriately.

**winston:** A powerful logging library for Node.js. It supports various log levels, manages log files periodically, and logs to various destinations through different transports.

  