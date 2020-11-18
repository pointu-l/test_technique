import React from 'react';
import useAstronautDetails from '../hooks/useAstronautDetails';
import Astronaut from '../models/Astronaut';

interface AstronautDetailsProps {
    astronautId: number;
}

function AstronautDetails(props: { location: { state: AstronautDetailsProps } }) {
    const { astronautId } = props.location.state;

    const [ astronaut, setAstronaut ]: [Astronaut, (astronaut: Astronaut) => void] = useAstronautDetails({ astronautId });

    return (
        <div className="ui page grid">
            <div className="one column row">
                <div className="column">
                    <div className="ui segments" style={{ marginTop: "40px" }}>
                        <div className="ui inverted segment">
                            <div className="ui huge header inverted">{astronaut.gender ? 'Mme' : 'Mr'} {astronaut.lastname}</div>
                            <div className="ui inverted divider"></div>
                        </div>

                        <div className="ui inverted segment">
                            <div className="ui grid">
                                <div className="two columns row">
                                    <div className="column">
                                        <div className="ui large label">Prénom</div><div className="ui large label basic">{astronaut.firstname}</div>
                                        <br />
                                        <br />
                                        <div className="ui large label">Nom</div><div className="ui large label basic">{astronaut.lastname}</div>
                                        <br />
                                        <br />
                                        <div className="ui large label">Genre</div><div className="ui large label basic">{astronaut.gender ? 'Femme' : 'Homme'}</div>
                                    </div>
                                </div>

                                <div className="one columns row">
                                    <div className="column right aligned">
                                        <div className="ui button icon inverted">
                                            <i className="ui icon orange pencil inverted"></i>
                                        </div>
                                        <div className="ui button icon inverted">
                                            <i className="ui recycle red icon inverted"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AstronautDetails;