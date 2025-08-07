import 'jest';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RoleDto, UpdateRoleDto } from '../../src/dto/role';

describe('RoleDto Validation', () => {
    test('should pass validation with valid data', async () => {
        const validData = {
            roleName: 'Admin',
            roleDescription: 'Administrator role'
        };
        const dtoInstance = plainToInstance(RoleDto, validData);
        const errors = await validate(dtoInstance);
        expect(errors.length).toBe(0);
    });

    test('should fail validation with missing fields', async () => {
        const invalidData = {};
        const dtoInstance = plainToInstance(RoleDto, invalidData);
        const errors = await validate(dtoInstance);
        expect(errors.length).toBeGreaterThan(0);
    });
});

describe('UpdateRoleDto Validation', () => {
    test('should pass validation with empty object', async () => {
        const dtoInstance = plainToInstance(UpdateRoleDto, {});
        const errors = await validate(dtoInstance);
        expect(errors.length).toBe(0);
    });
});
