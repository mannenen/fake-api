const { resolve, extend } = require('json-schema-faker');
const fs = require('fs');
extend('faker', () => require('faker'));

const schema = {
    type: "object",
    required: ["circuits", "providers", "customers"],
    properties: {
        circuits: {
            type: "array",
            minItems: 300,
            items: { "$ref": "#/definitions/circuit" }
        },
        providers: {
            type: "array",
            minItems: 20,
            items: {
                type: "string",
                faker: "company.companyName"
            }
        },
        customers: {
            type: "array",
            minItems: 25,
            items: { "$ref": "#/definitions/customer" }
        }
    },
    definitions: {
        circuit: {
            type: "object",
            required: ["cid", "provider"],
            properties: {
                cid: {
                    type: "string",
                    faker: "git.shortSha"
                },
                provider: {
                    type: "string",
                    faker: "company.companyName"
                },
                customers: {
                    type: "array",
                    minItems: 0,
                    maxItems: 5,
                    items: { "$ref": "#/definitions/customer" }
                },
                a: {
                    $ref: "#/definitions/address"
                },
                z: {
                    $ref: "#/definitions/address"
                }
            }
        },
        customer: {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string",
                    faker: "company.companyName"
                },
                contact: {
                    $ref: "#/definitions/contactInfo"
                }
            }
        },
        contactInfo: {
            type: "object",
            required: ["email"],
            properties: {
                email: {
                    type: "string",
                    faker: "internet.email"
                },
                phone: {
                    type: "string",
                    faker: "phone.phoneNumber"
                }
            }
        },
        address: {
            type: "object",
            required: [ "street_1", "city", "state", "zip" ],
            properties: {
                street_1: {
                    type: "string",
                    faker: "address.streetAddress"
                },
                street_2: {
                    type: "string",
                    faker: "address.secondaryAddress"
                },
                city: {
                    type: "string",
                    faker: "address.city"
                },
                state: {
                    type: "string",
                    faker: "address.state"
                },
                zip: {
                    type: "string",
                    faker: "address.zipCode"
                }
            }
        },
        positiveInt: {
            type: 'integer',
            minimum: 0,
            exclusiveMinimum: true
        }
    }
}
resolve(schema).then(sample => {
    console.log('Writing to db.json')
    fs.writeFile(`${__dirname}/db.json`, JSON.stringify(sample), function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log("done");
        }
    });
});