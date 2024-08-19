# Installation Instructions

Run

```sh
docker compose up --build
```

# Swagger API Docs

```sh
http://localhost:3000/doc
```


# Testing Scenarios
Gateways

```sh
1-Create a Gateway: POST /gateways
Endpoint to create a new gateway.

2- Retrieve Gateway by ObjectID: GET /gateways/:gatewayId
Endpoint to fetch a gateway using its ObjectID.

3-List All Gateways: GET /gateways
Endpoint to retrieve all gateways.
```

Peripherals

```sh
4-Create a Peripheral: POST /peripherals
Endpoint to create a new peripheral.

5-Retrieve Peripheral by ObjectID: GET /peripherals/:peripheralId
Endpoint to fetch a peripheral using its ObjectID.

6-List All Peripherals: GET /peripherals
Endpoint to retrieve all peripherals.

7-Remove Peripheral from Gateway: PATCH /peripherals/:peripheralId
Endpoint to remove a peripheral from a gateway.

8-Add Peripheral to Gateway: PATCH /peripherals/:peripheralId/gateway/:gatewayId
Endpoint to add a peripheral to a gateway.
```
Note: use swagger in http://localhost:3000/doc to call the apis directly