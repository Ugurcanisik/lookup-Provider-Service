import { Postgres } from '@database';

const getCountries = async () => Postgres.entities.country.findAll({});

const createCountry = async (country: object) => Postgres.entities.country.create({ ...country });

export { getCountries, createCountry };
