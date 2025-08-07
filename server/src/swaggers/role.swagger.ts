const roleSwagger = {
    tags: [
      {
        name: "Roles",
        description: "API for managing roles",
      },
    ],
    paths: {
      "/api/role": {
        get: {
          summary: "Get all roles",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Successfully retrieved roles.",
            },
            500: {
              description: "Internal server error.",
            },
          },
        },
        post: {
          summary: "Create a new role",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Role" },
              },
            },
          },
          responses: {
            201: { description: "Role created successfully." },
            400: { description: "Invalid input." },
            500: { description: "Internal server error." },
          },
        },
      },
      "/api/role/{id}": {
        get: {
          summary: "Get role by ID",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Successfully retrieved role." },
            404: { description: "Role not found." },
            500: { description: "Internal server error." },
          },
        },
        put: {
          summary: "Update an existing role",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Role" },
              },
            },
          },
          responses: {
            200: { description: "Role updated successfully." },
            400: { description: "Invalid input." },
            404: { description: "Role not found." },
            500: { description: "Internal server error." },
          },
        },
        delete: {
          summary: "Delete a role",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            204: { description: "Role deleted successfully." },
            404: { description: "Role not found." },
            500: { description: "Internal server error." },
          },
        },
      },
      "/api/role/restore/{id}": {
        put: {
          summary: "Restore a deleted role",
          tags: ["Roles"],
          security: [{ BearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Role restored successfully." },
            404: { description: "Role not found." },
            500: { description: "Internal server error." },
          },
        },
      },
    },
  };
  
  export default roleSwagger;