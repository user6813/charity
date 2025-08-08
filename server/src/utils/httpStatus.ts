import httpStatus from "http-status";
import {  Response } from "express";

const OK = (res: Response, result: any) => {
    return res.status(httpStatus.OK).json(result);
};

const CREATED = (res: Response, result: any) => {
    return res.status(httpStatus.CREATED).json(result);
};

const ACCEPTED = (res: Response, result: any) => {
    return res.status(httpStatus.ACCEPTED).json(result);
};

const NO_CONTENT = (res: Response) => {
    return res.status(httpStatus.NO_CONTENT).send();
};

const BAD_REQUEST = (res: Response, result: any) => {
    return res.status(httpStatus.BAD_REQUEST).json(result);
};

const UNAUTHORIZED = (res: Response, result: any) => {
    return res.status(httpStatus.UNAUTHORIZED).json(result);
};

const FORBIDDEN = (res: Response, result: any) => {
    return res.status(httpStatus.FORBIDDEN).json(result);
};

const NOT_FOUND = (res: Response, result: any) => {
    return res.status(httpStatus.NOT_FOUND).json(result);
};

const INTERNAL_SERVER_ERROR = (res: Response, result: any) => {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(result);
};

const NOT_IMPLEMENTED = (res: Response, result: any) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).json(result);
};

const SERVICE_UNAVAILABLE = (res: Response, result: any) => {
    return res.status(httpStatus.SERVICE_UNAVAILABLE).json(result);
};

// Exporting all status code functions
export default {
    OK,
    CREATED,
    ACCEPTED,
    NO_CONTENT,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE
};
