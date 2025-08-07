import 'jest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import HttpResponse from '../../src/utils/httpStatus';

describe('HttpResponse', () => {
    let res: Partial<Response>;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('should return OK status', () => {
        HttpResponse.OK(res as Response, { message: 'Success' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
        expect(res.json).toHaveBeenCalledWith({ message: 'Success' });
    });

    test('should return CREATED status', () => {
        HttpResponse.CREATED(res as Response, { message: 'Resource created' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
        expect(res.json).toHaveBeenCalledWith({ message: 'Resource created' });
    });

    test('should return NO_CONTENT status', () => {
        HttpResponse.NO_CONTENT(res as Response);
        expect(res.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
        expect(res.send).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST status', () => {
        HttpResponse.BAD_REQUEST(res as Response, { error: 'Bad request' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({ error: 'Bad request' });
    });

    test('should return UNAUTHORIZED status', () => {
        HttpResponse.UNAUTHORIZED(res as Response, { error: 'Unauthorized' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.UNAUTHORIZED);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    test('should return FORBIDDEN status', () => {
        HttpResponse.FORBIDDEN(res as Response, { error: 'Forbidden' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.FORBIDDEN);
        expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    });

    test('should return NOT_FOUND status', () => {
        HttpResponse.NOT_FOUND(res as Response, { error: 'Not found' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.NOT_FOUND);
        expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });

    test('should return INTERNAL_SERVER_ERROR status', () => {
        HttpResponse.INTERNAL_SERVER_ERROR(res as Response, { error: 'Server error' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
        expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });

    test('should return SERVICE_UNAVAILABLE status', () => {
        HttpResponse.SERVICE_UNAVAILABLE(res as Response, { error: 'Service unavailable' });
        expect(res.status).toHaveBeenCalledWith(httpStatus.SERVICE_UNAVAILABLE);
        expect(res.json).toHaveBeenCalledWith({ error: 'Service unavailable' });
    });
});
