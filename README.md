# shURL
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://shurl.ndria.dev)


## _Create short url easily with QrCode_

[Powered by nDria.dev](https://ndria.dev/shurl)

Easily shorten and track links for sharing on social media, video, email, print, and more. Customize user-friendly URLs to make them more memorable, and track helps you to maximize your content’s reach and engagement.

## Features

- Shorten any type of url.
- Signup with email verification link.
- Create shorten url and QrCode permanently for authenticated users.
- Create temporary shorten url.
- Track the effectiveness of your links with comprehensive analytics. (**Work in progress**)
- Cache implementation to serve original url (**Work in progress**)

## Try demo locally

shURL requires [Node.js](https://nodejs.org/) v18+ and [MongoDB](https://www.mongodb.com/) to run locally.

I used pnpm as package manager, so if you don't have it, you will need to change the run scripts in the package.json of the be and fe folders.

Steps:
- Install the dependencies in _be_ and _fe_ directory.
- go into be folder.
- create public/private key for refresh token and access token.
- generate base64 from keys.
- create in your mongodb local a collection with name _URL_SHORTNER_
- create a table _URL_ and _USER_
- setting an email provider, otherwise sign in not working
- create a .env.dev file in config dir at root project, with these options
```
NODE_ENV=development
PORT=3000
MONGO_DB_URI=<your uri>
DB=URL_SHORTNER
TABLE_URL=URL
TABLE_USER=USER
ACCESS_TOKEN_SECRET=<base64 access token secret>
REFRESH_TOKEN_KEY_PRIVATE=<base64 refresh token private key>
REFRESH_TOKEN_KEY_PUBLIC=<base64 refresh token public key>
MAIL_EMAIL_SENDER=
MAIL_CLIENT_ID=
MAIL_CLIENT_SECRET=
MAIL_OAUTH_URL=
MAIL_REFRESH_TOKEN=
```
- Run project
```sh
pnpm run start
```
- open http://localhost:3000
