import { AxiosResponse } from 'axios';
import http from '../http';
import Astronaut from '../models/Astronaut';

class AstronautService {

    public getAll(): Promise<AxiosResponse<Astronaut[]>> {
        return http.get('astronauts');
    }

    public getFromId(id: number): Promise<AxiosResponse<Astronaut>> {
        return http.get(`astronauts/${id}`);
    }

    public create(astronaut: Astronaut): Promise<AxiosResponse<Astronaut>> {
        return http.post('astronauts', { astronaut });
    }

    public update(astronaut: Astronaut): Promise<AxiosResponse<Astronaut>> {
        return http.put('astronauts', { astronaut });
    }

    public delete(id: number): Promise<AxiosResponse<Astronaut>> {
        return http.delete(`astronauts/${id}`);
    }

    public convertForm(form: FormData): Astronaut {
        let obj: {[key: string]: any} = {};
        for (var key of form.keys()) {
            obj[key] = form.get(key);
        }
        obj.gender = obj.gender === 'on' ? true : false;
        return obj as Astronaut;
    };
}

export default new AstronautService();