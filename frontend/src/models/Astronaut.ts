
export default class Astronaut {
    public id!: number;

    constructor(
        public firstname: string,
        public lastname: string,
        public gender: boolean,
        public createdAt: Date,
        public updatedAt: Date,
    ) {

    }
}