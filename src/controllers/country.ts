import { httpStatusCode } from '@constants';
import { Response, Request } from 'express';
import { country as countryService } from '@services';
import { BaseResponse, InternalError } from '@models/classes';
import { Logger } from '@helpers';

const getCountries = async (req: Request, res: Response) => {
    try {
        const countries = await countryService.getCountries();

        return res.status(httpStatusCode.OK).json(
            new BaseResponse({
                data: { countries }
            })
        );
    } catch (error) {
        Logger.error('Get Countries Error', { error });
        if (error instanceof InternalError) {
            return res.status(error.httpCode).json(new BaseResponse({ error }));
        }
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(new BaseResponse());
    }
};

export { getCountries };
