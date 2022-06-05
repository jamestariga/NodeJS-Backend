# NODE JS Backend

## Run it locally

- This will be used for the React CRUD Form application
- NodeJS and npm installed in your computer
- Thunder Client (Recommended) or any API testing software such as Postman
- Must have a MongoDB account

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

## MongoDB

In order to run the app successfully, you will need to register for a MongoDB account. After signing up for an account, you will need to create a new [project](https://www.mongodb.com/docs/atlas/tutorial/manage-projects/). Once completed, navigate to the project and find "Connect" and choose "Connect your application". Then copy the connection string which you will then paste inside your <code>.env</code> file.

Example code:

```
DATABASE_URI=mongodb+srv:username:<password>@cluster0.z3xfq.mongodb.net/MyDB?retryWrites=true&w=majority
```

Ensure that you remove '< >' around the password above as well as replacing 'MyDB' with the name of the database you want to connect by default. If your password contains a character such as @, #, $, etc. Use a url [encoder](https://www.url-encode-decode.com/). For more information, visit this [page](https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password).

## Localhost Testing and Thunder Client Extension VSCode

When testing the REST API using localhost or Thunder Client, ensure that the https or secure hearder is inactive as localhost uses http rather than https.

In <code>authController.js</code> and <code>logoutController.js</code>

```
secure: true // Comment or remove this line of code
```
