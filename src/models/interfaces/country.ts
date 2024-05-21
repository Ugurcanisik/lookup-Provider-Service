import { ICountryCSV } from '@models/interfaces';

interface ICountry {
    id: string;
    type: string;
    code: string;
    order: number;
    active: boolean;
    content: ICountryCSV;
    version: number;
    createdAt: Date;
}

export default ICountry;
