import 'jest';
import { Request } from 'express';
import { ValidateInput } from '../../src/utils/validate';
import { GlobalResponse } from '../../src/types/global';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

jest.mock('class-validator');
jest.mock('class-transformer');

describe('ValidateInput Utility Function', () => {
    class MockDto {
        property!: string;
    }

    let mockData: any;

    beforeEach(() => {
        mockData = { property: 'test' };
    });

    test('should validate and return success', async () => {
        (plainToInstance as jest.Mock).mockReturnValue(mockData);
        (validate as jest.Mock).mockResolvedValue([]);

        const result: GlobalResponse = await ValidateInput(MockDto, mockData);

        expect(plainToInstance).toHaveBeenCalledWith(MockDto, mockData);
        expect(validate).toHaveBeenCalledWith(mockData);
        expect(result).toEqual({ success: true, data: mockData });
    });

    test('should return validation error', async () => {
        const mockErrors = [{ property: 'property', constraints: { isNotEmpty: 'property should not be empty' } }];
        (plainToInstance as jest.Mock).mockReturnValue(mockData);
        (validate as jest.Mock).mockResolvedValue(mockErrors);

        const result: GlobalResponse = await ValidateInput(MockDto, mockData);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Validation Error');
        expect(result.error).toContain('property should not be empty');
    });
});
