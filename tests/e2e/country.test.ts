import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import app from '../../src/app';
import request from 'supertest';

const wait = (timeout: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });

before(async () => {
    console.log('Wait For DB Start');
    await wait(15000);
    console.log('Wait For DB End');
});

describe('Countries Api Tests', () => {
    describe('Get Countries', () => {
        it('Get countries should return 200', async () => {
            const { body } = await request(app).get('/api/v1/countries/list').expect(200);

            expect(body).to.have.property('data').to.be.an('object');
            expect(body.data).to.have.property('countries').to.be.an('array').that.is.not.empty;
            body.data.countries.forEach((branch: any) => {
                expect(branch).to.have.property('id').to.be.a('string');
                expect(branch).to.have.property('code').to.be.a('number');
                expect(branch).to.have.property('name').to.be.a('number');
                expect(branch).to.have.property('flag').to.be.a('string');
                expect(branch).to.have.property('setCurrencySymbol').to.be.a('string');
            });
        });
    });
});
