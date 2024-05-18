import {NormalizeOAS} from "fets";

export const oas = {
    "openapi": "3.0.1",
    "info": {
        "title": "Dynamic API Specification",
        "description": "This is a dynamically generated API specification for all endpoints existing on the current project.",
        "version": "14.0.2"
    },
    "servers": [{"url": "/", "description": "Your current Directus instance."}],
    "paths": {
        "/assets/{id}": {
            "get": {
                "tags": ["Assets"],
                "operationId": "getAsset",
                "summary": "Get an Asset",
                "description": "Image typed files can be dynamically resized and transformed to fit any need.",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "description": "The id of the file.",
                    "required": true,
                    "schema": {"type": "string"}
                }, {
                    "name": "key",
                    "in": "query",
                    "description": "The key of the asset size configured in settings.",
                    "schema": {"type": "string"}
                }, {
                    "name": "transforms",
                    "in": "query",
                    "description": "A JSON array of image transformations",
                    "schema": {"type": "string"}
                }, {
                    "name": "download",
                    "in": "query",
                    "description": "Download the asset to your computer",
                    "schema": {"type": "boolean"}
                }],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {"text/plain": {"schema": {"type": "string"}}}
                    }, "404": {"$ref": "#/components/responses/NotFoundError"}
                }
            }
        },
        "/auth/login": {
            "post": {
                "summary": "Retrieve a Temporary Access Token",
                "description": "Retrieve a Temporary Access Token",
                "tags": ["Authentication"],
                "operationId": "login",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["email", "password"],
                                "properties": {
                                    "email": {
                                        "type": "string",
                                        "example": "admin@example.com",
                                        "description": "Email address of the user you're retrieving the access token for."
                                    },
                                    "password": {
                                        "type": "string",
                                        "description": "Password of the user.",
                                        "format": "password",
                                        "example": "password"
                                    },
                                    "mode": {
                                        "type": "string",
                                        "enum": ["json", "cookie"],
                                        "default": "json",
                                        "description": "Choose between retrieving the token as a string, or setting it as a cookie."
                                    },
                                    "otp": {
                                        "type": "string",
                                        "description": "If 2FA is enabled, you need to pass the one time password."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful authentification",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "access_token": {
                                                    "type": "string",
                                                    "example": "eyJhbGciOiJI..."
                                                },
                                                "expires": {"type": "integer", "example": 900},
                                                "refresh_token": {"type": "string", "example": "yuOJkjdPXMd..."}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/refresh": {
            "post": {
                "summary": "Refresh Token",
                "description": "Refresh a Temporary Access Token.",
                "tags": ["Authentication"],
                "operationId": "refresh",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["token"],
                                "properties": {
                                    "refresh_token": {
                                        "type": "string",
                                        "example": "eyJ0eXAiOiJKV...",
                                        "description": "JWT access token you want to refresh. This token can't be expired."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "access_token": {
                                                    "type": "string",
                                                    "example": "eyJhbGciOiJI..."
                                                },
                                                "expires": {"type": "integer", "example": 900},
                                                "refresh_token": {"type": "string", "example": "Gy-caJMpmGTA..."}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/auth/logout": {
            "post": {
                "summary": "Log Out",
                "description": "Log Out",
                "tags": ["Authentication"],
                "operationId": "logout",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["token"],
                                "properties": {
                                    "refresh_token": {
                                        "type": "string",
                                        "example": "eyJ0eXAiOiJKV...",
                                        "description": "JWT access token you want to logout."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {"200": {"description": "Request successful"}}
            }
        },
        "/auth/password/request": {
            "post": {
                "tags": ["Authentication"],
                "operationId": "passwordRequest",
                "summary": "Request a Password Reset",
                "description": "Request a reset password email to be send.",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["email"],
                                "properties": {
                                    "email": {
                                        "type": "string",
                                        "example": "admin@example.com",
                                        "description": "Email address of the user you're requesting a reset for."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {"401": {"$ref": "#/components/responses/UnauthorizedError"}}
            }
        },
        "/auth/password/reset": {
            "post": {
                "tags": ["Authentication"],
                "operationId": "passwordReset",
                "summary": "Reset a Password",
                "description": "The request a password reset endpoint sends an email with a link to the admin app which in turn uses this endpoint to allow the user to reset their password.",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["token", "password"],
                                "properties": {
                                    "token": {
                                        "type": "string",
                                        "example": "eyJ0eXAiOiJKV1Qi...",
                                        "description": "One-time use JWT token that is used to verify the user."
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "password",
                                        "format": "password",
                                        "description": "New password for the user."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {"401": {"$ref": "#/components/responses/UnauthorizedError"}}
            }
        },
        "/auth/oauth": {
            "get": {
                "tags": ["Authentication"],
                "operationId": "oauth",
                "summary": "List OAuth Providers",
                "description": "List configured OAuth providers.",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "public": {"type": "boolean"},
                                        "data": {
                                            "type": "array",
                                            "example": ["github", "facebook"],
                                            "items": {"type": "string"}
                                        }
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/auth/oauth/{provider}": {
            "get": {
                "summary": "Authenticated using an OAuth provider",
                "description": "Start OAuth flow using the specified provider",
                "tags": ["Authentication"],
                "operationId": "oauthProvider",
                "parameters": [{
                    "name": "provider",
                    "in": "path",
                    "description": "Key of the activated OAuth provider.",
                    "required": true,
                    "schema": {"type": "string"}
                }, {
                    "name": "redirect",
                    "in": "query",
                    "required": false,
                    "description": "Where to redirect on successful login.<br/>If set the authentication details are set inside cookies otherwise a JSON is returned.",
                    "schema": {"type": "string"}
                }],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "public": {"type": "boolean"},
                                        "data": {"type": "object", "properties": {"token": {"type": "string"}}}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/extensions/interfaces": {
            "get": {
                "summary": "List Interfaces",
                "description": "List all installed custom interfaces.",
                "operationId": "getInterfaces",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"type": "array", "items": {"type": "object"}}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Extensions"]
            }
        },
        "/extensions/layouts": {
            "get": {
                "summary": "List Layouts",
                "description": "List all installed custom layouts.",
                "operationId": "getLayouts",
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"type": "array", "items": {"type": "object"}}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Extensions"]
            }
        },
        "/extensions/displays": {
            "get": {
                "summary": "List Displays",
                "description": "List all installed custom displays.",
                "operationId": "getDisplays",
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"type": "array", "items": {"type": "object"}}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Extensions"]
            }
        },
        "/extensions/modules": {
            "get": {
                "summary": "List Modules",
                "description": "List all installed custom modules.",
                "operationId": "getModules",
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"type": "array", "items": {"type": "object"}}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Extensions"]
            }
        },
        "/schema/snapshot": {
            "get": {
                "summary": "Retrieve Schema Snapshot",
                "description": "Retrieve the current schema. This endpoint is only available to admin users.",
                "operationId": "schemaSnapshot",
                "parameters": [{"$ref": "#/components/parameters/Export"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Schema"}}
                                }
                            }, "text/yaml": {"schema": {"type": "string", "format": "binary"}}
                        }
                    }, "403": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "tags": ["Schema"]
            }
        },
        "/schema/apply": {
            "post": {
                "summary": "Apply Schema Difference",
                "description": "Update the instance's schema by passing the diff previously retrieved via `/schema/diff` endpoint in the JSON request body or a JSON/YAML file. This endpoint is only available to admin users.",
                "operationId": "schemaApply",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {"data": {"$ref": "#/components/schemas/Diff"}}
                            }
                        },
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {"file": {"type": "string", "format": "binary"}}
                            }
                        }
                    }
                },
                "responses": {
                    "204": {"description": "Successful request"},
                    "403": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "tags": ["Schema"]
            }
        },
        "/schema/diff": {
            "post": {
                "summary": "Retrieve Schema Difference",
                "description": "Compare the current instance's schema against the schema snapshot in JSON request body or a JSON/YAML file and retrieve the difference. This endpoint is only available to admin users.",
                "operationId": "schemaDiff",
                "parameters": [{
                    "name": "force",
                    "description": "Bypass version and database vendor restrictions.",
                    "in": "query",
                    "required": false,
                    "schema": {"type": "boolean"}
                }],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {"data": {"$ref": "#/components/schemas/Schema"}}
                            }
                        },
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {"file": {"type": "string", "format": "binary"}}
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Diff"}}
                                }
                            }
                        }
                    },
                    "204": {"description": "No schema difference."},
                    "403": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "tags": ["Schema"]
            }
        },
        "/server/info": {
            "get": {
                "summary": "System Info",
                "description": "Perform a system status check and return the options.",
                "operationId": "serverInfo",
                "parameters": [{
                    "description": "The first time you create a project, the provided token will be saved and required for subsequent project installs. It can also be found and configured in `/config/__api.json` on your server.",
                    "in": "query",
                    "name": "super_admin_token",
                    "required": true,
                    "schema": {"type": "integer"}
                }],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {"data": {"type": "object"}},
                                    "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Server"]
            }
        },
        "/server/ping": {
            "get": {
                "summary": "Ping",
                "description": "Ping, pong. Ping.. pong.",
                "operationId": "ping",
                "responses": {
                    "200": {
                        "content": {
                            "application/text": {
                                "schema": {
                                    "type": "string",
                                    "pattern": "pong",
                                    "example": "pong"
                                }
                            }
                        }, "description": "Successful request"
                    }
                },
                "tags": ["Server"]
            }
        },
        "/utils/hash/generate": {
            "post": {
                "summary": "Hash a string",
                "description": "Generate a hash for a given string.",
                "operationId": "hash-generate",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "string": {
                                        "description": "String to hash.",
                                        "type": "string"
                                    }
                                }, "required": ["string"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {
                                        "data": {
                                            "type": "string",
                                            "example": "$argon2i$v=19$m=4096,t=3,p=1$pOyIa/zmRAjCVLb2f7kOyg$DasoO6LzMM+6iKfzCDq6JbsYsZWLSm33p7i9NxL9mDc"
                                        }
                                    }, "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    }
                },
                "tags": ["Utilities"]
            }
        },
        "/utils/hash/verify": {
            "post": {
                "summary": "Hash a string",
                "description": "Generate a hash for a given string.",
                "operationId": "hash-verify",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "string": {
                                        "description": "String to hash.",
                                        "type": "string"
                                    }, "hash": {"description": "Hash you want to verify against.", "type": "string"}
                                }, "required": ["string", "hash"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {
                                        "data": {
                                            "type": "boolean",
                                            "example": true
                                        }
                                    }, "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    }
                },
                "tags": ["Utilities"]
            }
        },
        "/utils/sort/{collection}": {
            "post": {
                "summary": "Sort Items",
                "description": "Re-sort items in collection based on start and to value of item",
                "operationId": "sort",
                "parameters": [{
                    "description": "Collection identifier",
                    "in": "path",
                    "name": "collection",
                    "required": true,
                    "schema": {"type": "string"}
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "item": {
                                        "description": "Primary key of item to move",
                                        "type": "number"
                                    },
                                    "to": {
                                        "description": "Primary key of item where to move the current item to",
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {"200": {"description": "Successful request"}},
                "tags": ["Utilities"]
            }
        },
        "/utils/import/{collection}": {
            "post": {
                "summary": "Import Items",
                "description": "Import multiple records from a JSON or CSV file into a collection.",
                "operationId": "import",
                "parameters": [{
                    "description": "Collection identifier",
                    "in": "path",
                    "name": "collection",
                    "required": true,
                    "schema": {"type": "string"}
                }],
                "requestBody": {
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {"file": {"type": "string", "format": "binary"}}
                            }
                        }
                    }
                },
                "responses": {"200": {"description": "Successful request"}},
                "tags": ["Utilities"]
            }
        },
        "/utils/export/{collection}": {
            "post": {
                "summary": "Export Items",
                "description": "Export a larger data set to a file in the File Library",
                "operationId": "export",
                "parameters": [{
                    "description": "Collection identifier",
                    "in": "path",
                    "name": "collection",
                    "required": true,
                    "schema": {"type": "string"}
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "format": {
                                        "description": "What file format to save the export to. One of csv, xml, json",
                                        "type": "string",
                                        "enum": ["csv", "xml", "json"]
                                    },
                                    "query": {"$ref": "#/components/schemas/Query"},
                                    "file": {"$ref": "#/components/schemas/Files"}
                                }, "required": ["format", "query", "file"]
                            }
                        }
                    }
                },
                "responses": {"200": {"description": "Successful request"}},
                "tags": ["Utilities"]
            }
        },
        "/utils/cache/clear": {
            "post": {
                "summary": "Clear Cache",
                "description": "Resets both the data and schema cache of Directus.",
                "operationId": "clear-cache",
                "responses": {"200": {"description": "Successful request"}},
                "tags": ["Utilities"]
            }
        },
        "/utils/random/string": {
            "get": {
                "summary": "Get a Random String",
                "description": "Returns a random string of given length.",
                "operationId": "random",
                "parameters": [{
                    "description": "Length of the random string.",
                    "in": "query",
                    "name": "length",
                    "required": false,
                    "schema": {"type": "integer"}
                }],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {
                                        "data": {
                                            "type": "string",
                                            "example": "1>M3+4oh.S"
                                        }
                                    }, "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    }
                },
                "tags": ["Utilities"]
            }
        },
        "/items/versions": {
            "post": {
                "summary": "Create an Item",
                "description": "Create a new versions item.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "createItemsVersions",
                "parameters": [{"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "oneOf": [{
                                    "type": "array",
                                    "items": {"$ref": "#/components/schemas/ItemsVersions"}
                                }, {"$ref": "#/components/schemas/ItemsVersions"}]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"items": {"$ref": "#/components/schemas/ItemsVersions"}}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "get": {
                "summary": "List Items",
                "description": "List the versions items.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "readItemsVersions",
                "security": [{"Auth": []}],
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"type": "object", "$ref": "#/components/schemas/ItemsVersions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "patch": {
                "summary": "Update Multiple Items",
                "description": "Update multiple versions items at the same time.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "updateItemsVersions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "oneOf": [{
                                    "type": "array",
                                    "items": {"$ref": "#/components/schemas/ItemsVersions"}
                                }, {"$ref": "#/components/schemas/ItemsVersions"}]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {"application/json": {"schema": {"properties": {"data": {"items": {"$ref": "#/components/schemas/ItemsVersions"}}}}}}
                    }
                }
            },
            "delete": {
                "summary": "Delete Multiple Items",
                "description": "Delete multiple existing versions items.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "deleteItemsVersions",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "parameters": []
            }
        },
        "/items/versions/{id}": {
            "get": {
                "summary": "Retrieve an Item",
                "description": "Retrieve a single versions item by unique identifier.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "readSingleItemsVersions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Version"}, {
                    "name": "id",
                    "description": "Index of the item.",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "oneOf": [{
                            "type": "integer",
                            "description": "Incremental index of the item.",
                            "example": 1
                        }, {
                            "type": "string",
                            "description": "Unique identifier of the item.",
                            "example": "8cbb43fe-4cdf-4991-8352-c461779cec02"
                        }]
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "$ref": "#/components/schemas/ItemsVersions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                }
            },
            "patch": {
                "summary": "Update an Item",
                "description": "Update an existing versions item.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "updateSingleItemsVersions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}, {
                    "name": "id",
                    "description": "Index of the item.",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "oneOf": [{
                            "type": "integer",
                            "description": "Incremental index of the item.",
                            "example": 1
                        }, {
                            "type": "string",
                            "description": "Unique identifier of the item.",
                            "example": "8cbb43fe-4cdf-4991-8352-c461779cec02"
                        }]
                    }
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/ItemsVersions"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "object",
                                            "$ref": "#/components/schemas/ItemsVersions"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                }
            },
            "delete": {
                "summary": "Delete an Item",
                "description": "Delete an existing versions item.",
                "tags": ["Items", "ItemsVersions"],
                "operationId": "deleteSingleItemsVersions",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "parameters": [{
                    "name": "id",
                    "description": "Index of the item.",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "oneOf": [{
                            "type": "integer",
                            "description": "Incremental index of the item.",
                            "example": 1
                        }, {
                            "type": "string",
                            "description": "Unique identifier of the item.",
                            "example": "8cbb43fe-4cdf-4991-8352-c461779cec02"
                        }]
                    }
                }]
            }
        },
        "/activity": {
            "get": {
                "operationId": "getActivities",
                "summary": "List Activity Actions",
                "description": "Returns a list of activity actions.",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Activity"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Activity"]
            }
        },
        "/activity/comment": {
            "post": {
                "summary": "Create a Comment",
                "description": "Creates a new comment.",
                "operationId": "createComment",
                "parameters": [{"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "required": ["collection", "item", "comment"],
                                "properties": {
                                    "collection": {"type": "string", "example": "projects"},
                                    "item": {"type": "integer", "example": 1},
                                    "comment": {"type": "string", "example": "A new comment"}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Activity"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Activity"]
            }
        },
        "/activity/{id}": {
            "get": {
                "summary": "Retrieve an Activity Action",
                "description": "Retrieves the details of an existing activity action. Provide the primary key of the activity action and Directus will return the corresponding information.",
                "operationId": "getActivity",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Activity"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Activity"]
            }
        },
        "/activity/comment/{id}": {
            "patch": {
                "summary": "Update a Comment",
                "description": "Update the content of an existing comment.",
                "operationId": "updateComment",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {"comment": {"type": "string", "example": "My updated comment"}}
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Activity"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Activity"]
            },
            "delete": {
                "summary": "Delete a Comment",
                "description": "Delete an existing comment. Deleted comments can not be retrieved.",
                "operationId": "deleteComment",
                "parameters": [{"$ref": "#/components/parameters/Id"}],
                "responses": {
                    "203": {"description": "Deleted successfully"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Activity"]
            }
        },
        "/collections": {
            "get": {
                "summary": "List Collections",
                "description": "Returns a list of the collections available in the project.",
                "operationId": "getCollections",
                "parameters": [{"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Collections"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Collections"]
            }, "post": {
                "summary": "Create a Collection",
                "description": "Create a new collection in Directus.",
                "operationId": "createCollection",
                "parameters": [{"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "required": ["collection", "fields"], "properties": {
                                    "collection": {
                                        "type": "string",
                                        "description": "Unique name of the collection.",
                                        "example": "my_collection"
                                    },
                                    "fields": {
                                        "type": "array",
                                        "description": "The fields contained in this collection. See the fields reference for more information. Each individual field requires field, type, and interface to be provided.",
                                        "items": {"type": "object"}
                                    },
                                    "icon": {
                                        "description": "Name of a Google Material Design Icon that's assigned to this collection.",
                                        "type": "string",
                                        "example": "people",
                                        "nullable": true
                                    },
                                    "note": {
                                        "description": "A note describing the collection.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "display_template": {
                                        "description": "Text representation of how items from this collection are shown across the system.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "hidden": {
                                        "description": "Whether or not the collection is hidden from the navigation in the admin app.",
                                        "type": "boolean",
                                        "example": false
                                    },
                                    "singleton": {
                                        "description": "Whether or not the collection is treated as a single object.",
                                        "type": "boolean",
                                        "example": false
                                    },
                                    "translation": {
                                        "description": "Key value pairs of how to show this collection's name in different languages in the admin app.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "versioning": {
                                        "description": "Whether or not Content Versioning is enabled for this collection.",
                                        "type": "boolean",
                                        "example": false
                                    },
                                    "archive_field": {
                                        "description": "What field holds the archive value.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "archive_app_filter": {
                                        "description": "What value to use for \"archived\" items.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "archive_value": {
                                        "description": "What value to use to \"unarchive\" items.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "unarchive_value": {
                                        "description": "Whether or not to show the \"archived\" filter.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    },
                                    "sort_field": {
                                        "description": "The sort field in the collection.",
                                        "type": "string",
                                        "example": null,
                                        "nullable": true
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Collections"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Collections"]
            }
        },
        "/collections/{id}": {
            "get": {
                "summary": "Retrieve a Collection",
                "description": "Retrieves the details of a single collection.",
                "operationId": "getCollection",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the collection.",
                    "schema": {"type": "string"}
                }, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Collections"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Collections"]
            },
            "patch": {
                "summary": "Update a Collection",
                "description": "Update an existing collection.",
                "operationId": "updateCollection",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the collection.",
                    "schema": {"type": "string"}
                }, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "properties": {
                                    "meta": {
                                        "description": "Metadata of the collection.", "type": "object", "properties": {
                                            "icon": {
                                                "description": "Name of a Google Material Design Icon that's assigned to this collection.",
                                                "type": "string",
                                                "example": "people",
                                                "nullable": true
                                            },
                                            "color": {
                                                "description": "Choose the color for the icon assigned to this collection.",
                                                "type": "string",
                                                "example": "#6644ff",
                                                "nullable": true
                                            },
                                            "note": {
                                                "description": "A note describing the collection.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "display_template": {
                                                "description": "Text representation of how items from this collection are shown across the system.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "hidden": {
                                                "description": "Whether or not the collection is hidden from the navigation in the admin app.",
                                                "type": "boolean",
                                                "example": false
                                            },
                                            "singleton": {
                                                "description": "Whether or not the collection is treated as a single object.",
                                                "type": "boolean",
                                                "example": false
                                            },
                                            "translation": {
                                                "description": "Key value pairs of how to show this collection's name in different languages in the admin app.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "versioning": {
                                                "description": "Whether or not Content Versioning is enabled for this collection.",
                                                "type": "boolean",
                                                "example": false
                                            },
                                            "archive_field": {
                                                "description": "What field holds the archive value.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "archive_app_filter": {
                                                "description": "What value to use for \"archived\" items.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "archive_value": {
                                                "description": "What value to use to \"unarchive\" items.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "unarchive_value": {
                                                "description": "Whether or not to show the \"archived\" filter.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            },
                                            "sort_field": {
                                                "description": "The sort field in the collection.",
                                                "type": "string",
                                                "example": null,
                                                "nullable": true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Collections"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Collections"]
            },
            "delete": {
                "summary": "Delete a Collection",
                "description": "Delete an existing collection. Warning: This will delete the whole collection, including the items within. Proceed with caution.",
                "operationId": "deleteCollection",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Collections"],
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Unique identifier of the collection.",
                    "schema": {"type": "string"}
                }]
            }
        },
        "/fields": {
            "get": {
                "summary": "List All Fields",
                "description": "Returns a list of the fields available in the project.",
                "operationId": "getFields",
                "parameters": [{"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Sort"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Fields"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"]
            }
        },
        "/fields/{collection}": {
            "get": {
                "summary": "List Fields in Collection",
                "description": "Returns a list of the fields available in the given collection.",
                "operationId": "getCollectionFields",
                "parameters": [{
                    "description": "Unique identifier of the collection the item resides in.",
                    "in": "path",
                    "name": "collection",
                    "required": true,
                    "schema": {"type": "string"}
                }, {"$ref": "#/components/parameters/Sort"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Fields"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"]
            }, "post": {
                "summary": "Create Field in Collection",
                "description": "Create a new field in a given collection.",
                "operationId": "createField",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": ["field", "datatype", "type", "length"], "type": "object", "properties": {
                                    "field": {
                                        "description": "Unique name of the field. Field name is unique within the collection.",
                                        "example": "id",
                                        "type": "string"
                                    },
                                    "type": {
                                        "description": "Directus specific data type. Used to cast values in the API.",
                                        "example": "integer",
                                        "type": "string"
                                    },
                                    "schema": {
                                        "description": "The schema info.", "type": "object", "properties": {
                                            "name": {
                                                "description": "The name of the field.",
                                                "example": "title",
                                                "type": "string"
                                            },
                                            "table": {
                                                "description": "The collection of the field.",
                                                "example": "posts",
                                                "type": "string"
                                            },
                                            "type": {
                                                "description": "The type of the field.",
                                                "example": "string",
                                                "type": "string"
                                            },
                                            "default_value": {
                                                "description": "The default value of the field.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "max_length": {
                                                "description": "The max length of the field.",
                                                "example": null,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "is_nullable": {
                                                "description": "If the field is nullable.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "is_primary_key": {
                                                "description": "If the field is primary key.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "has_auto_increment": {
                                                "description": "If the field has auto increment.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "foreign_key_column": {
                                                "description": "Related column from the foreign key constraint.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "foreign_key_table": {
                                                "description": "Related table from the foreign key constraint.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "comment": {
                                                "description": "Comment as saved in the database.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "schema": {
                                                "description": "Database schema (pg only).",
                                                "example": "public",
                                                "type": "string"
                                            },
                                            "foreign_key_schema": {
                                                "description": "Related schema from the foreign key constraint (pg only).",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            }
                                        }
                                    },
                                    "meta": {
                                        "description": "The meta info.",
                                        "type": "object",
                                        "nullable": true,
                                        "properties": {
                                            "id": {
                                                "description": "Unique identifier for the field in the `directus_fields` collection.",
                                                "example": 3,
                                                "type": "integer"
                                            },
                                            "collection": {
                                                "description": "Unique name of the collection this field is in.",
                                                "example": "posts",
                                                "type": "string"
                                            },
                                            "field": {
                                                "description": "Unique name of the field. Field name is unique within the collection.",
                                                "example": "title",
                                                "type": "string"
                                            },
                                            "special": {
                                                "description": "Transformation flag for field",
                                                "example": null,
                                                "type": "array",
                                                "items": {"type": "string"},
                                                "nullable": true
                                            },
                                            "system-interface": {
                                                "description": "What interface is used in the admin app to edit the value for this field.",
                                                "example": "primary-key",
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "options": {
                                                "description": "Options for the interface that's used. This format is based on the individual interface.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "display": {
                                                "description": "What display is used in the admin app to display the value for this field.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "display_options": {
                                                "description": "Options for the display that's used. This format is based on the individual display.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "locked": {
                                                "description": "If the field can be altered by the end user. Directus system fields have this value set to `true`.",
                                                "example": true,
                                                "type": "boolean"
                                            },
                                            "readonly": {
                                                "description": "Prevents the user from editing the value in the field.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "hidden": {
                                                "description": "If this field should be hidden.",
                                                "example": true,
                                                "type": "boolean"
                                            },
                                            "sort": {
                                                "description": "Sort order of this field on the edit page of the admin app.",
                                                "example": 1,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "width": {
                                                "description": "Width of the field on the edit form.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true,
                                                "enum": ["half", "half-left", "half-right", "full", "fill", null]
                                            },
                                            "group": {
                                                "description": "What field group this field is part of.",
                                                "example": null,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "translation": {
                                                "description": "Key value pair of `<language>: <translation>` that allows the user to change the displayed name of the field in the admin app.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "note": {
                                                "description": "A user provided note for the field. Will be rendered alongside the interface on the edit page.",
                                                "example": "",
                                                "type": "string",
                                                "nullable": true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Fields"}}
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"],
                "parameters": [{
                    "description": "Unique identifier of the collection the item resides in.",
                    "in": "path",
                    "name": "collection",
                    "required": true,
                    "schema": {"type": "string"}
                }]
            }
        },
        "/fields/{collection}/{id}": {
            "get": {
                "summary": "Retrieve a Field",
                "description": "Retrieves the details of a single field in a given collection.",
                "operationId": "getCollectionField",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Fields"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"],
                "parameters": [{
                    "name": "collection",
                    "in": "path",
                    "description": "Unique identifier of the collection the item resides in.",
                    "schema": {"type": "string"},
                    "required": true
                }, {
                    "name": "id",
                    "in": "path",
                    "description": "Unique identifier of the field.",
                    "schema": {"type": "string"},
                    "required": true
                }]
            },
            "patch": {
                "summary": "Update a Field",
                "description": "Update an existing field.",
                "operationId": "updateField",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "properties": {
                                    "field": {
                                        "description": "Unique name of the field. Field name is unique within the collection.",
                                        "example": "id",
                                        "type": "string"
                                    },
                                    "type": {
                                        "description": "Directus specific data type. Used to cast values in the API.",
                                        "example": "integer",
                                        "type": "string"
                                    },
                                    "schema": {
                                        "description": "The schema info.", "type": "object", "properties": {
                                            "name": {
                                                "description": "The name of the field.",
                                                "example": "title",
                                                "type": "string"
                                            },
                                            "table": {
                                                "description": "The collection of the field.",
                                                "example": "posts",
                                                "type": "string"
                                            },
                                            "type": {
                                                "description": "The type of the field.",
                                                "example": "string",
                                                "type": "string"
                                            },
                                            "default_value": {
                                                "description": "The default value of the field.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "max_length": {
                                                "description": "The max length of the field.",
                                                "example": null,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "is_nullable": {
                                                "description": "If the field is nullable.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "is_primary_key": {
                                                "description": "If the field is primary key.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "has_auto_increment": {
                                                "description": "If the field has auto increment.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "foreign_key_column": {
                                                "description": "Related column from the foreign key constraint.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "foreign_key_table": {
                                                "description": "Related table from the foreign key constraint.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "comment": {
                                                "description": "Comment as saved in the database.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "schema": {
                                                "description": "Database schema (pg only).",
                                                "example": "public",
                                                "type": "string"
                                            },
                                            "foreign_key_schema": {
                                                "description": "Related schema from the foreign key constraint (pg only).",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            }
                                        }
                                    },
                                    "meta": {
                                        "description": "The meta info.",
                                        "type": "object",
                                        "nullable": true,
                                        "properties": {
                                            "id": {
                                                "description": "Unique identifier for the field in the `directus_fields` collection.",
                                                "example": 3,
                                                "type": "integer"
                                            },
                                            "collection": {
                                                "description": "Unique name of the collection this field is in.",
                                                "example": "posts",
                                                "type": "string"
                                            },
                                            "field": {
                                                "description": "Unique name of the field. Field name is unique within the collection.",
                                                "example": "title",
                                                "type": "string"
                                            },
                                            "special": {
                                                "description": "Transformation flag for field",
                                                "example": null,
                                                "type": "array",
                                                "items": {"type": "string"},
                                                "nullable": true
                                            },
                                            "system-interface": {
                                                "description": "What interface is used in the admin app to edit the value for this field.",
                                                "example": "primary-key",
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "options": {
                                                "description": "Options for the interface that's used. This format is based on the individual interface.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "display": {
                                                "description": "What display is used in the admin app to display the value for this field.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true
                                            },
                                            "display_options": {
                                                "description": "Options for the display that's used. This format is based on the individual display.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "locked": {
                                                "description": "If the field can be altered by the end user. Directus system fields have this value set to `true`.",
                                                "example": true,
                                                "type": "boolean"
                                            },
                                            "readonly": {
                                                "description": "Prevents the user from editing the value in the field.",
                                                "example": false,
                                                "type": "boolean"
                                            },
                                            "hidden": {
                                                "description": "If this field should be hidden.",
                                                "example": true,
                                                "type": "boolean"
                                            },
                                            "sort": {
                                                "description": "Sort order of this field on the edit page of the admin app.",
                                                "example": 1,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "width": {
                                                "description": "Width of the field on the edit form.",
                                                "example": null,
                                                "type": "string",
                                                "nullable": true,
                                                "enum": ["half", "half-left", "half-right", "full", "fill", null]
                                            },
                                            "group": {
                                                "description": "What field group this field is part of.",
                                                "example": null,
                                                "type": "integer",
                                                "nullable": true
                                            },
                                            "translation": {
                                                "description": "Key value pair of `<language>: <translation>` that allows the user to change the displayed name of the field in the admin app.",
                                                "example": null,
                                                "type": "object",
                                                "nullable": true
                                            },
                                            "note": {
                                                "description": "A user provided note for the field. Will be rendered alongside the interface on the edit page.",
                                                "example": "",
                                                "type": "string",
                                                "nullable": true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Fields"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"],
                "parameters": [{
                    "name": "collection",
                    "in": "path",
                    "description": "Unique identifier of the collection the item resides in.",
                    "schema": {"type": "string"},
                    "required": true
                }, {
                    "name": "id",
                    "in": "path",
                    "description": "Unique identifier of the field.",
                    "schema": {"type": "string"},
                    "required": true
                }]
            },
            "delete": {
                "summary": "Delete a Field",
                "description": "Delete an existing field.",
                "operationId": "deleteField",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Fields"],
                "parameters": [{
                    "name": "collection",
                    "in": "path",
                    "description": "Unique identifier of the collection the item resides in.",
                    "schema": {"type": "string"},
                    "required": true
                }, {
                    "name": "id",
                    "in": "path",
                    "description": "Unique identifier of the field.",
                    "schema": {"type": "string"},
                    "required": true
                }]
            }
        },
        "/files": {
            "get": {
                "summary": "List Files",
                "description": "List the files.",
                "tags": ["Files"],
                "operationId": "getFiles",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Files"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "post": {
                "summary": "Create a File",
                "description": "Create a new file",
                "tags": ["Files"],
                "operationId": "createFile",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {"data": {"type": "string"}}
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Files"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "patch": {
                "summary": "Update Multiple Files",
                "description": "Update multiple files at the same time.",
                "tags": ["Files"],
                "operationId": "updateFiles",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {"type": "object", "properties": {"data": {"type": "string"}}},
                                    "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Files"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Files",
                "description": "Delete multiple existing files.",
                "tags": ["Files"],
                "operationId": "deleteFiles",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/files/{id}": {
            "get": {
                "summary": "Retrieve a Files",
                "description": "Retrieve a single file by unique identifier.",
                "tags": ["Files"],
                "operationId": "getFile",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Files"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "patch": {
                "summary": "Update a File",
                "description": "Update an existing file, and/or replace it's file contents.",
                "tags": ["Files"],
                "operationId": "updateFile",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "multipart/data": {
                            "schema": {
                                "type": "object",
                                "required": ["file"],
                                "properties": {
                                    "title": {
                                        "description": "Title for the file. Is extracted from the filename on upload, but can be edited by the user.",
                                        "example": "User Avatar",
                                        "type": "string"
                                    },
                                    "filename_download": {
                                        "description": "Preferred filename when file is downloaded.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "description": "Description for the file.",
                                        "type": "string",
                                        "nullable": true
                                    },
                                    "folder": {
                                        "description": "Virtual folder where this file resides in.",
                                        "example": null,
                                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Folders"}],
                                        "nullable": true
                                    },
                                    "tags": {
                                        "description": "Tags for the file. Is automatically populated based on EXIF data for images.",
                                        "type": "array",
                                        "nullable": true,
                                        "items": {"type": "string"}
                                    },
                                    "file": {"description": "File contents.", "format": "binary"}
                                }
                            }
                        },
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "description": "Title for the file. Is extracted from the filename on upload, but can be edited by the user.",
                                        "example": "User Avatar",
                                        "type": "string"
                                    },
                                    "filename_download": {
                                        "description": "Preferred filename when file is downloaded.",
                                        "type": "string"
                                    },
                                    "description": {
                                        "description": "Description for the file.",
                                        "type": "string",
                                        "nullable": true
                                    },
                                    "folder": {
                                        "description": "Virtual folder where this file resides in.",
                                        "example": null,
                                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Folders"}],
                                        "nullable": true
                                    },
                                    "tags": {
                                        "description": "Tags for the file. Is automatically populated based on EXIF data for images.",
                                        "type": "array",
                                        "nullable": true,
                                        "items": {"type": "string"}
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Files"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete a File",
                "description": "Delete an existing file.",
                "tags": ["Files"],
                "operationId": "deleteFile",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/folders": {
            "get": {
                "summary": "List Folders",
                "description": "List the folders.",
                "operationId": "getFolders",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Folders"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Folders"]
            },
            "post": {
                "summary": "Create a Folder",
                "description": "Create a new folder.",
                "operationId": "createFolder",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "example": "Amsterdam",
                                        "description": "Name of the folder."
                                    },
                                    "parent": {
                                        "description": "Unique identifier of the parent folder. This allows for nested folders.",
                                        "type": "integer"
                                    }
                                },
                                "required": ["name"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Folders"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Folders"]
            },
            "patch": {
                "summary": "Update Multiple Folders",
                "description": "Update multiple folders at the same time.",
                "tags": ["Folders"],
                "operationId": "updateFolders",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "example": "Amsterdam",
                                                "description": "Name of the folder."
                                            },
                                            "parent": {
                                                "description": "Unique identifier of the parent folder. This allows for nested folders.",
                                                "type": "integer"
                                            }
                                        },
                                        "required": ["name"]
                                    }, "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Folders"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Folders",
                "description": "Delete multiple existing folders.",
                "tags": ["Folders"],
                "operationId": "deleteFolders",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/folders/{id}": {
            "get": {
                "summary": "Retrieve a Folder",
                "description": "Retrieve a single folder by unique identifier.",
                "operationId": "getFolder",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Folders"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Folders"]
            },
            "patch": {
                "summary": "Update a Folder",
                "description": "Update an existing folder",
                "operationId": "updateFolder",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Name of the folder. Can't be null or empty."
                                    },
                                    "parent": {
                                        "type": "integer",
                                        "example": 3,
                                        "description": "Unique identifier of the parent folder. This allows for nested folders."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Folders"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Folders"]
            },
            "delete": {
                "summary": "Delete a Folder",
                "description": "Delete an existing folder",
                "operationId": "deleteFolder",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Folders"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/permissions": {
            "get": {
                "summary": "List Permissions",
                "description": "List all permissions.",
                "operationId": "getPermissions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Page"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Permissions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"]
            },
            "post": {
                "summary": "Create a Permission",
                "description": "Create a new permission.",
                "operationId": "createPermission",
                "parameters": [{"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "collection": {
                                        "description": "What collection this permission applies to.",
                                        "type": "string",
                                        "example": "customers"
                                    },
                                    "comment": {
                                        "description": "If the user can post comments.",
                                        "type": "string",
                                        "enum": ["none", "create", "update", "full"]
                                    },
                                    "create": {
                                        "description": "If the user can create items.",
                                        "type": "string",
                                        "enum": ["none", "full"]
                                    },
                                    "delete": {
                                        "description": "If the user can update items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "explain": {
                                        "description": "If the user is required to leave a comment explaining what was changed.",
                                        "type": "string",
                                        "enum": ["none", "create", "update", "always"]
                                    },
                                    "read": {
                                        "description": "If the user can read items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "role": {
                                        "description": "Unique identifier of the role this permission applies to.",
                                        "type": "integer",
                                        "example": 3
                                    },
                                    "read_field_blacklist": {
                                        "description": "Explicitly denies read access for specific fields.",
                                        "type": "array",
                                        "items": {"type": "string"},
                                        "example": ["featured_image"]
                                    },
                                    "status": {
                                        "description": "What status this permission applies to.",
                                        "type": "string"
                                    },
                                    "status_blacklist": {
                                        "description": "Explicitly denies specific statuses to be used.",
                                        "type": "array",
                                        "items": {"type": "string"}
                                    },
                                    "update": {
                                        "description": "If the user can update items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "write_field_blacklist": {
                                        "description": "Explicitly denies write access for specific fields.",
                                        "type": "array",
                                        "items": {"type": "string"}
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Permissions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"]
            },
            "patch": {
                "summary": "Update Multiple Permissions",
                "description": "Update multiple permissions at the same time.",
                "tags": ["Permissions"],
                "operationId": "updatePermissions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "properties": {
                                    "keys": {"type": "array", "items": {"type": "string"}}, "data": {
                                        "properties": {
                                            "collection": {
                                                "description": "What collection this permission applies to.",
                                                "type": "string",
                                                "example": "customers"
                                            },
                                            "comment": {
                                                "description": "If the user can post comments.",
                                                "type": "string",
                                                "enum": ["none", "create", "update", "full"]
                                            },
                                            "create": {
                                                "description": "If the user can create items.",
                                                "type": "string",
                                                "enum": ["none", "full"]
                                            },
                                            "delete": {
                                                "description": "If the user can update items.",
                                                "type": "string",
                                                "enum": ["none", "mine", "role", "full"]
                                            },
                                            "explain": {
                                                "description": "If the user is required to leave a comment explaining what was changed.",
                                                "type": "string",
                                                "enum": ["none", "create", "update", "always"]
                                            },
                                            "read": {
                                                "description": "If the user can read items.",
                                                "type": "string",
                                                "enum": ["none", "mine", "role", "full"]
                                            },
                                            "role": {
                                                "description": "Unique identifier of the role this permission applies to.",
                                                "type": "integer",
                                                "example": 3
                                            },
                                            "read_field_blacklist": {
                                                "description": "Explicitly denies read access for specific fields.",
                                                "type": "array",
                                                "items": {"type": "string"},
                                                "example": ["featured_image"]
                                            },
                                            "status": {
                                                "description": "What status this permission applies to.",
                                                "type": "string"
                                            },
                                            "status_blacklist": {
                                                "description": "Explicitly denies specific statuses to be used.",
                                                "type": "array",
                                                "items": {"type": "string"}
                                            },
                                            "update": {
                                                "description": "If the user can update items.",
                                                "type": "string",
                                                "enum": ["none", "mine", "role", "full"]
                                            },
                                            "write_field_blacklist": {
                                                "description": "Explicitly denies write access for specific fields.",
                                                "type": "array",
                                                "items": {"type": "string"}
                                            }
                                        }, "type": "object"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Permissions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Permissions",
                "description": "Delete multiple existing permissions.",
                "tags": ["Permissions"],
                "operationId": "deletePermissions",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/permissions/me": {
            "get": {
                "summary": "List My Permissions",
                "description": "List the permissions that apply to the current user.",
                "operationId": "getMyPermissions",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Permissions"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"]
            }
        },
        "/permissions/{id}": {
            "get": {
                "summary": "Retrieve a Permission",
                "description": "Retrieve a single permissions object by unique identifier.",
                "operationId": "getPermission",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Permissions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"]
            },
            "patch": {
                "summary": "Update a Permission",
                "description": "Update an existing permission",
                "operationId": "updatePermission",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "collection": {
                                        "description": "What collection this permission applies to.",
                                        "type": "object"
                                    },
                                    "comment": {
                                        "description": "If the user can post comments. `full`.",
                                        "type": "string",
                                        "enum": ["none", "create", "update"]
                                    },
                                    "create": {
                                        "description": "If the user can create items.",
                                        "type": "string",
                                        "enum": ["none", "full"]
                                    },
                                    "delete": {
                                        "description": "If the user can update items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "explain": {
                                        "description": "If the user is required to leave a comment explaining what was changed.",
                                        "type": "string",
                                        "enum": ["none", "create", "update", "always"]
                                    },
                                    "read": {
                                        "description": "If the user can read items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "read_field_blacklist": {
                                        "description": "Explicitly denies read access for specific fields.",
                                        "type": "object"
                                    },
                                    "role": {
                                        "description": "Unique identifier of the role this permission applies to.",
                                        "type": "object"
                                    },
                                    "status": {
                                        "description": "What status this permission applies to.",
                                        "type": "object"
                                    },
                                    "status_blacklist": {
                                        "description": "Explicitly denies specific statuses to be used.",
                                        "type": "object"
                                    },
                                    "update": {
                                        "description": "If the user can update items.",
                                        "type": "string",
                                        "enum": ["none", "mine", "role", "full"]
                                    },
                                    "write_field_blacklist": {
                                        "description": "Explicitly denies write access for specific fields.",
                                        "type": "object"
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Permissions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"]
            },
            "delete": {
                "summary": "Delete a Permission",
                "description": "Delete an existing permission",
                "operationId": "deletePermission",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Permissions"],
                "parameters": [{"$ref": "#/components/parameters/Id"}]
            }
        },
        "/presets": {
            "get": {
                "tags": ["Presets"],
                "operationId": "getPresets",
                "summary": "List Presets",
                "description": "List the presets.",
                "security": [{"Auth": []}],
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Page"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Presets"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "post": {
                "tags": ["Presets"],
                "operationId": "createPreset",
                "summary": "Create a Preset",
                "description": "Create a new preset.",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "required": ["collection"], "properties": {
                                    "collection": {
                                        "type": "string",
                                        "description": "What collection this collection preset is used for.",
                                        "example": "articles"
                                    },
                                    "title": {
                                        "type": "string",
                                        "description": "Name for the bookmark. If this is set, the collection preset will be considered to be a bookmark.",
                                        "example": "Highly rated articles"
                                    },
                                    "role": {
                                        "type": "string",
                                        "description": "The unique identifier of a role in the platform. If user is null, this will be used to apply the collection preset or bookmark for all users in the role.",
                                        "example": null
                                    },
                                    "search": {
                                        "type": "string",
                                        "description": "What the user searched for in search/filter in the header bar."
                                    },
                                    "filters": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "key": {"type": "string", "example": "aHKLAakdVghzD"},
                                                "field": {"type": "string", "example": "rating"},
                                                "operator": {"type": "string", "example": "gte"},
                                                "value": {"type": "integer", "example": 4.5}
                                            }
                                        }
                                    },
                                    "layout": {"type": "string", "description": "Name of the view type that is used."},
                                    "layout_query": {
                                        "type": "string",
                                        "description": "Layout query that's saved per layout type. Controls what data is fetched on load. These follow the same format as the JS SDK parameters."
                                    },
                                    "layout_options": {
                                        "type": "string",
                                        "description": "Options of the views. The properties in here are controlled by the layout."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Presets"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "patch": {
                "summary": "Update Multiple Presets",
                "description": "Update multiple presets at the same time.",
                "tags": ["Presets"],
                "operationId": "updatePresets",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "properties": {
                                    "keys": {"type": "array", "items": {"type": "string"}}, "data": {
                                        "type": "object", "required": ["collection"], "properties": {
                                            "collection": {
                                                "type": "string",
                                                "description": "What collection this collection preset is used for.",
                                                "example": "articles"
                                            },
                                            "title": {
                                                "type": "string",
                                                "description": "Name for the bookmark. If this is set, the collection preset will be considered to be a bookmark.",
                                                "example": "Highly rated articles"
                                            },
                                            "role": {
                                                "type": "string",
                                                "description": "The unique identifier of a role in the platform. If user is null, this will be used to apply the collection preset or bookmark for all users in the role.",
                                                "example": null
                                            },
                                            "search": {
                                                "type": "string",
                                                "description": "What the user searched for in search/filter in the header bar."
                                            },
                                            "filters": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "key": {
                                                            "type": "string",
                                                            "example": "aHKLAakdVghzD"
                                                        },
                                                        "field": {"type": "string", "example": "rating"},
                                                        "operator": {"type": "string", "example": "gte"},
                                                        "value": {"type": "integer", "example": 4.5}
                                                    }
                                                }
                                            },
                                            "layout": {
                                                "type": "string",
                                                "description": "Name of the view type that is used."
                                            },
                                            "layout_query": {
                                                "type": "string",
                                                "description": "Layout query that's saved per layout type. Controls what data is fetched on load. These follow the same format as the JS SDK parameters."
                                            },
                                            "layout_options": {
                                                "type": "string",
                                                "description": "Options of the views. The properties in here are controlled by the layout."
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Presets"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Presets",
                "description": "Delete multiple existing presets.",
                "tags": ["Presets"],
                "operationId": "deletePresets",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/presets/{id}": {
            "get": {
                "tags": ["Presets"],
                "operationId": "getPreset",
                "summary": "Retrieve a Preset",
                "description": "Retrieve a single preset by unique identifier.",
                "security": [{"Auth": []}],
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Presets"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "patch": {
                "tags": ["Presets"],
                "operationId": "updatePreset",
                "summary": "Update a Preset",
                "description": "Update an existing preset.",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object", "required": ["collection"], "properties": {
                                    "collection": {
                                        "type": "string",
                                        "description": "What collection this collection preset is used for.",
                                        "example": "articles"
                                    },
                                    "title": {
                                        "type": "string",
                                        "description": "Name for the bookmark. If this is set, the collection preset will be considered to be a bookmark.",
                                        "example": "Highly rated articles"
                                    },
                                    "role": {
                                        "type": "integer",
                                        "description": "The unique identifier of a role in the platform. If user is null, this will be used to apply the collection preset or bookmark for all users in the role."
                                    },
                                    "search_query": {
                                        "type": "string",
                                        "description": "What the user searched for in search/filter in the header bar."
                                    },
                                    "filters": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "field": {"type": "string", "example": "rating"},
                                                "operator": {"type": "string", "example": "gte"},
                                                "value": {"type": "integer", "example": 4.5}
                                            }
                                        }
                                    },
                                    "view_type": {
                                        "type": "string",
                                        "description": "Name of the view type that is used. Defaults to tabular."
                                    },
                                    "view_query": {
                                        "type": "string",
                                        "description": "View query that's saved per view type. Controls what data is fetched on load. These follow the same format as the JS SDK parameters."
                                    },
                                    "view_options": {
                                        "type": "string",
                                        "description": "Options of the views. The properties in here are controlled by the layout."
                                    },
                                    "translation": {
                                        "type": "object",
                                        "description": "Key value pair of language-translation. Can be used to translate the bookmark title in multiple languages."
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Presets"}}
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "tags": ["Presets"],
                "operationId": "deletePreset",
                "summary": "Delete a Preset",
                "description": "Delete an existing preset.",
                "security": [{"Auth": []}],
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "parameters": [{"$ref": "#/components/parameters/Id"}]
            }
        },
        "/relations": {
            "get": {
                "summary": "List Relations",
                "description": "List the relations.",
                "operationId": "getRelations",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Page"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Relations"}
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Relations"]
            }, "post": {
                "summary": "Create a Relation",
                "description": "Create a new relation.",
                "operationId": "createRelation",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "collection_many": {
                                        "description": "Collection that has the field that holds the foreign key.",
                                        "type": "string",
                                        "example": "articles"
                                    },
                                    "collection_one": {
                                        "description": "Collection on the _one_ side of the relationship.",
                                        "type": "string",
                                        "example": "authors"
                                    },
                                    "field_many": {
                                        "description": "Foreign key. Field that holds the primary key of the related collection.",
                                        "type": "string",
                                        "example": "author"
                                    },
                                    "field_one": {
                                        "description": "Alias column that serves as the _one_ side of the relationship.",
                                        "type": "string",
                                        "example": "books"
                                    },
                                    "junction_field": {
                                        "description": "Field on the junction table that holds the primary key of the related collection.",
                                        "type": "string"
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Relations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Relations"]
            }
        },
        "/relations/{id}": {
            "get": {
                "summary": "Retrieve a Relation",
                "description": "Retrieve a single relation by unique identifier.",
                "operationId": "getRelation",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Relations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Relations"]
            },
            "patch": {
                "summary": "Update a Relation",
                "description": "Update an existing relation",
                "operationId": "updateRelation",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "collection_many": {
                                        "description": "Collection that has the field that holds the foreign key.",
                                        "type": "string"
                                    },
                                    "collection_one": {
                                        "description": "Collection on the _one_ side of the relationship.",
                                        "type": "string"
                                    },
                                    "field_many": {
                                        "description": "Foreign key. Field that holds the primary key of the related collection.",
                                        "type": "string"
                                    },
                                    "field_one": {
                                        "description": "Alias column that serves as the _one_ side of the relationship.",
                                        "type": "string",
                                        "example": "books"
                                    },
                                    "junction_field": {
                                        "description": "Field on the junction table that holds the primary key of the related collection.",
                                        "type": "string"
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Relations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Relations"]
            },
            "delete": {
                "summary": "Delete a Relation",
                "description": "Delete an existing relation.",
                "operationId": "deleteRelation",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Relations"],
                "parameters": [{"$ref": "#/components/parameters/Id"}]
            }
        },
        "/revisions": {
            "get": {
                "summary": "List Revisions",
                "description": "List the revisions.",
                "operationId": "getRevisions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Page"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Revisions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Revisions"]
            }
        },
        "/revisions/{id}": {
            "get": {
                "summary": "Retrieve a Revision",
                "description": "Retrieve a single revision by unique identifier.",
                "operationId": "getRevision",
                "parameters": [{"$ref": "#/components/parameters/Id"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Revisions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Revisions"]
            }
        },
        "/roles": {
            "get": {
                "summary": "List Roles",
                "description": "List the roles.",
                "operationId": "getRoles",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}, {"$ref": "#/components/parameters/Page"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Roles"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Roles"]
            },
            "post": {
                "summary": "Create a Role",
                "description": "Create a new role.",
                "operationId": "createRole",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "description": {
                                        "description": "Description of the role.",
                                        "type": "string"
                                    },
                                    "enforce_tfa": {
                                        "description": "Whether or not this role enforces the use of 2FA.",
                                        "type": "boolean"
                                    },
                                    "external_id": {
                                        "description": "ID used with external services in SCIM.",
                                        "type": "string"
                                    },
                                    "ip_whitelist": {
                                        "description": "Array of IP addresses that are allowed to connect to the API as a user of this role.",
                                        "type": "array",
                                        "items": {"type": "string"}
                                    },
                                    "module_listing": {
                                        "description": "Custom override for the admin app module bar navigation.",
                                        "type": "string"
                                    },
                                    "name": {"description": "Name of the role.", "type": "string", "example": "Interns"}
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Roles"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Roles"]
            },
            "patch": {
                "summary": "Update Multiple Roles",
                "description": "Update multiple roles at the same time.",
                "tags": ["Roles"],
                "operationId": "updateRoles",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "keys": {
                                        "type": "array",
                                        "items": {"type": "string"}
                                    },
                                    "data": {
                                        "type": "object",
                                        "properties": {
                                            "description": {
                                                "description": "Description of the role.",
                                                "type": "string"
                                            },
                                            "enforce_tfa": {
                                                "description": "Whether or not this role enforces the use of 2FA.",
                                                "type": "boolean"
                                            },
                                            "external_id": {
                                                "description": "ID used with external services in SCIM.",
                                                "type": "string"
                                            },
                                            "ip_whitelist": {
                                                "description": "Array of IP addresses that are allowed to connect to the API as a user of this role.",
                                                "type": "array",
                                                "items": {"type": "string"}
                                            },
                                            "module_listing": {
                                                "description": "Custom override for the admin app module bar navigation.",
                                                "type": "string"
                                            },
                                            "name": {
                                                "description": "Name of the role.",
                                                "type": "string",
                                                "example": "Interns"
                                            }
                                        }
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Roles"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Roles",
                "description": "Delete multiple existing roles.",
                "tags": ["Roles"],
                "operationId": "deleteRoles",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/roles/{id}": {
            "get": {
                "summary": "Retrieve a Role",
                "description": "Retrieve a single role by unique identifier.",
                "operationId": "getRole",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Roles"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Roles"]
            },
            "patch": {
                "summary": "Update a Role",
                "description": "Update an existing role",
                "operationId": "updateRole",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "description": {
                                        "description": "Description of the role.",
                                        "type": "string"
                                    },
                                    "enforce_tfa": {
                                        "description": "Whether or not this role enforces the use of 2FA.",
                                        "type": "boolean"
                                    },
                                    "external_id": {
                                        "description": "ID used with external services in SCIM.",
                                        "type": "string"
                                    },
                                    "ip_whitelist": {
                                        "description": "Array of IP addresses that are allowed to connect to the API as a user of this role.",
                                        "type": "array",
                                        "items": {"type": "string"}
                                    },
                                    "module_listing": {
                                        "description": "Custom override for the admin app module bar navigation.",
                                        "type": "string"
                                    },
                                    "name": {"description": "Name of the role.", "type": "string"}
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Roles"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Roles"]
            },
            "delete": {
                "summary": "Delete a Role",
                "description": "Delete an existing role",
                "operationId": "deleteRole",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Roles"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/settings": {
            "get": {
                "summary": "Retrieve Settings",
                "description": "List the settings.",
                "operationId": "getSettings",
                "parameters": [{"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Page"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Settings"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Settings"]
            },
            "patch": {
                "summary": "Update Settings",
                "description": "Update the settings",
                "operationId": "updateSetting",
                "requestBody": {"content": {"application/json": {"schema": {"type": "object"}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Settings"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Settings"]
            }
        },
        "/users": {
            "get": {
                "summary": "List Users",
                "description": "List the users.",
                "operationId": "getUsers",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Users"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            },
            "post": {
                "summary": "Create a User",
                "description": "Create a new user.",
                "operationId": "createUser",
                "parameters": [{"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/Users"}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            },
            "patch": {
                "summary": "Update Multiple Users",
                "description": "Update multiple users at the same time.",
                "tags": ["Users"],
                "operationId": "updateUsers",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {"$ref": "#/components/schemas/Users"},
                                    "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Users"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Users",
                "description": "Delete multiple existing users.",
                "tags": ["Users"],
                "operationId": "deleteUsers",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/users/{id}": {
            "get": {
                "summary": "Retrieve a User",
                "description": "Retrieve a single user by unique identifier.",
                "operationId": "getUser",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            },
            "patch": {
                "summary": "Update a User",
                "description": "Update an existing user",
                "operationId": "updateUser",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/Users"}}}},
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {"data": {"type": "object"}},
                                    "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            },
            "delete": {
                "summary": "Delete a User",
                "description": "Delete an existing user",
                "operationId": "deleteUser",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/users/invite": {
            "post": {
                "summary": "Invite User(s)",
                "description": "Invites one or more users to this project. It creates a user with an invited status, and then sends an email to the user with instructions on how to activate their account.",
                "operationId": "invite",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "description": "Email address or array of email addresses of the to-be-invited user(s).",
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/users/invite/accept": {
            "post": {
                "summary": "Accept User Invite",
                "description": "Accepts and enables an invited user using a JWT invitation token.",
                "operationId": "acceptInvite",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "token": {
                                        "type": "string",
                                        "example": "eyJh...KmUk",
                                        "description": "Accept invite token."
                                    },
                                    "password": {
                                        "type": "string",
                                        "description": "Password of the user.",
                                        "format": "password",
                                        "example": "d1r3ctu5"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/users/me": {
            "get": {
                "summary": "Retrieve Current User",
                "description": "Retrieve the currently authenticated user.",
                "operationId": "getMe",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            },
            "patch": {
                "summary": "Update Current User",
                "description": "Update the currently authenticated user.",
                "operationId": "updateMe",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Users"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/users/me/track/page": {
            "patch": {
                "summary": "Update Last Page",
                "description": "Updates the last used page field of the currently authenticated user. This is used internally to be able to open the Directus admin app from the last page you used.",
                "operationId": "updateLastUsedPageMe",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "last_page": {
                                        "description": "Path of the page you used last.",
                                        "type": "string"
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/users/me/tfa/enable": {
            "post": {
                "summary": "Enable 2FA",
                "description": "Enables two-factor authentication for the currently authenticated user.",
                "operationId": "meTfaEnable",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/users/me/tfa/disable": {
            "post": {
                "summary": "Disable 2FA",
                "description": "Disables two-factor authentication for the currently authenticated user.",
                "operationId": "meTfaDisable",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Users"]
            }
        },
        "/webhooks": {
            "get": {
                "summary": "List Webhooks",
                "description": "Get all webhooks.",
                "operationId": "getWebhooks",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Webhooks"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Webhooks"]
            },
            "post": {
                "summary": "Create a Webhook",
                "description": "Create a new webhook.",
                "operationId": "createWebhook",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "name": {
                                        "description": "The name of the webhook.",
                                        "type": "string",
                                        "example": "create articles"
                                    },
                                    "method": {
                                        "description": "Method used in the webhook.",
                                        "type": "string",
                                        "example": "POST"
                                    },
                                    "url": {
                                        "description": "The url of the webhook.",
                                        "type": "string",
                                        "example": null
                                    },
                                    "status": {
                                        "description": "The status of the webhook.",
                                        "type": "string",
                                        "example": "active"
                                    },
                                    "data": {
                                        "description": "If yes, send the content of what was done",
                                        "type": "boolean",
                                        "example": true
                                    },
                                    "actions": {
                                        "description": "The actions that triggers this webhook.",
                                        "example": null
                                    },
                                    "system-collections": {
                                        "description": "The collections that triggers this webhook.",
                                        "example": null
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Roles"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Webhooks"]
            },
            "patch": {
                "summary": "Update Multiple Webhooks",
                "description": "Update multiple webhooks at the same time.",
                "tags": ["Webhooks"],
                "operationId": "updateWebhooks",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "properties": {
                                            "name": {
                                                "description": "The name of the webhook.",
                                                "type": "string",
                                                "example": "create articles"
                                            },
                                            "method": {
                                                "description": "Method used in the webhook.",
                                                "type": "string",
                                                "example": "POST"
                                            },
                                            "url": {
                                                "description": "The url of the webhook.",
                                                "type": "string",
                                                "example": null
                                            },
                                            "status": {
                                                "description": "The status of the webhook.",
                                                "type": "string",
                                                "example": "active"
                                            },
                                            "data": {
                                                "description": "If yes, send the content of what was done",
                                                "type": "boolean",
                                                "example": true
                                            },
                                            "actions": {
                                                "description": "The actions that triggers this webhook.",
                                                "example": null
                                            },
                                            "system-collections": {
                                                "description": "The collections that triggers this webhook.",
                                                "example": null
                                            }
                                        }, "type": "object"
                                    }, "keys": {"type": "array", "items": {"type": "string"}}
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Webhooks"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Webhooks",
                "description": "Delete multiple existing webhooks.",
                "tags": ["Webhooks"],
                "operationId": "deleteWebhooks",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/webhooks/{id}": {
            "get": {
                "summary": "Retrieve a Webhook",
                "description": "Retrieve a single webhook by unique identifier.",
                "operationId": "getWebhook",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Webhooks"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Webhooks"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            },
            "patch": {
                "summary": "Update a Webhook",
                "description": "Update an existing webhook",
                "operationId": "updateWebhook",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "name": {
                                        "description": "The name of the webhook.",
                                        "type": "string",
                                        "example": "create articles"
                                    },
                                    "method": {
                                        "description": "Method used in the webhook.",
                                        "type": "string",
                                        "example": "POST"
                                    },
                                    "url": {
                                        "description": "The url of the webhook.",
                                        "type": "string",
                                        "example": null
                                    },
                                    "status": {
                                        "description": "The status of the webhook.",
                                        "type": "string",
                                        "example": "active"
                                    },
                                    "data": {
                                        "description": "If yes, send the content of what was done",
                                        "type": "boolean",
                                        "example": true
                                    },
                                    "actions": {
                                        "description": "The actions that triggers this webhook.",
                                        "example": null
                                    },
                                    "system-collections": {
                                        "description": "The collections that triggers this webhook.",
                                        "example": null
                                    }
                                }, "type": "object"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Roles"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Webhooks"]
            },
            "delete": {
                "summary": "Delete a Webhook",
                "description": "Delete an existing webhook",
                "operationId": "deleteWebhook",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Webhooks"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/flows": {
            "get": {
                "summary": "List Flows",
                "description": "Get all flows.",
                "operationId": "getFlows",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Flows"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Flows"]
            },
            "post": {
                "summary": "Create a Flow",
                "description": "Create a new flow.",
                "operationId": "createFlow",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Flows"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Flows"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Flows"]
            },
            "patch": {
                "summary": "Update Multiple Flows",
                "description": "Update multiple flows at the same time.",
                "tags": ["Flows"],
                "operationId": "updateFlows",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {"anyOf": [{"$ref": "#/components/schemas/Flows"}]},
                                    "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Flows"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Flows",
                "description": "Delete multiple existing flows.",
                "tags": ["Flows"],
                "operationId": "deleteFlows",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/flows/{id}": {
            "get": {
                "summary": "Retrieve a Flow",
                "description": "Retrieve a single flow by unique identifier.",
                "operationId": "getFlow",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Flows"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Flows"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            },
            "patch": {
                "summary": "Update a Flow",
                "description": "Update an existing flow",
                "operationId": "updateFlow",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Flows"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Flows"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Flows"]
            },
            "delete": {
                "summary": "Delete a Flow",
                "description": "Delete an existing flow",
                "operationId": "deleteFlow",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Flows"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/operations": {
            "get": {
                "summary": "List Operations",
                "description": "Get all operations.",
                "operationId": "getOperations",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Operations"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Operations"]
            },
            "post": {
                "summary": "Create an Operation",
                "description": "Create a new operation.",
                "operationId": "createOperation",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Operations"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Operations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Operations"]
            },
            "patch": {
                "summary": "Update Multiple Operations",
                "description": "Update multiple operations at the same time.",
                "tags": ["Operations"],
                "operationId": "updateOperations",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {"anyOf": [{"$ref": "#/components/schemas/Operations"}]},
                                    "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Operations"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            },
            "delete": {
                "summary": "Delete Multiple Operations",
                "description": "Delete multiple existing operations.",
                "tags": ["Operations"],
                "operationId": "deleteOperations",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                }
            }
        },
        "/operations/{id}": {
            "get": {
                "summary": "Retrieve an Operation",
                "description": "Retrieve a single operation by unique identifier.",
                "operationId": "getOperation",
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Operations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Operations"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            },
            "patch": {
                "summary": "Update an Operation",
                "description": "Update an existing operation",
                "operationId": "updateOperation",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Operations"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Operations"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Operations"]
            },
            "delete": {
                "summary": "Delete an Operation",
                "description": "Delete an existing operation",
                "operationId": "deleteOperation",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Operations"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/versions": {
            "get": {
                "summary": "List Content Versions",
                "description": "Get all Content Versions.",
                "operationId": "getContentVersions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Versions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            },
            "post": {
                "summary": "Create Multiple Content Versions",
                "description": "Create multiple new Content Versions.",
                "operationId": "createContentVersion",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Versions"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Versions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            },
            "patch": {
                "summary": "Update Multiple Content Versions",
                "description": "Update multiple Content Versions at the same time.",
                "operationId": "updateContentVersions",
                "parameters": [{"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Limit"}, {"$ref": "#/components/parameters/Meta"}, {"$ref": "#/components/parameters/Offset"}, {"$ref": "#/components/parameters/Sort"}, {"$ref": "#/components/parameters/Filter"}, {"$ref": "#/components/parameters/Search"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "data": {"anyOf": [{"$ref": "#/components/schemas/Versions"}]},
                                    "keys": {"type": "array", "items": {"type": "string"}}
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "type": "array",
                                            "items": {"$ref": "#/components/schemas/Versions"}
                                        }, "meta": {"$ref": "#/components/schemas/x-metadata"}
                                    }
                                }
                            }
                        }
                    }, "401": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "tags": ["Versions"]
            },
            "delete": {
                "summary": "Delete Multiple Content Versions",
                "description": "Delete multiple existing Content Versions.",
                "operationId": "deleteContentVersions",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"}
                },
                "tags": ["Versions"]
            }
        },
        "/versions/{id}": {
            "get": {
                "summary": "Retrieve a Content Version",
                "description": "Retrieve a single Content Version by unique identifier.",
                "operationId": "getContentVersion",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Versions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            },
            "patch": {
                "summary": "Update a Content Version",
                "description": "Update an existing Content Version.",
                "operationId": "updateContentVersion",
                "parameters": [{"$ref": "#/components/parameters/UUId"}, {"$ref": "#/components/parameters/Fields"}, {"$ref": "#/components/parameters/Meta"}],
                "requestBody": {"content": {"application/json": {"schema": {"anyOf": [{"$ref": "#/components/schemas/Versions"}]}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {"data": {"$ref": "#/components/schemas/Versions"}}
                                }
                            }
                        }
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            },
            "delete": {
                "summary": "Delete a Content Version",
                "description": "Delete an existing Content Version.",
                "operationId": "deleteContentVersion",
                "responses": {
                    "200": {"description": "Successful request"},
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"],
                "parameters": [{"$ref": "#/components/parameters/UUId"}]
            }
        },
        "/versions/{id}/save": {
            "post": {
                "summary": "Save to a Content Version",
                "description": "Save item changes to an existing Content Version.",
                "operationId": "saveContentVersion",
                "parameters": [{"$ref": "#/components/parameters/UUId"}],
                "requestBody": {"content": {"application/json": {"schema": {"type": "object"}}}},
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {"application/json": {"schema": {"type": "object", "properties": {}}}}
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            }
        },
        "/versions/{id}/compare": {
            "get": {
                "summary": "Compare a Content Version",
                "description": "Compare an existing Content Version with the main version of the item.",
                "operationId": "compareContentVersion",
                "parameters": [{"$ref": "#/components/parameters/UUId"}],
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "properties": {"data": {"type": "object"}},
                                    "type": "object"
                                }
                            }
                        }, "description": "Successful request"
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            }
        },
        "/versions/{id}/promote": {
            "post": {
                "summary": "Promote a Content Version",
                "description": "Pass the current hash of the main version of the item (obtained from the `compare` endpoint) along with an optional array of field names of which the values are to be promoted (by default, all fields are selected).",
                "operationId": "promoteContentVersion",
                "parameters": [{"$ref": "#/components/parameters/UUId"}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "mainHash": {
                                        "description": "Hash of the main version of the item to be promoted.",
                                        "type": "string"
                                    },
                                    "fields": {
                                        "description": "Optional array of field names of which the values are to be promoted.",
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Successful request",
                        "content": {"application/json": {"schema": {"type": "object", "properties": {}}}}
                    },
                    "401": {"$ref": "#/components/responses/UnauthorizedError"},
                    "404": {"$ref": "#/components/responses/NotFoundError"}
                },
                "tags": ["Versions"]
            }
        }
    },
    "tags": [{
        "name": "Assets",
        "description": "Image typed files can be dynamically resized and transformed to fit any need."
    }, {
        "name": "Authentication",
        "description": "All events that happen within Directus are tracked and stored in the activities collection. This gives you full accountability over everything that happens."
    }, {
        "name": "Extensions",
        "description": "Directus can easily be extended through the addition of several types of extensions, including layouts, interfaces, and modules."
    }, {"name": "Schema", "description": "Retrieve and update the schema of an instance."}, {
        "name": "Server",
        "description": "Access to where Directus runs. Allows you to make sure your server has everything needed to run the platform, and check what kind of latency we're dealing with."
    }, {
        "name": "Utilities",
        "description": "Directus comes with various utility endpoints you can use to simplify your development flow."
    }, {"name": "ItemsVersions", "x-collection": "versions"}, {
        "name": "Activity",
        "description": "All events that happen within Directus are tracked and stored in the activities collection. This gives you full accountability over everything that happens.",
        "x-collection": "directus_activity"
    }, {
        "name": "Collections",
        "description": "Collections are the individual collections of items, similar to tables in a database. Changes to collections will alter the schema of the database.",
        "x-collection": "directus_collections"
    }, {
        "name": "Fields",
        "description": "Fields are individual pieces of content within an item. They are mapped to columns in the database.",
        "x-collection": "directus_fields"
    }, {
        "name": "Files",
        "description": "Files can be saved in any given location. Directus has a powerful assets endpoint that can be used to generate thumbnails for images on the fly.",
        "x-collection": "directus_files"
    }, {
        "name": "Folders",
        "description": "Group files by virtual folders.",
        "x-collection": "directus_folders"
    }, {
        "name": "Permissions",
        "description": "Permissions control who has access to what and when.",
        "x-collection": "directus_permissions"
    }, {
        "name": "Presets",
        "description": "Presets hold the preferences of individual users of the platform. This allows Directus to show and maintain custom item listings for users of the app.",
        "x-collection": "directus_presets"
    }, {
        "name": "Relations",
        "description": "What data is linked to what other data. Allows you to assign authors to articles, products to sales, and whatever other structures you can think of.",
        "x-collection": "directus_relations"
    }, {
        "name": "Revisions",
        "description": "Revisions are individual changes to items made. Directus keeps track of changes made, so you're able to revert to a previous state at will.",
        "x-collection": "directus_revisions"
    }, {
        "name": "Roles",
        "description": "Roles are groups of users that share permissions.",
        "x-collection": "directus_roles"
    }, {
        "name": "Settings",
        "description": "Settings control the way the platform works and acts.",
        "x-collection": "directus_settings"
    }, {
        "name": "Users",
        "description": "Users are what gives you access to the data.",
        "x-collection": "directus_users"
    }, {"name": "Webhooks", "description": "Webhooks.", "x-collection": "directus_webhooks"}, {
        "name": "Flows",
        "description": "Flows enable custom, event-driven data processing and task automation.",
        "x-collection": "directus_flows"
    }, {
        "name": "Operations",
        "description": "Operations are the building blocks within Data Flows.",
        "x-collection": "directus_operations"
    }, {
        "name": "Versions",
        "description": "Enables users to create unpublished copies of an item, modify them independently from the main version, and promote them to become the new main version when ready.",
        "x-collection": "directus_versions"
    }],
    "components": {
        "schemas": {
            "Diff": {
                "type": "object",
                "properties": {
                    "hash": {"type": "string"},
                    "diff": {
                        "type": "object",
                        "properties": {
                            "collections": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "collection": {"type": "string"},
                                        "diff": {"type": "array", "items": {"type": "object"}}
                                    }
                                }
                            },
                            "fields": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "collection": {"type": "string"},
                                        "field": {"type": "string"},
                                        "diff": {"type": "array", "items": {"type": "object"}}
                                    }
                                }
                            },
                            "relations": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "collection": {"type": "string"},
                                        "field": {"type": "string"},
                                        "related_collection": {"type": "string"},
                                        "diff": {"type": "array", "items": {"type": "object"}}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "Schema": {
                "type": "object",
                "properties": {
                    "version": {"type": "integer", "example": 1},
                    "directus": {"type": "string"},
                    "vendor": {"type": "string"},
                    "collections": {"type": "array", "items": {"$ref": "#/components/schemas/Collections"}},
                    "fields": {"type": "array", "items": {"$ref": "#/components/schemas/Fields"}},
                    "relations": {"type": "array", "items": {"$ref": "#/components/schemas/Relations"}}
                }
            },
            "Query": {
                "type": "object",
                "properties": {
                    "fields": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Control what fields are being returned in the object.",
                        "example": ["*", "*.*"]
                    },
                    "filter": {"type": "object", "example": {"<field>": {"<operator>": "<value>"}}},
                    "search": {
                        "description": "Filter by items that contain the given search query in one of their fields.",
                        "type": "string"
                    },
                    "sort": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "How to sort the returned items.",
                        "example": ["-date_created"]
                    },
                    "limit": {"type": "number", "description": "Set the maximum number of items that will be returned"},
                    "offset": {"type": "number", "description": "How many items to skip when fetching data."},
                    "page": {
                        "type": "number",
                        "description": "Cursor for use in pagination. Often used in combination with limit."
                    },
                    "deep": {
                        "type": "object",
                        "description": "Deep allows you to set any of the other query parameters on a nested relational dataset.",
                        "example": {"related_articles": {"_limit": 3}}
                    }
                }
            },
            "x-metadata": {
                "type": "object",
                "properties": {
                    "total_count": {
                        "description": "Returns the total item count of the collection you're querying.",
                        "type": "integer"
                    },
                    "filter_count": {
                        "description": "Returns the item count of the collection you're querying, taking the current filter/search parameters into account.",
                        "type": "integer"
                    }
                }
            },
            "ItemsVersions": {
                "type": "object",
                "properties": {
                    "id": {"nullable": false, "type": "string", "format": "uuid"},
                    "employee": {
                        "nullable": true,
                        "oneOf": [{"type": "string", "format": "uuid"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "versionsList": {"nullable": true},
                    "alpha": {"nullable": true, "type": "boolean"}
                },
                "x-collection": "versions"
            },
            "Activity": {
                "type": "object", "x-collection": "directus_activity", "properties": {
                    "id": {"description": "Unique identifier for the object.", "example": 2, "type": "integer"},
                    "action": {
                        "description": "Action that was performed.",
                        "example": "update",
                        "type": "string",
                        "enum": ["create", "update", "delete", "login"]
                    },
                    "user": {
                        "description": "The user who performed this action.",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}],
                        "nullable": true
                    },
                    "timestamp": {
                        "description": "When the action happened.",
                        "example": "2019-12-05T22:52:09Z",
                        "type": "string",
                        "format": "date-time"
                    },
                    "ip": {
                        "description": "The IP address of the user at the time the action took place.",
                        "example": "127.0.0.1",
                        "oneOf": [{"type": "string", "format": "ipv4"}]
                    },
                    "user_agent": {
                        "description": "User agent string of the browser the user used when the action took place.",
                        "example": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/78.0.3904.108 Safari/537.36",
                        "type": "string"
                    },
                    "collection": {
                        "description": "Collection identifier in which the item resides.",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Collections"}]
                    },
                    "item": {
                        "description": "Unique identifier for the item the action applied to. This is always a string, even for integer primary keys.",
                        "example": "328",
                        "type": "string"
                    },
                    "comment": {
                        "description": "User comment. This will store the comments that show up in the right sidebar of the item edit page in the admin app.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "origin": {
                        "description": "Origin of the request when the action took place.",
                        "example": "https://directus.io",
                        "type": "string"
                    },
                    "revisions": {
                        "type": "array",
                        "items": {"oneOf": [{"type": "integer"}, {"$ref": "#/components/schemas/Revisions"}]}
                    }
                }
            },
            "Collections": {
                "type": "object", "x-collection": "directus_collections", "properties": {
                    "collection": {"description": "The collection key.", "example": "customers", "type": "string"},
                    "icon": {"nullable": true, "type": "string"},
                    "note": {"nullable": true, "type": "string"},
                    "display_template": {"nullable": true, "type": "string"},
                    "hidden": {"nullable": false, "type": "boolean"},
                    "singleton": {"nullable": false, "type": "boolean"},
                    "translations": {"nullable": true},
                    "archive_field": {"nullable": true, "type": "string"},
                    "archive_app_filter": {"nullable": false, "type": "boolean"},
                    "archive_value": {"nullable": true, "type": "string"},
                    "unarchive_value": {"nullable": true, "type": "string"},
                    "sort_field": {"nullable": true, "type": "string"},
                    "accountability": {"nullable": true, "type": "string"},
                    "color": {"nullable": true, "type": "string"},
                    "item_duplication_fields": {"nullable": true},
                    "sort": {"nullable": true, "type": "integer"},
                    "group": {
                        "nullable": true,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Collections"}]
                    },
                    "collapse": {"nullable": false, "type": "string"},
                    "preview_url": {"nullable": true, "type": "string"},
                    "versioning": {"nullable": false, "type": "boolean"},
                    "collection_divider": {"type": "string"},
                    "preview_divider": {"type": "string"},
                    "content_versioning_divider": {"type": "string"},
                    "archive_divider": {"type": "string"},
                    "sort_divider": {"type": "string"},
                    "accountability_divider": {"type": "string"},
                    "duplication_divider": {"type": "string"}
                }
            },
            "Fields": {
                "type": "object", "x-collection": "directus_fields", "properties": {
                    "id": {"nullable": false, "type": "integer"},
                    "collection": {
                        "description": "Unique name of the collection this field is in.",
                        "example": "about_us",
                        "type": "string"
                    },
                    "field": {
                        "description": "Unique name of the field. Field name is unique within the collection.",
                        "example": "id",
                        "type": "string"
                    },
                    "special": {"nullable": true, "type": "array", "items": {"type": "string"}},
                    "interface": {"nullable": true, "type": "string"},
                    "options": {"nullable": true},
                    "display": {"nullable": true, "type": "string"},
                    "display_options": {"nullable": true},
                    "readonly": {"nullable": false, "type": "boolean"},
                    "hidden": {"nullable": false, "type": "boolean"},
                    "sort": {"nullable": true, "type": "integer"},
                    "width": {"nullable": true, "type": "string"},
                    "translations": {"nullable": true},
                    "note": {"nullable": true, "type": "string"},
                    "conditions": {"nullable": true},
                    "required": {"nullable": true, "type": "boolean"},
                    "group": {
                        "nullable": true,
                        "oneOf": [{"type": "integer"}, {"$ref": "#/components/schemas/Fields"}]
                    },
                    "validation": {"nullable": true},
                    "validation_message": {"nullable": true, "type": "string"}
                }
            },
            "Files": {
                "type": "object", "x-collection": "directus_files", "properties": {
                    "id": {
                        "description": "Unique identifier for the file.",
                        "example": "8cbb43fe-4cdf-4991-8352-c461779cec02",
                        "type": "string"
                    },
                    "storage": {
                        "description": "Where the file is stored. Either `local` for the local filesystem or the name of the storage adapter (for example `s3`).",
                        "example": "local",
                        "type": "string"
                    },
                    "filename_disk": {
                        "description": "Name of the file on disk. By default, Directus uses a random hash for the filename.",
                        "example": "a88c3b72-ac58-5436-a4ec-b2858531333a.jpg",
                        "type": "string"
                    },
                    "filename_download": {
                        "description": "How you want to the file to be named when it's being downloaded.",
                        "example": "avatar.jpg",
                        "type": "string"
                    },
                    "title": {
                        "description": "Title for the file. Is extracted from the filename on upload, but can be edited by the user.",
                        "example": "User Avatar",
                        "type": "string"
                    },
                    "type": {"description": "MIME type of the file.", "example": "image/jpeg", "type": "string"},
                    "folder": {
                        "description": "Virtual folder where this file resides in.",
                        "example": null,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Folders"}],
                        "nullable": true
                    },
                    "uploaded_by": {
                        "description": "Who uploaded the file.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "uploaded_on": {
                        "description": "When the file was uploaded.",
                        "example": "2019-12-03T00:10:15+00:00",
                        "type": "string",
                        "format": "date-time"
                    },
                    "modified_by": {
                        "nullable": true,
                        "oneOf": [{"type": "string", "format": "uuid"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "modified_on": {"nullable": false, "type": "string", "format": "timestamp"},
                    "charset": {
                        "description": "Character set of the file.",
                        "example": "binary",
                        "type": "string",
                        "nullable": true
                    },
                    "filesize": {"description": "Size of the file in bytes.", "example": 137862, "type": "integer"},
                    "width": {
                        "description": "Width of the file in pixels. Only applies to images.",
                        "example": 800,
                        "type": "integer",
                        "nullable": true
                    },
                    "height": {
                        "description": "Height of the file in pixels. Only applies to images.",
                        "example": 838,
                        "type": "integer",
                        "nullable": true
                    },
                    "duration": {
                        "description": "Duration of the file in seconds. Only applies to audio and video.",
                        "example": 0,
                        "type": "integer",
                        "nullable": true
                    },
                    "embed": {
                        "description": "Where the file was embedded from.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "description": {"description": "Description for the file.", "type": "string", "nullable": true},
                    "location": {
                        "description": "Where the file was created. Is automatically populated based on EXIF data for images.",
                        "type": "string",
                        "nullable": true
                    },
                    "tags": {
                        "description": "Tags for the file. Is automatically populated based on EXIF data for images.",
                        "type": "array",
                        "nullable": true,
                        "items": {"type": "string"}
                    },
                    "metadata": {
                        "description": "IPTC, EXIF, and ICC metadata extracted from file",
                        "type": "object",
                        "nullable": true
                    },
                    "storage_divider": {"type": "string"}
                }
            },
            "Folders": {
                "type": "object",
                "x-collection": "directus_files",
                "properties": {
                    "id": {
                        "description": "Unique identifier for the folder.",
                        "example": "0cf0e03d-4364-45df-b77b-ca61f61869d2",
                        "type": "string"
                    },
                    "name": {"description": "Name of the folder.", "example": "New York", "type": "string"},
                    "parent": {
                        "description": "Unique identifier of the parent folder. This allows for nested folders.",
                        "example": null,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Folders"}],
                        "nullable": true
                    }
                }
            },
            "Permissions": {
                "type": "object", "x-collection": "directus_permissions", "properties": {
                    "id": {"description": "Unique identifier for the permission.", "example": 1, "type": "integer"},
                    "role": {
                        "description": "Unique identifier of the role this permission applies to.",
                        "example": "2f24211d-d928-469a-aea3-3c8f53d4e426",
                        "type": "string",
                        "nullable": true
                    },
                    "collection": {
                        "description": "What collection this permission applies to.",
                        "example": "customers",
                        "type": "string"
                    },
                    "action": {
                        "description": "What action this permission applies to.",
                        "example": "create",
                        "type": "string",
                        "enum": ["create", "read", "update", "delete"]
                    },
                    "permissions": {
                        "description": "JSON structure containing the permissions checks for this permission.",
                        "type": "object",
                        "nullable": true
                    },
                    "validation": {
                        "description": "JSON structure containing the validation checks for this permission.",
                        "type": "object",
                        "nullable": true
                    },
                    "presets": {
                        "description": "JSON structure containing the preset value for created/updated items.",
                        "type": "object",
                        "nullable": true
                    },
                    "fields": {
                        "description": "CSV of fields that the user is allowed to interact with.",
                        "type": "array",
                        "items": {"type": "string"},
                        "nullable": true
                    }
                }
            },
            "Presets": {
                "type": "object", "x-collection": "directus_presets", "properties": {
                    "id": {
                        "description": "Unique identifier for this single collection preset.",
                        "example": 155,
                        "type": "integer"
                    },
                    "bookmark": {
                        "description": "Name for the bookmark. If this is set, the preset will be considered a bookmark.",
                        "nullable": true,
                        "type": "string"
                    },
                    "user": {
                        "description": "The unique identifier of the user to whom this collection preset applies.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "nullable": true,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "role": {
                        "description": "The unique identifier of a role in the platform. If `user` is null, this will be used to apply the collection preset or bookmark for all users in the role.",
                        "example": "50419801-0f30-8644-2b3c-9bc2d980d0a0",
                        "nullable": true,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Roles"}]
                    },
                    "collection": {
                        "description": "What collection this collection preset is used for.",
                        "example": "articles",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Collections"}]
                    },
                    "search": {"description": "Search query.", "type": "string", "nullable": true},
                    "layout": {"description": "Key of the layout that is used.", "type": "string", "example": null},
                    "layout_query": {
                        "description": "Layout query that's saved per layout type. Controls what data is fetched on load. These follow the same format as the JS SDK parameters.",
                        "example": {"cards": {"sort": "-published_on"}},
                        "nullable": true
                    },
                    "layout_options": {
                        "description": "Options of the views. The properties in here are controlled by the layout.",
                        "example": {
                            "cards": {
                                "icon": "account_circle",
                                "title": "{{ first_name }} {{ last_name }}",
                                "subtitle": "{{ title }}",
                                "size": 3
                            }
                        },
                        "nullable": true
                    },
                    "refresh_interval": {"nullable": true, "type": "integer"},
                    "filter": {"nullable": true},
                    "icon": {"nullable": true, "type": "string"},
                    "color": {"nullable": true, "type": "string"}
                }
            },
            "Relations": {
                "type": "object", "x-collection": "directus_relations", "properties": {
                    "id": {"description": "Unique identifier for the relation.", "example": 1, "type": "integer"},
                    "many_collection": {
                        "description": "Collection that has the field that holds the foreign key.",
                        "example": "directus_activity",
                        "type": "string"
                    },
                    "many_field": {
                        "description": "Foreign key. Field that holds the primary key of the related collection.",
                        "example": "user",
                        "type": "string"
                    },
                    "one_collection": {
                        "description": "Collection on the _one_ side of the relationship.",
                        "example": "directus_users",
                        "type": "string"
                    },
                    "one_field": {
                        "description": "Alias column that serves as the _one_ side of the relationship.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "one_collection_field": {"nullable": true, "type": "string"},
                    "one_allowed_collections": {"nullable": true, "type": "array", "items": {"type": "string"}},
                    "junction_field": {
                        "description": "Field on the junction table that holds the many field of the related relation.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "sort_field": {"nullable": true, "type": "string"},
                    "one_deselect_action": {"nullable": false, "type": "string"}
                }
            },
            "Revisions": {
                "type": "object", "x-collection": "directus_revisions", "properties": {
                    "id": {"description": "Unique identifier for the revision.", "example": 1, "type": "integer"},
                    "activity": {
                        "description": "Unique identifier for the activity record.",
                        "example": 2,
                        "oneOf": [{"type": "integer"}, {"$ref": "#/components/schemas/Activity"}]
                    },
                    "collection": {
                        "description": "Collection of the updated item.",
                        "example": "articles",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Collections"}]
                    },
                    "item": {"description": "Primary key of updated item.", "example": "168", "type": "string"},
                    "data": {
                        "description": "Copy of item state at time of update.",
                        "example": {
                            "author": 1,
                            "body": "This is my first post",
                            "featured_image": 15,
                            "id": "168",
                            "title": "Hello, World!"
                        },
                        "type": "object",
                        "nullable": true
                    },
                    "delta": {
                        "description": "Changes between the previous and the current revision.",
                        "example": {"title": "Hello, World!"},
                        "type": "object"
                    },
                    "parent": {
                        "description": "If the current item was updated relationally, this is the id of the parent revision record",
                        "example": null,
                        "type": "integer",
                        "nullable": true
                    },
                    "version": {
                        "description": "Associated version of this revision.",
                        "example": "draft",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Versions"}]
                    }
                }
            },
            "Roles": {
                "type": "object", "x-collection": "directus_roles", "properties": {
                    "id": {
                        "description": "Unique identifier for the role.",
                        "example": "2f24211d-d928-469a-aea3-3c8f53d4e426",
                        "type": "string"
                    },
                    "name": {"description": "Name of the role.", "example": "Administrator", "type": "string"},
                    "icon": {"description": "The role's icon.", "example": "verified_user", "type": "string"},
                    "description": {
                        "description": "Description of the role.",
                        "example": "Admins have access to all managed data within the system by default",
                        "type": "string",
                        "nullable": true
                    },
                    "ip_access": {
                        "description": "Array of IP addresses that are allowed to connect to the API as a user of this role.",
                        "example": [],
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "enforce_tfa": {
                        "description": "Whether or not this role enforces the use of 2FA.",
                        "example": false,
                        "type": "boolean"
                    },
                    "admin_access": {
                        "description": "Admin role. If true, skips all permission checks.",
                        "example": false,
                        "type": "boolean"
                    },
                    "app_access": {
                        "description": "The users in the role are allowed to use the app.",
                        "example": true,
                        "type": "boolean"
                    },
                    "users": {
                        "type": "array",
                        "items": {
                            "oneOf": [{
                                "type": "string",
                                "format": "uuid"
                            }, {"$ref": "#/components/schemas/Users"}]
                        }
                    }
                }
            },
            "Settings": {
                "type": "object", "x-collection": "directus_settings", "properties": {
                    "id": {"description": "Unique identifier for the setting.", "type": "integer", "example": 1},
                    "project_name": {
                        "description": "The name of the project.",
                        "type": "string",
                        "example": "Directus"
                    },
                    "project_url": {
                        "description": "The url of the project.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "project_color": {
                        "description": "The brand color of the project.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "project_logo": {
                        "description": "The logo of the project.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "public_foreground": {
                        "description": "The foreground of the project.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "public_background": {
                        "description": "The background of the project.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "public_note": {
                        "description": "Note rendered on the public pages of the app.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "auth_login_attempts": {
                        "description": "Allowed authentication login attempts before the user's status is set to blocked.",
                        "type": "integer",
                        "example": 25
                    },
                    "auth_password_policy": {
                        "description": "Authentication password policy.",
                        "type": "string",
                        "nullable": true
                    },
                    "storage_asset_transform": {
                        "description": "What transformations are allowed in the assets endpoint.",
                        "type": "string",
                        "enum": ["all", "none", "presets"],
                        "example": "all",
                        "nullable": true
                    },
                    "storage_asset_presets": {
                        "description": "Array of allowed", "type": "array", "items": {
                            "type": "object", "properties": {
                                "key": {
                                    "description": "Key for the asset. Used in the assets endpoint.",
                                    "type": "string"
                                },
                                "fit": {
                                    "description": "Whether to crop the thumbnail to match the size, or maintain the aspect ratio.",
                                    "type": "string",
                                    "enum": ["cover", "contain", "inside", "outside"]
                                },
                                "width": {"description": "Width of the thumbnail.", "type": "integer"},
                                "height": {"description": "Height of the thumbnail.", "type": "integer"},
                                "withoutEnlargement": {"description": "No image upscale", "type": "boolean"},
                                "quality": {"description": "Quality of the compression used.", "type": "integer"},
                                "format": {
                                    "description": "Reformat output image",
                                    "type": "string",
                                    "enum": ["", "jpeg", "png", "webp", "tiff", "avif"]
                                },
                                "transforms": {
                                    "description": "Additional transformations to apply",
                                    "type": "array",
                                    "nullable": true,
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "method": {
                                                "description": "The Sharp method name",
                                                "type": "string"
                                            },
                                            "arguments": {
                                                "description": "A list of arguments to pass to the Sharp method",
                                                "type": "array",
                                                "nullable": true,
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "argument": {
                                                            "description": "A JSON representation of the argument value",
                                                            "type": "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }, "example": null, "nullable": true
                    },
                    "custom_css": {"nullable": true, "type": "string"},
                    "storage_default_folder": {
                        "description": "Default folder to place files",
                        "type": "string",
                        "format": "uuid"
                    },
                    "basemaps": {"nullable": true},
                    "mapbox_key": {"nullable": true, "type": "string"},
                    "module_bar": {"nullable": true},
                    "project_descriptor": {"nullable": true, "type": "string"},
                    "default_language": {"nullable": false, "type": "string"},
                    "custom_aspect_ratios": {"nullable": true},
                    "public_favicon": {
                        "nullable": true,
                        "description": "$t:field_options.directus_settings.project_favicon_note",
                        "oneOf": [{"type": "string", "format": "uuid"}, {"$ref": "#/components/schemas/Files"}]
                    },
                    "default_appearance": {"nullable": false, "type": "string"},
                    "default_theme_light": {"nullable": true, "type": "string"},
                    "theme_light_overrides": {"nullable": true},
                    "default_theme_dark": {"nullable": true, "type": "string"},
                    "theme_dark_overrides": {"nullable": true},
                    "theming_group": {"type": "string"},
                    "branding_divider": {"type": "string"},
                    "theming_divider": {"type": "string"},
                    "modules_divider": {"type": "string"},
                    "security_divider": {"type": "string"},
                    "files_divider": {"type": "string"},
                    "map_divider": {"type": "string"},
                    "image_editor": {"type": "string"}
                }
            },
            "Users": {
                "type": "object", "x-collection": "directus_users", "properties": {
                    "id": {
                        "description": "Unique identifier for the user.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "type": "string"
                    },
                    "first_name": {"description": "First name of the user.", "example": "Admin", "type": "string"},
                    "last_name": {"description": "Last name of the user.", "example": "User", "type": "string"},
                    "email": {
                        "description": "Unique email address for the user.",
                        "example": "admin@example.com",
                        "type": "string",
                        "format": "email"
                    },
                    "password": {"description": "Password of the user.", "type": "string"},
                    "location": {
                        "description": "The user's location.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "title": {"description": "The user's title.", "example": null, "type": "string", "nullable": true},
                    "description": {
                        "description": "The user's description.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "tags": {
                        "description": "The user's tags.",
                        "example": null,
                        "type": "array",
                        "nullable": true,
                        "items": {"type": "string"}
                    },
                    "avatar": {
                        "description": "The user's avatar.",
                        "example": null,
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Files"}],
                        "nullable": true
                    },
                    "language": {
                        "description": "The user's language used in Directus.",
                        "example": "en-US",
                        "type": "string"
                    },
                    "tfa_secret": {
                        "description": "The 2FA secret string that's used to generate one time passwords.",
                        "example": null,
                        "type": "string",
                        "nullable": true
                    },
                    "status": {
                        "description": "Status of the user.",
                        "example": "active",
                        "type": "string",
                        "enum": ["active", "invited", "draft", "suspended", "deleted"]
                    },
                    "role": {
                        "description": "Unique identifier of the role of this user.",
                        "example": "2f24211d-d928-469a-aea3-3c8f53d4e426",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Roles"}]
                    },
                    "token": {"description": "Static token for the user.", "type": "string", "nullable": true},
                    "last_access": {"nullable": true, "type": "string", "format": "timestamp"},
                    "last_page": {
                        "description": "Last page that the user was on.",
                        "example": "/my-project/settings/collections/a",
                        "type": "string",
                        "nullable": true
                    },
                    "provider": {"nullable": false, "type": "string"},
                    "external_identifier": {"nullable": true, "type": "string"},
                    "auth_data": {"nullable": true},
                    "email_notifications": {"nullable": true, "type": "boolean"},
                    "appearance": {"nullable": true, "type": "string"},
                    "theme_dark": {"nullable": true, "type": "string"},
                    "theme_light": {"nullable": true, "type": "string"},
                    "theme_light_overrides": {"nullable": true},
                    "theme_dark_overrides": {"nullable": true},
                    "preferences_divider": {"type": "string"},
                    "theming_divider": {"type": "string"},
                    "admin_divider": {"type": "string"}
                }
            },
            "Webhooks": {
                "type": "object",
                "x-collection": "directus_webhooks",
                "properties": {
                    "id": {"description": "The index of the webhook.", "type": "integer", "example": 1},
                    "name": {"description": "The name of the webhook.", "type": "string", "example": "create articles"},
                    "method": {"description": "Method used in the webhook.", "type": "string", "example": "POST"},
                    "url": {
                        "description": "The url of the webhook.",
                        "type": "string",
                        "example": null,
                        "nullable": true
                    },
                    "status": {"description": "The status of the webhook.", "type": "string", "example": "inactive"},
                    "data": {
                        "description": "If yes, send the content of what was done",
                        "type": "boolean",
                        "example": true
                    },
                    "actions": {
                        "description": "The actions that triggers this webhook.",
                        "type": "array",
                        "items": {"type": "string"},
                        "example": null,
                        "nullable": true
                    },
                    "collections": {"nullable": false, "type": "array", "items": {"type": "string"}},
                    "headers": {"nullable": true},
                    "triggers_divider": {"type": "string"}
                }
            },
            "Flows": {
                "type": "object", "x-collection": "directus_flows", "properties": {
                    "id": {
                        "description": "Unique identifier for the flow.",
                        "type": "string",
                        "example": "2f24211d-d928-469a-aea3-3c8f53d4e426"
                    },
                    "name": {
                        "description": "The name of the flow.",
                        "type": "string",
                        "example": "Update Articles Flow"
                    },
                    "icon": {
                        "description": "Icon displayed in the Admin App for the flow.",
                        "type": "string",
                        "example": "bolt"
                    },
                    "color": {
                        "description": "Color of the icon displayed in the Admin App for the flow.",
                        "type": "string",
                        "example": "#112233",
                        "nullable": true
                    },
                    "description": {"nullable": true, "type": "string"},
                    "status": {
                        "description": "Current status of the flow.",
                        "type": "string",
                        "example": "active",
                        "default": "active",
                        "enum": ["active", "inactive"]
                    },
                    "trigger": {
                        "description": "Type of trigger for the flow. One of `hook`, `webhook`, `operation`, `schedule`, `manual`.",
                        "type": "string",
                        "example": "manual"
                    },
                    "accountability": {
                        "description": "The permission used during the flow. One of `$public`, `$trigger`, `$full`, or UUID of a role.",
                        "type": "string",
                        "example": "$trigger"
                    },
                    "options": {
                        "description": "Options of the selected trigger for the flow.",
                        "type": "object",
                        "example": null,
                        "nullable": true
                    },
                    "operation": {
                        "description": "UUID of the operation connected to the trigger in the flow.",
                        "example": "92e82998-e421-412f-a513-13701e83e4ce",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Operations"}]
                    },
                    "date_created": {
                        "description": "Timestamp in ISO8601 when the flow was created.",
                        "type": "string",
                        "example": "2022-05-11T13:14:52Z",
                        "format": "date-time",
                        "nullable": true
                    },
                    "user_created": {
                        "description": "The user who created the flow.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "operations": {
                        "type": "array",
                        "items": {
                            "oneOf": [{
                                "type": "string",
                                "format": "uuid"
                            }, {"$ref": "#/components/schemas/Operations"}]
                        }
                    }
                }
            },
            "Operations": {
                "type": "object", "x-collection": "directus_operations", "properties": {
                    "id": {
                        "description": "Unique identifier for the operation.",
                        "type": "string",
                        "example": "2f24211d-d928-469a-aea3-3c8f53d4e426"
                    },
                    "name": {
                        "description": "The name of the operation.",
                        "type": "string",
                        "example": "Log to Console"
                    },
                    "key": {
                        "description": "Key for the operation. Must be unique within a given flow.",
                        "type": "string",
                        "example": "log_console"
                    },
                    "type": {
                        "description": "Type of operation. One of `log`, `mail`, `notification`, `create`, `read`, `request`, `sleep`, `transform`, `trigger`, `condition`, or any type of custom operation extensions.",
                        "type": "string",
                        "example": "log"
                    },
                    "position_x": {
                        "description": "Position of the operation on the X axis within the flow workspace.",
                        "type": "integer",
                        "example": 12
                    },
                    "position_y": {
                        "description": "Position of the operation on the Y axis within the flow workspace.",
                        "type": "integer",
                        "example": 12
                    },
                    "options": {
                        "description": "Options depending on the type of the operation.",
                        "type": "object",
                        "example": null,
                        "nullable": true
                    },
                    "resolve": {
                        "description": "The operation triggered when the current operation succeeds (or `then` logic of a condition operation).",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Operations"}]
                    },
                    "reject": {
                        "description": "The operation triggered when the current operation fails (or `otherwise` logic of a condition operation).",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Operations"}]
                    },
                    "flow": {
                        "nullable": false,
                        "oneOf": [{"type": "string", "format": "uuid"}, {"$ref": "#/components/schemas/Flows"}]
                    },
                    "date_created": {
                        "description": "Timestamp in ISO8601 when the operation was created.",
                        "type": "string",
                        "example": "2022-05-11T13:14:52Z",
                        "format": "date-time",
                        "nullable": true
                    },
                    "user_created": {
                        "description": "The user who created the operation.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    }
                }
            },
            "Versions": {
                "type": "object", "x-collection": "directus_versions", "properties": {
                    "id": {
                        "description": "Primary key of the Content Version.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "type": "string"
                    },
                    "key": {
                        "description": "Key of the Content Version, used as the value for the \"version\" query parameter.",
                        "example": "draft",
                        "type": "string"
                    },
                    "name": {
                        "description": "Descriptive name of the Content Version.",
                        "example": "My Draft",
                        "type": "string"
                    },
                    "collection": {
                        "description": "Name of the collection the Content Version is created on.",
                        "example": "articles",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Collections"}]
                    },
                    "item": {
                        "description": "The item the Content Version is created on.",
                        "example": "168",
                        "type": "string"
                    },
                    "hash": {"nullable": true, "type": "string"},
                    "date_created": {
                        "description": "When the Content Version was created.",
                        "type": "string",
                        "example": "2022-05-11T13:14:52Z",
                        "format": "date-time",
                        "nullable": true
                    },
                    "date_updated": {
                        "description": "When the Content Version was updated.",
                        "type": "string",
                        "example": "2022-05-11T13:14:53Z",
                        "format": "date-time",
                        "nullable": true
                    },
                    "user_created": {
                        "description": "User that created the Content Version.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    },
                    "user_updated": {
                        "description": "User that updated the Content Version.",
                        "example": "63716273-0f29-4648-8a2a-2af2948f6f78",
                        "oneOf": [{"type": "string"}, {"$ref": "#/components/schemas/Users"}]
                    }
                }
            }
        },
        "parameters": {
            "Id": {"description": "Index", "name": "id", "in": "path", "required": true, "schema": {"type": "integer"}},
            "UUId": {
                "description": "Unique identifier for the object.",
                "name": "id",
                "in": "path",
                "required": true,
                "schema": {"example": "8cbb43fe-4cdf-4991-8352-c461779cec02", "type": "string"}
            },
            "Collection": {
                "description": "Collection of which you want to retrieve the items from.",
                "name": "collection",
                "in": "path",
                "required": true,
                "schema": {"type": "string"}
            },
            "Search": {
                "description": "Filter by items that contain the given search query in one of their fields.",
                "in": "query",
                "name": "search",
                "required": false,
                "schema": {"type": "string"}
            },
            "Page": {
                "description": "Cursor for use in pagination. Often used in combination with limit.",
                "in": "query",
                "name": "page",
                "required": false,
                "schema": {"type": "integer"}
            },
            "Offset": {
                "description": "How many items to skip when fetching data.",
                "in": "query",
                "name": "offset",
                "required": false,
                "schema": {"type": "integer"}
            },
            "Sort": {
                "description": "How to sort the returned items. `sort` is a CSV of fields used to sort the fetched items. Sorting defaults to ascending (ASC) order but a minus sign (` - `) can be used to reverse this to descending (DESC) order. Fields are prioritized by their order in the CSV. You can also use a ` ? ` to sort randomly.\n",
                "in": "query",
                "name": "sort",
                "required": false,
                "explode": false,
                "schema": {"type": "array", "items": {"type": "string"}}
            },
            "Meta": {
                "description": "What metadata to return in the response.",
                "in": "query",
                "name": "meta",
                "required": false,
                "schema": {"type": "string"}
            },
            "Limit": {
                "description": "A limit on the number of objects that are returned.",
                "in": "query",
                "name": "limit",
                "required": false,
                "schema": {"type": "integer"}
            },
            "Filter": {
                "description": "Select items in collection by given conditions.",
                "in": "query",
                "name": "filter",
                "required": false,
                "schema": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "pattern": "^(\\[[^\\[\\]]*?\\]){1}(\\[(_eq|_neq|_lt|_lte|_gt|_gte|_in|_nin|_null|_nnull|_contains|_ncontains|_between|_nbetween|_empty|_nempty)\\])?=.*?$"
                    }
                }
            },
            "Fields": {
                "description": "Control what fields are being returned in the object.",
                "in": "query",
                "name": "fields",
                "required": false,
                "explode": false,
                "schema": {"type": "array", "items": {"type": "string"}}
            },
            "Mode": {
                "description": "Controls if the API sets a cookie or returns a JWT on successful login.",
                "in": "query",
                "name": "mode",
                "required": true,
                "schema": {"type": "string", "enum": ["jwt", "cookie"]}
            },
            "Export": {
                "name": "export",
                "description": "Saves the API response to a file. Accepts one of \"csv\", \"json\", \"xml\", \"yaml\".",
                "in": "query",
                "required": false,
                "schema": {"type": "string", "enum": ["csv", "json", "xml", "yaml"]}
            },
            "Version": {
                "name": "version",
                "description": "Retrieve an item's state from a specific Content Version. The value corresponds to the \"key\" of the Content Version.\n",
                "in": "query",
                "required": false,
                "schema": {"type": "string"}
            }
        },
        "responses": {
            "NotFoundError": {
                "description": "Error: Not found.",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "error": {
                                    "type": "object",
                                    "properties": {
                                        "code": {"type": "integer", "format": "int64"},
                                        "message": {"type": "string"}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "UnauthorizedError": {
                "description": "Error: Unauthorized request",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "error": {
                                    "type": "object",
                                    "properties": {
                                        "code": {"type": "integer", "format": "int64"},
                                        "message": {"type": "string"}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "KeyAuth": {"type": "apiKey", "in": "query", "name": "access_token"},
            "Auth": {"type": "apiKey", "in": "header", "name": "Authorization"}
        }
    }
} as const;


export type OAS = NormalizeOAS<typeof oas>;

// export type EX = keyof OASPathMap<OAS>

// export type EX1 = OASRequestParams<OAS, "/train/cancel/{companyId}/{tripItemId}", 'post'>
