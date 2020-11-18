import { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import Astronaut from '../models/Astronaut';
import AstronautService from '../services/AstronautService';

function useAstronautDetails(defaultState: { astronautId: number }): any {
    const [ astronautDetails, setAstronautDetails ] = useState({});

    useEffect(() => {
        
        AstronautService.getFromId(defaultState.astronautId).then((response: AxiosResponse<Astronaut>) => {
            setAstronautDetails(response.data as any);
        }).catch((err: AxiosError) => {

        });

        return () => {

        };
    }, [defaultState]);
    
    return [ astronautDetails, setAstronautDetails ];
}

export default useAstronautDetails;