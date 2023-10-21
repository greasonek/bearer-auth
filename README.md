# Author: Emily Greason

# NOTES

> client (thunderclient, terminal, postman, web app, browser) send request to server for /signup (POST) - request is JSON object { username: password } to the body of the request

## server --> POST /signin & POST /signup

### MIDDLEWARE FOR **SIGNUP!**

- before sending back a res.status(200).send(req.user) --> middleware must happen!
  - middleware for signup takes username and password, ecrypts the password and stores it in the db with a new instance of the user model
  - POST encodes the login information

### MIDDLEWARE FOR **SIGNIN**

- user makes a request, header of the request: authorization: Basic aldkfadsfjsl (encoded password)
- comes in like username: password which has been encoded with **Base64**
- requerst is intercepted by middleware
- middleware says get the auth header
  - split the basic away from the encoded username and password
  - decode it: username:password
  - ask the database for the user associated with the username
  - then use **bcrypt**.compare function to compare the password agains that user encrypted password

## NEW EXTRA STUFF for lab 07

- Also when user signs in, give them a token back and that token lets them bypass the signin process - we will add it to their user model
- we still have to verify the token
- we get the token from Bearer Auth Header - verify the token and if it checks out we let them in our route
- send req.status(200).send('good job you pass');
- payload and signature

## DESCRIBE AND DEFINE

- *bearer authentication*
  - a token generated from the user info - the user is now the bearer of the token and it contains everything needed confirm their identity
  - extra security can be added
  - time constraint can be added
  - single session constraint can be added
  
- *JSON web token (JWT)*
  
  - encoded with a secret password and holds user information
  - can be decoded as long as you know the secret password

- *Web security*

  - making things secrue on the internet??

- *when to use basic or bearer*

  - we can store user roles in bearer to protect routes
  - basic specifically used for sign-in!
  
### TO DO

Move the user model to it's own file

- add the additional logic that makes a token on a user model when the user signs in
- create the bearer file

- add a get() method to token - allows us to access some value, this term is often associated with classes also called access method **getter GETS information**
- conversly the term setter, set() method, is used to set a new value for something **setter SETS information**
- import jsonwebtoken

- write bearer auth mw
- create user route

- **CREATING BEARER FILE!!**

!!!! BRING IN ESLINT AND PRETTIER!!!!
!!DOUBLE CHECK SPELLING IS CONSISTENT!!
!!RUN TESTS!!

!! FIX THE BUGS !!
!! IMPLEMENT SECURITY MEASURES - LIKE EXPIRATION TIME ETC!!
!! MAKE SURE ALL TESTS PASS!!
////