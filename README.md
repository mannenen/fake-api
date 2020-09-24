# Fake API
Generates fake circuit data for `mannenen/circuit-db-frontend`

To run, 

1. `npm i -g json-server`
2. `npm i`
3. `node circuits.schema.js`
4. `json-server -i "cid" --routes routes.json --watch db.json`