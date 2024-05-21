import * as path from 'path';
import * as fs from 'fs';
import { country as countryRepository } from '@repositories';
import { CountryDetail } from '@models/classes';
import { ICountry, ICountryCSV } from '@models/interfaces';
import { publishMessage } from '../queue/producers';
import { queue as queueConstants } from '@constants';
import { parse } from 'csv-parse';
import countriesJSON from '../../data/countries.json';

const getCountries = async () => {
    const countries = await countryRepository.getCountries();

    return countries.map((country) => fillCountryDetailResponse(country));
};

// TODO CVS file cannot build but this function working on development
const getCountryFromCSV = async () => {
    const csvFilePath = path.resolve(__dirname, '../../data/countries.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    const headers = [
        'id',
        'name',
        'iso3',
        'iso2',
        'numeric_code',
        'phone_code',
        'capital',
        'currency',
        'currency_name',
        'currency_symbol',
        'tld',
        'native',
        'region',
        'region_id',
        'subregion',
        'subregion_id',
        'nationality',
        'timezones',
        'latitude',
        'longitude',
        'emoji',
        'emojiU'
    ];

    const parser = parse(fileContent, {
        delimiter: ',',
        columns: headers
    });

    const countries = await parser.toArray();

    // headers removed
    countries.shift();

    return countries;
};

const bulkCreateCountries = async () => {
    // TODO cannot build CSV file
    // const countries = await getCountryFromCSV();

    const countries = countriesJSON;
    const promises = [];

    for (const country of countries) {
        const prepareBody = {
            type: 'country',
            code: country.iso2,
            order: country.id,
            active: true,
            content: {
                id: country.id,
                name: country.name,
                iso3: country.iso3,
                iso2: country.iso2,
                numericCode: country.numeric_code,
                phoneCode: country.phone_code,
                capital: country.capital,
                currency: country.currency,
                currencyName: country.currency_name,
                currencySymbol: country.currency_symbol,
                tld: country.tld,
                native: country.native,
                region: country.region,
                regionId: country.region_id,
                subregion: country.subregion,
                subregionId: country.subregion_id,
                nationality: country.nationality,
                timezones: country.timezones,
                latitude: country.latitude,
                longitude: country.longitude,
                emoji: country.emoji,
                emojiU: country.emojiU
            },
            version: 1
        };
        promises.push(
            publishMessage({
                topic: queueConstants.TOPIC.createCountryEvents,
                exchange: queueConstants.EXCHANGE.routingFailed,
                message: prepareBody
            })
        );
    }
    await Promise.all(promises);
};

const createCountry = async (country: object) => countryRepository.createCountry(country);

const fillCountryDetailResponse = (country: ICountry) => {
    const countryDetail = new CountryDetail();

    countryDetail.setID(country.id);
    countryDetail.setCode(country.code);
    countryDetail.setName(country.content.name);
    countryDetail.setFlag(country.content.emoji);
    countryDetail.setCurrencySymbol(country.content.currencySymbol);

    return countryDetail;
};

export { getCountries, bulkCreateCountries, createCountry };
