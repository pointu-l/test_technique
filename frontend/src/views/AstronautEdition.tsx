import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useAstronautDetails from '../hooks/useAstronautDetails';
import Astronaut from '../models/Astronaut';
import AstronautService from '../services/AstronautService';

declare var $: any;

interface AstronautEditionProps {
    astronautId: number;
}

let originalName = "";

function AstronautEdition(props: any) {
    const { astronautId } = props.location.state;

    const [ astronaut, setAstronautDetails ]: [Astronaut, (astronaut: Astronaut) => void] = useAstronautDetails({ astronautId });

    useEffect(() => {
        $('.ui.checkbox').checkbox(astronaut.gender ? 'check' : 'uncheck')
    }, []);

    function editAstronaut() {
        AstronautService.update(astronaut).then(() => {
            props.history.replace({ pathname: '/' });
        }).catch((err: AxiosError) => console.error(err));
    }

    return (
        <div className="ui page grid">
            <div className="one column row">
                <div className="column">
                    <div className="ui segments" style={{ marginTop: "40px" }}>
                        <div className="ui inverted segment">
                            <div className="ui huge header inverted">Modifier {astronaut.gender ? 'Mme' : 'Mr'} {originalName}</div>
                            <div className="ui inverted divider"></div>
                        </div>

                        <div className="ui inverted segment">
                            <div className="ui grid">
                                <div className="two columns row">
                                    <div className="column">
                                        <div className="ui large basic label">Prénom</div>
                                        <div className="ui input">
                                            <input type="text" placeholder="Search..." value={ astronaut.firstname } onChange={ (event) => setAstronautDetails({...astronaut, firstname: event.target.value}) }/>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="ui large basic label">Nom</div>
                                        <div className="ui input">
                                            <input type="text" placeholder="Search..." value={ astronaut.lastname } onChange={ (event) => setAstronautDetails({...astronaut, lastname: event.target.value}) }/>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="ui large basic label">Genre</div>
                                        <div className="field" style={{display: 'inline'}}>
                                            <div className="ui checkbox">
                                            <input name="gender" type="checkbox" className="hidden" onChange={ (event) => setAstronautDetails({...astronaut, gender: event.target.value === 'on' ? true : false}) } />
                                            <label>Femme</label>
                                            </div>
                                        </div>

                                        <br />
                                        <br />
                                        <div className="ui button" onClick={ editAstronaut }>Modifier</div>

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

export default withRouter(AstronautEdition as any);