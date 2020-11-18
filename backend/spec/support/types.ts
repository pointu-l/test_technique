import { Response } from 'supertest';
import { IAstronaut } from '@entities/Astronaut';


export interface IResponse extends Response {
    body: {
        astronauts: IAstronaut[];
        error: string;
    };
}

export interface IReqBody {
    astronaut?: IAstronaut;
}
