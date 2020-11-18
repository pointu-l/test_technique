import React from 'react';
import { Link } from 'react-router-dom';

import Astronaut from '../models/Astronaut';
import useAstronautsList from '../hooks/useAstronautsList';
import AstronautRow from '../components/AstronautRow';

export default function Home() {
    // const astronauts: Astronaut[] = useAstronautsList();
    const [ astronauts, forceReload ]: [ Astronaut[], () => void ] = useAstronautsList();
    function onAstronautRowDelete() {
        forceReload();
    }

    return (
        <div>
            <div className="ui page grid">
                <div className="one column row">
                    <div className="column">
                        <div className="ui segments" style={{ marginTop: "40px" }}>
                            <div className="ui inverted segment">
                                <div className="ui huge header inverted">Liste des astronautes</div>
                                <Link to={{ pathname: '/add-astronaut' }} className="ui icon right labeled inverted button" style={{ position: 'absolute', right: '10px', top: '12px' }}>Ajouter <i className="ui icon plus"></i></Link>
                                <div className="ui inverted section divider"></div>
                            </div>

                            { astronauts.map((astronaut: Astronaut) => <AstronautRow key={ astronaut.id } astronaut={ astronaut } onDelete={ onAstronautRowDelete } />) }
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}