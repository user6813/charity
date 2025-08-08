const authSwagger = {
  tags: [
    {
      name: "Authentication",
      description: "User authentication APIs",
    },
  ],
  paths: {
    "/api/auth/signup": {
      post: {
        summary: "Register a new user",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserSignup" },
            },
          },
        },
        responses: {
          201: { description: "User created successfully" },
          400: { description: "Invalid input" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "User login",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLogin" },
            },
          },
        },
        responses: {
          200: { description: "Successfully logged in" },
          400: { description: "Invalid credentials" },
        },
      },
    },
  },
};

export default authSwagger;