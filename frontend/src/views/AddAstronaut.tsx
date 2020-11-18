import { AxiosError, AxiosResponse } from 'axios';
import React, { FormEvent, useEffect } from 'react';
import Astronaut from '../models/Astronaut';
import AstronautService from '../services/AstronautService';
import { withRouter } from 'react-router-dom';

declare var $: any;

function AddAstronaut(props: any) {

    function addAstronaut(event: any): void {
        event.preventDefault();
        const formData: FormData = new FormData(event.target);
        console.log("ok")
        if (formData.has('firstname') && formData.has('lastname')) {
            const astronaut: Astronaut = AstronautService.convertForm(formData);
            console.log("ok")
            AstronautService.create(astronaut).then((response: AxiosResponse<Astronaut>) => {
                props.history.replace({ pathname: '/' });
                console.log("ok")
            }).catch((err: AxiosError) => {
                console.error(err);
            });
        }
    }

    useEffect(() => {
        $('.ui.checkbox').checkbox()
        return () => {

        };
    }, []);

    return (
        <div className="ui page grid">
            <div className="one column row">
                <div className="column">
                    <div className="ui inverted segment" style={{ marginTop: "40px" }}>
                        <div className="ui huge header inverted">Ajouter un•e astronaute</div>
                        <div className="ui inverted divider"></div>

                        <form className="ui inverted form" onSubmit={ addAstronaut }>
                            <div className="field">
                                <label>Prénom</label>
                                <input name="firstname" type="text" placeholder="Prénom" />
                            </div>
                            <div className="field">
                                <label>Nom</label>
                                <input name="lastname" type="text" placeholder="Nom" />
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                <input name="gender" type="checkbox" className="hidden" />
                                <label>Femme</label>
                                </div>
                            </div>
                            <button className="ui button" type="submit">Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(AddAstronaut);