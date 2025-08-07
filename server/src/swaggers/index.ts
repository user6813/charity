import rolesSwagger from "./role.swagger";
import permissionSwagger from "./permission.swagger";
import authSwagger from "./auth.swagger";
import { OpenAPIV3 } from "openapi-types";
import userSwagger from "./user.swagger";


const swaggerConfig: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      UserSignup: {
        type: "object",
        required: [
          "firstName", "lastName", "email", "password", "entityName", "entityDescription", "interestRate", "creditLimit", "termCap"
        ],
        properties: {
          firstName: { type: "string", description: "User's first name", minLength: 2, maxLength: 30 },
          lastName: { type: "string", description: "User's last name", minLength: 2, maxLength: 30 },
          email: { type: "string", format: "email", description: "User's email address" },
          password: { type: "string", description: "User's password", minLength: 6, maxLength: 20 },
          entityName: { type: "string", description: "Entity name associated with the user", minLength: 3, maxLength: 50 },
          entityDescription: { type: "string", description: "Description of the entity", minLength: 10, maxLength: 500 },
          interestRate: { type: "number", description: "Interest rate for the user", minimum: 0 },
          creditLimit: { type: "number", description: "Credit limit assigned to the user", minimum: 0 },
          termCap: { type: "number", description: "Term cap for the user", minimum: 0 },
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", description: "User's email address" },
          password: { type: "string", description: "User's password" },
        },
      },
      UserBuySubscription:{
        type: "object",
        required: ["subscriptionId"],
        properties: {
          subscriptionId: { type: "number", description: "SubscriptionId to purchase" },
        },
      },
      Contract: {
        type: "object",
        required: ["preAmount", "termLength", "creditPayment"],
        properties: {
          preAmount: {
            type: "number",
            description: "Pre-amount for the contract",
          },
          termLength: {
            type: "number",
            description: "Term length of the contract",
          },
          creditPayment: {
            type: "number",
            description: "Credit payment amount",
          },
          subscriptionId: {
            type: "number",
            description: "Subscription ID associated with the contract",
          },
        },
      },
      Subscription: {
        type: "object",
        required: ["interestRate", "creditLimit", "subscriptionAmount", "termCap"],
        properties: {
          interestRate: {
            type: "number",
            description: "Interest rate for the subscription",
          },
          creditLimit: {
            type: "number",
            description: "Credit limit for the subscription",
          },
          subscriptionAmount: {
            type: "number",
            description: "Subscription amount",
          },
          termCap: {
            type: "number",
            description: "Term cap for the subscription",
          },
        },
      },
      Role: {
        type: "object",
        required: ["roleName", "roleDescription"],
        properties: {
          roleName: {
            type: "string",
            description: "Name of the role",
          },
          roleDescription: {
            type: "string",
            description: "Description of the role",
          },
        },
      },
      Permission: {
        type: "object",
        required: ["action", "baseUrl", "method", "path"],
        properties: {
          action: {
            type: "string",
            description: "The action associated with the permission",
          },
          baseUrl: {
            type: "string",
            description: "The base URL associated with the permission",
          },
          method: {
            type: "string",
            description: "The HTTP method for the permission",
          },
          path: {
            type: "string",
            description: "The endpoint path for the permission",
          },
        },
      },
      Kick: {
        type: "object",
        required: ["maturity", "kickName", "totalReceived", "totalFinanced", "contractIds"],
        properties: {
          maturity: {
            type: "string",
            format: "date-time",
            description: "Maturity date of the kick",
          },
          kickName: {
            type: "string",
            description: "Name of the kick",
          },
          totalReceived: {
            type: "number",
            description: "Total amount received",
          },
          totalFinanced: {
            type: "number",
            description: "Total financed amount",
          },
          contractIds: {
            type: "array",
            items: {
              type: "number",
            },
            description: "List of contract IDs associated with the kick",
          },
        },
      },
      UpdateKick: {
        type: "object",
        properties: {
          maturity: {
            type: "string",
            format: "date-time",
            description: "Updated maturity date of the kick",
          },
          kickName: {
            type: "string",
            description: "Updated name of the kick",
          },
          totalReceived: {
            type: "number",
            description: "Updated total amount received",
          },
          totalFinanced: {
            type: "number",
            description: "Updated total financed amount",
          },
          contractIds: {
            type: "array",
            items: {
              type: "number",
            },
            description: "Updated list of contract IDs",
          },
        },
      },
      UpdateKickByAdmin: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["pending", "approved", "rejected"],
            description: "Status of the kick",
          },
        },
      },
    },
  },
  paths: {
    ...((authSwagger.paths || {}) as OpenAPIV3.PathsObject),
    ...((rolesSwagger.paths || {}) as OpenAPIV3.PathsObject),
    ...((permissionSwagger.paths || {}) as OpenAPIV3.PathsObject),
    ...((userSwagger.paths || {}) as OpenAPIV3.PathsObject),
  },
  tags: [
    ...(rolesSwagger.tags || []),
    ...(permissionSwagger.tags || []),
    ...(authSwagger.tags || []),
    ...(userSwagger.tags || []),
  ],
};

export default swaggerConfig;
