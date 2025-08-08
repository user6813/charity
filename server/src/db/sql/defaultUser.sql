-- 1️⃣ Insert roles if not exists
INSERT INTO "Role" (role_name, role_description, created_at, updated_at)
SELECT 'superadmin', 'Super Admin role', NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM "Role" WHERE role_name = 'superadmin'
);

INSERT INTO "Role" (role_name, role_description, created_at, updated_at)
SELECT 'admin', 'Admin role', NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM "Role" WHERE role_name = 'admin'
);

INSERT INTO "Role" (role_name, role_description, created_at, updated_at)
SELECT 'user', 'User role', NOW(), NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM "Role" WHERE role_name = 'user'
);

-- 2️⃣ Insert default users based on roles

-- SuperAdmin
INSERT INTO "User" (first_name, last_name, email, role_id, password, created_at, updated_at)
SELECT 'SuperAdmin', 'User', 'superadmin@gmail.com', r.id,
       '$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2',
       NOW(), NOW()
FROM "Role" r
WHERE r.role_name = 'superadmin'
  AND NOT EXISTS (
    SELECT 1 FROM "User" WHERE email = 'superadmin@gmail.com'
);

-- Admin
INSERT INTO "User" (first_name, last_name, email, role_id, password, created_at, updated_at)
SELECT 'Admin', 'User', 'admin@gmail.com', r.id,
       '$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2',
       NOW(), NOW()
FROM "Role" r
WHERE r.role_name = 'admin'
  AND NOT EXISTS (
    SELECT 1 FROM "User" WHERE email = 'admin@gmail.com'
);

-- User
INSERT INTO "User" (first_name, last_name, email, role_id, password, created_at, updated_at)
SELECT 'User', 'User', 'user@gmail.com', r.id,
       '$2b$10$uUKG4e0k980H6HZFKwxPaOk/z0sDSD2uskTrliMprtX/LKXZCPRw2',
       NOW(), NOW()
FROM "Role" r
WHERE r.role_name = 'user'
  AND NOT EXISTS (
    SELECT 1 FROM "User" WHERE email = 'user@gmail.com'
);
