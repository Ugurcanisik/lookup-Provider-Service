import { httpStatusCode } from '@constants';

export default class InternalError extends Error {
    httpCode: number;

    constructor(message: string) {
        super(message);

        this.httpCode = httpStatusCode.INTERNAL_SERVER_ERROR;
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}
