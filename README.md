# CRUD-API

## 💻 How to clone

```
git clone https://github.com/NoneBeer/CRUD-API.git
```

## 💻 How to install packages

Install packages

```
npm i
```

## How to run

Development mode

```
npm run start:dev
```

Production mode

```
npm run start:prod
```

Run tests scenarios for API

```
npm test
```

## 💥 API

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id

`POST api/users` - to create new user and add it in database

`PUT api/users/${userId}` - to update existing user

`DELETE api/users/${userId}` - to delete existing user from database

### User's mandratory fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)