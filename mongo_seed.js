const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");

const url = "mongodb://localhost:27017";
const dbName = "test_data";

function createAddress() {
    const state = faker.address.state();
    const zip = faker.address.zipCodeByState(state);

    let address = {
        street_1: faker.address.streetName(),
        city: faker.address.city(),
        state: state,
        zip: zip
    };
    if (Math.random() < 0.1) {
        address.street_2 = faker.address.secondaryAddress();
    }
    return address;
}

function createCustomer() {
    const name = faker.company.companyName();
    const email = faker.internet.email(faker.name.firstName(), faker.name.lastName(), faker.internet.domainName());
    let customer = {
        name: name,
        email: email
    }

    if (Math.random() < 0.1) {
        customer.phone = faker.phone.phoneNumber();
    }

    return customer;
}

MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);

    const circuitCollection = db.collection("circuits");

    let circuits = [];
    for (let i = 0; i < 10; i += 1) {
        let circuit = {
            cid: faker.random.uuid(),
            provider: faker.company.companyName(),
            customers: _.times(Math.round(Math.random() * 2 + 3), createCustomer),
        };
        if (Math.random() < 0.1) {
            circuit.a = createAddress();
            if (Math.random() < 0.1) {
                circuit.z = createAddress();
            }
        }
        circuits.push(circuit);
    }

    circuitCollection.insertMany(circuits);
    console.log("Database seeded!");
    client.close();
});
