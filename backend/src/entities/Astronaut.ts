export interface IAstronaut {
    id: number;
    firstname: string;
    lastname: string;
    gender?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

class Astronaut implements IAstronaut {
    public id: number;
    public firstname: string;
    public lastname: string;
    public gender?: boolean;

    constructor(firstnameOrAstronaut: string | IAstronaut, lastname?: string, gender?: boolean, id?: number) {
        if (typeof firstnameOrAstronaut === 'string') {
            this.firstname = firstnameOrAstronaut;
            this.lastname = lastname as string;
            this.gender = gender as boolean;
            this.id = id || -1;
        } else {
            this.id = firstnameOrAstronaut.id;
            this.firstname = firstnameOrAstronaut.firstname;
            this.lastname = firstnameOrAstronaut.lastname;
            this.gender = firstnameOrAstronaut.gender as boolean;
        }
    }
}

export default Astronaut;