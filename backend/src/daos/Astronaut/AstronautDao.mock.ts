import { IAstronaut } from '@entities/Astronaut';
import { getRandomInt } from '@shared/functions';
import { IAstronautDao } from './AstronautDao';
import MockDaoMock from '../MockDb/MockDao.mock';



class UserDao extends MockDaoMock implements IAstronautDao {


    public async getOne(id: number): Promise<IAstronaut | null> {
        const db = await super.openDb();
        for (const user of db.users) {
            if (user.id === id) {
                return user;
            }
        }
        return Promise.resolve(null);
    }


    public async getAll(): Promise<IAstronaut[]> {
        const db = await super.openDb();
        return db.users;
    }


    public async add(newAstronaut: IAstronaut): Promise<IAstronaut> {
        const db = await super.openDb();
        newAstronaut.id = getRandomInt();
        db.users.push(newAstronaut);
        await super.saveDb(db);
        return Promise.resolve(newAstronaut);
    }


    public async update(user: IAstronaut): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === user.id) {
                db.users[i] = user;
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }


    public async delete(id: number): Promise<void> {
        const db = await super.openDb();
        for (let i = 0; i < db.users.length; i++) {
            if (db.users[i].id === id) {
                db.users.splice(i, 1);
                await super.saveDb(db);
                return;
            }
        }
        throw new Error('User not found');
    }
}

export default UserDao;