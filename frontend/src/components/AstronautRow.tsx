import React from 'react';
import { Link } from 'react-router-dom';
import Astronaut from '../models/Astronaut';
import AstronautService from '../services/AstronautService';

export default function AstronautRow(props: { astronaut: Astronaut, onDelete: () => void}) {
    const astronaut: Astronaut = props.astronaut;

    return (
        <div className="ui inverted segment">
            <div className="ui grid">
                <div className="two column row middle aligned">
                    <div className="column thirteen wide">
                        <div className="ui header inverted">{astronaut.firstname} {astronaut.lastname.toUpperCase()} </div>
                    </div>
                    <div className="column three wide right aligned">
                        <div className="ui buttons">
                            <Link to={{ pathname: 'astronaut-details', state: { astronautId: astronaut.id } }} className="ui button icon inverted">
                                <i className="ui eye green icon inverted"></i>
                            </Link>
                            <Link to={{ pathname: 'astronaut-edition', state: { astronautId: astronaut.id } }} className="ui button icon inverted">
                                <i className="ui icon orange pencil inverted"></i>
                            </Link>
                            <div className="ui button icon inverted" onClick={() => AstronautService.delete(astronaut.id).then(() => props.onDelete())}>
                                <i className="ui recycle red icon inverted"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}