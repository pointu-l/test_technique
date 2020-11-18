import StatusCodes from 'http-status-codes';
const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;

import { Request, Response, Router } from 'express';

import AstronautDao, { IAstronautDao } from '@daos/Astronaut/AstronautDao';
import { paramMissingError, IAstronautRequest } from '@shared/constants';
import Astronaut from '@entities/Astronaut';


const expressRouter: Router = Router();
const astronautDao: AstronautDao = new AstronautDao();

expressRouter.get('', async (req: Request, res: Response) => {
    const astronauts: Astronaut[] = await astronautDao.getAllOrderByFirstname();
    return res.status(OK).json(astronauts);
});

expressRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const astronaut: Astronaut|null = await astronautDao.getOne(Number(id));
    if (!astronaut) {
        return res.status(NOT_FOUND)
            .json({ error: 'Data is missing' })
        ;
    }

    return res.status(OK).json(astronaut);
});

expressRouter.post('', async (req: IAstronautRequest, res: Response) => {
    const { astronaut } = req.body;
    console.log(astronaut)
    if (!astronaut) {
        return res.status(BAD_REQUEST)
            .json({ error: paramMissingError })
        ;
    }

    await astronautDao.add(astronaut);
    return res.status(CREATED).end();
});

expressRouter.put('', async (req: IAstronautRequest, res: Response) => {
    const { astronaut } = req.body;
    console.log(astronaut)
    if (!astronaut) {
        return res.status(BAD_REQUEST)
            .json({ error: paramMissingError })
        ;
    }

    await astronautDao.update(astronaut);
    return res.status(OK).end();
});

expressRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    await astronautDao.delete(Number(id));
    return res.status(OK).end();
})

export default expressRouter;