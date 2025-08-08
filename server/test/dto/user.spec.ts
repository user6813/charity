import 'jest';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../../src/dto/user';

describe('UserDto Validation', () => {
    test('should pass validation with valid data', async () => {
        const validData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'securePass123',
            entityName: 'TechCorp',
            entityDescription: 'A tech startup.',
            interestRate: 5.5,
            creditLimit: 10000,
            termCap: 12
        };
        const dtoInstance = plainToInstance(UserDto, validData);
        const errors = await validate(dtoInstance);
        expect(errors.length).toBe(0);
    });

    test('should fail validation with missing required fields', async () => {
        const invalidData = {};
        const dtoInstance = plainToInstance(UserDto, invalidData);
        const errors = await validate(dtoInstance);
        expect(errors).not.toHaveLength(0);
    });

    test('should fail validation with invalid email format', async () => {
        const invalidData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'invalid-email',
            password: 'securePass123',
            entityName: 'TechCorp',
            entityDescription: 'A tech startup.',
            interestRate: 5.5,
            creditLimit: 10000,
            termCap: 12
        };
        const dtoInstance = plainToInstance(UserDto, invalidData);
        const errors = await validate(dtoInstance);
        expect(errors).not.toHaveLength(0);
    });

    test('should fail validation with short password', async () => {
        const invalidData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: '123',
            entityName: 'TechCorp',
            entityDescription: 'A tech startup.',
            interestRate: 5.5,
            creditLimit: 10000,
            termCap: 12
        };
        const dtoInstance = plainToInstance(UserDto, invalidData);
        const errors = await validate(dtoInstance);
        expect(errors).not.toHaveLength(0);
    });
});
