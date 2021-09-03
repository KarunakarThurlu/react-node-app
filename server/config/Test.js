
//open api data from github
var openApiData = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Test API",
    "description": "Test API with Swagger",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Swagger API Team"
    },
    "license": {
      "name": "MIT"
    }
  },
  "host": "localhost:3000",
  "basePath": "/",
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/test": {
      "get": {
        "tags": [
          "Test"
        ],
        "summary": "Get test",
        "description": "Get test",
        "operationId": "getTest",
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Test"
            }
          },
                    "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Test not found"
          }
        }
      }
    }
  },
  "definitions": {
    "Test": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "value": {
          "type": "integer",
          "format": "int32"
        }
      }
    }
  }
};

