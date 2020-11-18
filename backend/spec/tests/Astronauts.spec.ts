import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import AstronautDao from '@daos/Astronaut/AstronautDao.mock';
import Astronaut, { IAstronaut } from '@entities/Astronaut';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';
import { IReqBody, IResponse } from '../support/types';



describe('Astronauts Routes', () => {

    const astronautsPath = '/api/astronauts';
    const getAstronautsPath = `${astronautsPath}/`;
    const addAstronautsPath = `${astronautsPath}/`;
    const updateAstronautPath = `${astronautsPath}/`;
    const deleteAstronautPath = `${astronautsPath}/:id`;

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getAstronautsPath}"`, () => {

        it(`should return a JSON object with all the astronauts and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const astronauts = [
                new Astronaut('Sean Maxwell', 'sean.maxwell@gmail.com'),
                new Astronaut('John Smith', 'john.smith@gmail.com'),
                new Astronaut('Gordan Freeman', 'gordan.freeman@gmail.com'),
            ];
            spyOn(AstronautDao.prototype, 'getAll').and.returnValue(Promise.resolve(astronauts));
            // Call API
            agent.get(getAstronautsPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'Astronaut' objects
                    const respAstronauts = res.body.astronauts;
                    const retAstronauts: Astronaut[] = respAstronauts.map((astronaut: IAstronaut) => {
                        return new Astronaut(astronaut);
                    });
                    expect(retAstronauts).toEqual(astronauts);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not fetch astronauts.';
            spyOn(AstronautDao.prototype, 'getAll').and.throwError(errMsg);
            // Call API
            agent.get(getAstronautsPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });


    describe(`"POST:${addAstronautsPath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.post(addAstronautsPath).type('form').send(reqBody);
        };

        const astronautData = {
            astronaut: new Astronaut('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            // Setup Spy
            spyOn(AstronautDao.prototype, 'add');
            // Call API
            agent.post(addAstronautsPath).type('form').send(astronautData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the astronaut param was missing.`, (done) => {
            // Call API
            callApi({})
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not add astronaut.';
            spyOn(AstronautDao.prototype, 'add').and.throwError(errMsg);
            // Call API
            callApi(astronautData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${updateAstronautPath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.put(updateAstronautPath).type('form').send(reqBody);
        };

        const astronautData = {
            astronaut: new Astronaut('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(AstronautDao.prototype, 'update').and.returnValue(Promise.resolve());
            // Call Api
            callApi(astronautData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the astronaut param was missing.`, (done) => {
            // Call api
            callApi({})
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const updateErrMsg = 'Could not update astronaut.';
            spyOn(AstronautDao.prototype, 'update').and.throwError(updateErrMsg);
            // Call API
            callApi(astronautData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });

    describe(`"DELETE:${deleteAstronautPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteAstronautPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(AstronautDao.prototype, 'delete').and.returnValue(Promise.resolve());
            // Call api
            callApi(5)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const deleteErrMsg = 'Could not delete astronaut.';
            spyOn(AstronautDao.prototype, 'delete').and.throwError(deleteErrMsg);
            // Call Api
            callApi(1)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
});
