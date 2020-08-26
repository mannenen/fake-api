"use strict";

var jsf = require('json-schema-faker');

jsf.extend('faker', function () {
  return require('faker');
});
var schema = {
  "type": "object",
  "required": ["cid", "provider"],
  "properties": {
    "cid": {
      "type": "string",
      "faker": "git.shortSha"
    },
    "provider": {
      "type": "string",
      "faker": "company.companyName"
    },
    "customers": {
      "type": "array",
      "items": [{
        "type": "object",
        "required": ["name"],
        "properties": {
          "name": {
            "type": "string",
            "faker": "company.companyName"
          },
          "contact": {
            "type": "object",
            "properties": {
              "phone": {
                "type": "string",
                "faker": "phone.phoneNumber"
              },
              "email": {
                "type": "string",
                "faker": "internet.email"
              }
            }
          }
        }
      }]
    },
    "a": {
      "type": "object",
      "required": ["street_1", "city", "state", "zip"],
      "properties": {
        "street_1": {
          "type": "string",
          "faker": "address.streetAddress"
        },
        "street_2": {
          "type": "string",
          "faker": "address.secondaryAddress"
        },
        "city": {
          "type": "string",
          "faker": "address.city"
        },
        "state": {
          "type": "string",
          "faker": "address.state"
        },
        "zip": {
          "type": "string",
          "faker": "address.zipCode"
        }
      }
    },
    "z": {
      "type": "object",
      "required": ["street_1", "city", "state", "zip"],
      "properties": {
        "street_1": {
          "type": "string",
          "faker": "address.streetAddress"
        },
        "street_2": {
          "type": "string",
          "faker": "address.secondaryAddress"
        },
        "city": {
          "type": "string",
          "faker": "address.city"
        },
        "state": {
          "type": "string",
          "faker": "address.state"
        },
        "zip": {
          "type": "string",
          "faker": "address.zipCode"
        }
      }
    }
  }
};
jsf.resolve(schema).then(function (result) {
  console.table(result);
});