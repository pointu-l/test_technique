import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import Astronaut from '../models/Astronaut';
import AstronautService from '../services/AstronautService';

function useAstronautsList(): [ Astronaut[], () => void] {
    const [ astronautsList, setAstronautsList ] = useState([]);

    useEffect(() => {
        
        fetchDatas();

        return () => {

        };
    }, []);

    function fetchDatas() {
        AstronautService.getAll().then((response: AxiosResponse<Astronaut[]>) => {
            console.log(response.data)
            setAstronautsList(response.data as [])
        });
    }
    
    return [ astronautsList, fetchDatas ];
}

export default useAstronautsList;