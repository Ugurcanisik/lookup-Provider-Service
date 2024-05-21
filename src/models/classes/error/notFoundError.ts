import InternalError from './internalError';
import { httpStatusCode } from '@constants';

export default class NotFoundError extends InternalError {
    httpCode: number;

    constructor(message: string) {
        super(message);

        this.httpCode = httpStatusCode.NOT_FOUND;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
