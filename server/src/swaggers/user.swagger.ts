const userSwagger = {
    tags: [
      {
        name: "Users",
        description: "API for managing users",
      },
    ],
    paths: {
      "/api/user": {
        get: {
          summary: "Get all users",
          tags: ["Users"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Successfully retrieved users.",
            },
            500: {
              description: "Internal server error.",
            },
          },
        },
      },
      "/api/user/{id}": {
        get: {
          summary: "Get user by ID",
          tags: ["Users"],
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
            200: { description: "Successfully retrieved user." },
            404: { description: "User not found." },
            500: { description: "Internal server error." },
          },
        },
        put: {
          summary: "Update an existing user",
          tags: ["Users"],
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
            200: { description: "User updated successfully." },
            400: { description: "Invalid input." },
            404: { description: "User not found." },
            500: { description: "Internal server error." },
          },
        },
        delete: {
          summary: "Delete a user",
          tags: ["Users"],
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
            204: { description: "User deleted successfully." },
            404: { description: "User not found." },
            500: { description: "Internal server error." },
          },
        },
      },
    },
  };
  
  export default userSwagger;
  