# shURL

## _Create short url easily with QrCode_

[Powered by nDria.dev](https://ndria.dev/shurl)

Easily shorten and track links for sharing on social media, video, email, print, and more. Customize user-friendly URLs to make them more memorable, and track helps you to maximize your content’s reach and engagement.

## Features

- Shorten any type of url.
- Create shorten url QrCode.
- Create temporary shorten url (**Work in progress**)
- Track the effectiveness of your links with comprehensive analytics. (**Work in progress**)

## Try demo locally

shURL requires [Node.js](https://nodejs.org/) v18+ and [MongoDB](https://www.mongodb.com/) to run locally.

Install the dependencies in _be_ and _fe_ directory, build and start the server.

### For front-end project
```sh
cd fe
npm i
npm run build
```

### For back-end project
- create public/private key for refresh token and access token.
- generate base64 from keys.
- create in your mongodb local a collection with name _URL_SHORTNER_
- create a table _URL_ and _USER_
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
```
- Run project
```sh
npm run dev
```
- open http://localhost:3000
