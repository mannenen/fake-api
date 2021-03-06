"use strict";

var _require = require('json-schema-faker'),
    resolve = _require.resolve,
    extend = _require.extend;

var fs = require('fs');

extend('faker', function () {
  return require('faker');
});
var schema = {
  type: "object",
  required: ["circuits", "providers", "customers"],
  properties: {
    circuits: {
      type: "array",
      minItems: 300,
      items: {
        "$ref": "#/definitions/circuit"
      }
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
      minItems: 140,
      items: {
        $ref: "#/definitions/customer"
      }
    }
  },
  definitions: {
    circuit: {
      type: "object",
      required: ["cid", "provider"],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt"
        },
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
          items: {
            "$ref": "#/definitions/customer"
          }
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
      required: ["street_1", "city", "state", "zip"],
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
};
resolve(schema).then(function (sample) {
  console.log('Writing to db.json');
  fs.writeFile("".concat(__dirname, "/db.json"), JSON.stringify(sample), function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("done");
    }
  });
});