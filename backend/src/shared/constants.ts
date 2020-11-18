import { Request } from 'express';
import { IAstronaut } from '@entities/Astronaut';

export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IAstronautRequest extends Request {
    body: {
        astronaut: IAstronaut
    }
}
