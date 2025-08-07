import 'jest';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PermissionDto, UpdatePermissionDto } from '../../src/dto/permission';

describe('PermissionDto Validation', () => {
    test('should pass validation with valid data', async () => {
        const validData = {
            action: 'read',
            baseUrl: '/api/permission',
            method: 'GET',
            path: '/list'
        };
        const dtoInstance = plainToInstance(PermissionDto, validData);
        const errors = await validate(dtoInstance);
        expect(errors.length).toBe(0);
    });

    test('should fail validation with missing fields', async () => {
        const invalidData = {};
        const dtoInstance = plainToInstance(PermissionDto, invalidData);
        const errors = await validate(dtoInstance);
        expect(errors.length).toBeGreaterThan(0);
    });
});

describe('UpdatePermissionDto Validation', () => {
    test('should pass validation with empty object', async () => {
        const dtoInstance = plainToInstance(UpdatePermissionDto, {});
        const errors = await validate(dtoInstance);
        expect(errors.length).toBe(0);
    });
});
