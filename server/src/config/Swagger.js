const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const doc = {
  info: {
    title: "Travel Website API",
    description: "API documentation for the travel website",
  },
  host: `localhost:8080`,
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; 
const endpointsFiles = [ "../../server"]; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation has been generated!");
});
