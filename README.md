# Code Bank

A simple digital bank to process credit card transactions.

## codebank

Golang application to receive the transactions.

## store-frontend

Next.js application to order a product.

## Development

### codebank

Change the __*.env*__ file to setup the environment.

Execute __*docker-compose up -d*__ to run a container with the Golang environment.

Execute __*docker exec -it appbank bash*__ to execute the commands inside the container with Golang environment.

Execute __*make gen*__ to generate the gRPC files.

### Simulate a message
Inside the appbank container:

Execute __*evans -r repl -p=50052*__

Execute __*call Payment*__

Fill in the fields and check the Center Control (localhost:9021) to see the message.

### appbank

A container with the following:
- the Golong environment to execute the application.
- evans: a gPRC client 

### store-frontend

Execute __*docker-compose up -d*__ to run a container with the pre-configured environment.

## Kafka

## Nest.js and Next.js

