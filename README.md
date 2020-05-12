# NestJS Microservice

Testing microservices with nestJS framework.

## Architecture

1. API Gateway - at the front line, responsible to dispatch all api calls to the right service. The API Gateway is a hybrid application, one that both listens for HTTP requests, as well as makes use of connected microservices.

- https://www.nginx.com/blog/building-microservices-using-an-api-gateway/
- https://sdtimes.com/apis/securing-microservices-the-api-gateway-authentication-and-authorization/

2. Microservices with and without auth access. Accessed through TCP messaging between API Gateway and Service...
