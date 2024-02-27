import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "Crossfit WOD API", version: "1.0.0" },
    },
    apis: ["./v1/routes/index.js"],
  };
  
  // Docs in JSON format
  const swaggerSpec = swaggerJSDoc(options);
  
  // Function to setup our docs
  const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use("/api/v1/docs", serve, setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    console.log(
      `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
  };
  
  export default  swaggerDocs ;