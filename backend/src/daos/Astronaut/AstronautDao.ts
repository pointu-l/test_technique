import Astronaut, { IAstronaut } from '@entities/Astronaut';
import { PrismaClient } from '@prisma/client'

export interface IAstronautDao {
    getAll: () => Promise<IAstronaut[]>;
    getOne: (id: number) => Promise<IAstronaut | null>;
    add: (astronaut: IAstronaut) => Promise<IAstronaut>;
    update: (astronaut: IAstronaut) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class AstronautDao implements IAstronautDao {
    private client: PrismaClient = new PrismaClient();

    public getAll(): Promise<IAstronaut[]> {
        return this.getAllOrderBy();
    }

    private getAllOrderBy(orderBy: {}[] = []): Promise<IAstronaut[]> {
        return this.client.astronaut.findMany({ orderBy, select: { id: true, firstname: true, lastname: true } });
    }

    public getAllOrderByFirstname(): Promise<IAstronaut[]> {
        return this.getAllOrderBy([{ firstname: 'desc' }])
    }

    public getOne(id: number): Promise<IAstronaut | null> {
        return this.client.astronaut.findOne({ where: { id } });
    }

    public async add(newAstronaut: IAstronaut): Promise<IAstronaut> {
        const astronaut: Astronaut =
            await this.client.astronaut.create({ data: newAstronaut as any }) as Astronaut
        ;

        return Promise.resolve(astronaut);
   }

   public async update(astronaut: IAstronaut): Promise<void> {
        const data = {
            firstname: astronaut.firstname,
            lastname: astronaut.lastname,
            gender: astronaut.gender,
        };

        await this.client.astronaut.update({
            where: { id: astronaut.id },
            data,
        })
        return Promise.resolve(undefined);
   }

   public async delete(id: number): Promise<void> {
        await this.client.astronaut.delete({ where: { id }});
        return Promise.resolve(undefined);
   }
}

export default AstronautDao;