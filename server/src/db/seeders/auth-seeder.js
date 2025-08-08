'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Role", [
      {
        role_name: 'superAdmin',
        role_description: 'Super Admin role',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: 'admin',
        role_description: 'Admin role',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: 'user',
        role_description: 'User role',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Permission", [
      {
        action: 'User Signup',
        base_url: '/api/auth',
        method: 'POST',
        path: '/signup',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'User Login',
        base_url: '/api/auth',
        method: 'POST',
        path: '/login',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'User Logout',
        base_url: '/api/auth',
        method: 'POST',
        path: '/logout',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get Current User',
        base_url: '/api/auth',
        method: 'GET',
        path: '/me',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Reset Password',
        base_url: '/api/auth',
        method: 'POST',
        path: '/password/reset',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get All Permission',
        base_url: '/api/permission',
        method: 'GET',
        path: '/',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get Permission By Id',
        base_url: '/api/permission',
        method: 'GET',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Create Permission',
        base_url: '/api/permission',
        method: 'POST',
        path: '/',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Update Permission By Id',
        base_url: '/api/permission',
        method: 'PUT',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Delete Permission By Id',
        base_url: '/api/permission',
        method: 'DELETE',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Restore Permission By Id',
        base_url: '/api/permission/restore',
        method: 'PUT',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get All Roles',
        base_url: '/api/role',
        method: 'GET',
        path: '/',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get Role By Id',
        base_url: '/api/role',
        method: 'GET',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Create Role',
        base_url: '/api/role',
        method: 'POST',
        path: '/',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Update Role By Id',
        base_url: '/api/role',
        method: 'PUT',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Delete Role By Id',
        base_url: '/api/role',
        method: 'DELETE',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Restore Role By Id',
        base_url: '/api/role/restore',
        method: 'PUT',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get Role Permission',
        base_url: '/api/role-permission',
        method: 'GET',
        path: '/:roleId',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Update Role Permission',
        base_url: '/api/role-permission',
        method: 'PUT',
        path: '/:roleId',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get All Users',
        base_url: '/api/user',
        method: 'GET',
        path: '/',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Get User By Id',
        base_url: '/api/user',
        method: 'GET',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Update User By Id',
        base_url: '/api/user',
        method: 'PUT',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        action: 'Delete User By Id',
        base_url: '/api/user',
        method: 'DELETE',
        path: '/id',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('User', [
      {
        first_name: "SuperAdmin",
        last_name: "User",
        email: "superadmin@gmail.com",
        role_id: 1,
        password: "$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@gmail.com",
        role_id: 2,
        password: "$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "User",
        last_name: "User",
        email: "user@gmail.com",
        role_id: 3,
        password: "$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('RolePermission', [
     
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Role", {});
    await queryInterface.dropTable("Permission", {});
    await queryInterface.dropTable("User", {});
  }
};
