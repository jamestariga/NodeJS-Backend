# NODE JS Backend

## This project is underdevelopment

- This will be used for the React Login Form application

## Environment Variables

To generate the values for the .env file:

```
// Open terminal

$ node
$ require('crypto').randomBytes(64).toString('hex')
```

Create a <code>.env</code> file in the root directory then declare:

```
ACCESS_TOKEN_SECRET=Paste crypto random bytes here
REFRESH_TOKEN_SECRET=Paste crypto random bytes here
```

## Thunder Client Extension VSCode

When using thunder client, make sure to comment or remove 'https'.

In <code>authController.js</code> and <code>logoutController.js</code>

```
secure: true
```

When testing the REST Api in the browser, ensure that this header is active otherwise errors will be thrown.

## Run this project locally

- NodeJS and npm installed in your computer
- Thunder Client (Recommended) or any API testing software such as Postman
- Must have a MongoDB account
