# omdbapi-app

A small application to add movies from [OMDB](http://www.omdbapi.com/);

# setup and development

First get an [OMDB api key](http://www.omdbapi.com/apikey.aspx).

Then, to setup the project, you can either use the `Dockerimage` or install `node`. Either way, clone the project first

```sh
git clone git@github.com:stringparser/omdbapi-app.git
cd omdbapi-app
```

and you have docker run

```sh
docker build -t omdbapi --build-arg OIMDBAPI_KEY=<your OMDBAPI_KEY>  .
docker run -p 3000:8080 -d omdbapi
```

or if you want to install `node` and run the project locally

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
exec $SHELL
nvm install 8.11.1
npm install
OIMDBAPI_KEY=<your OMDBAPI_KEY> npm run dev
```

To see the app running go to `http://localhost:3000`.
