# Adonis Auth Issue

## Frontend

You should just be able to do `yarn && yarn dev` from the `frontend` folder

## Backend

1.) Take a look at the `backend/.env` file and see what Postgres database and user you want to create

then you will need to run the following commands:

`yarn`

`node ace migration:run`

`yarn dev`

**Keep an eye on which ports React and Adonis are running on**