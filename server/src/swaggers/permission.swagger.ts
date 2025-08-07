const permissionSwagger = {
    tags: [
      {
        name: "Permissions",
        description: "API for managing permissions",
      },
    ],
    paths: {
      "/api/permission": {
        get: {
          summary: "Get all permissions",
          tags: ["Permissions"],
          security: [{ BearerAuth: [] }],
          responses: {
            200: {
              description: "Successfully retrieved permissions.",
            },
            500: {
              description: "Internal server error.",
            },
          },
        },
        post: {
          summary: "Create a new permission",
          tags: ["Permissions"],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Permission" },
              },
            },
          },
          responses: {
            201: { description: "Permission created successfully." },
            400: { description: "Invalid input." },
            500: { description: "Internal server error." },
          },
        },
      },
      "/api/permission/{id}": {
        get: {
          summary: "Get permission by ID",
          tags: ["Permissions"],
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
            200: { description: "Successfully retrieved permission." },
            404: { description: "Permission not found." },
            500: { description: "Internal server error." },
          },
        },
        put: {
          summary: "Update an existing permission",
          tags: ["Permissions"],
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
                schema: { $ref: "#/components/schemas/Permission" },
              },
            },
          },
          responses: {
            200: { description: "Permission updated successfully." },
            400: { description: "Invalid input." },
            404: { description: "Permission not found." },
            500: { description: "Internal server error." },
          },
        },
        delete: {
          summary: "Delete a permission",
          tags: ["Permissions"],
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
            204: { description: "Permission deleted successfully." },
            404: { description: "Permission not found." },
            500: { description: "Internal server error." },
          },
        },
      },
      "/api/permission/restore/{id}": {
        put: {
          summary: "Restore a deleted permission",
          tags: ["Permissions"],
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
            200: { description: "Permission restored successfully." },
            404: { description: "Permission not found." },
            500: { description: "Internal server error." },
          },
        },
      },
    },
  };
  
  export default permissionSwagger;
  