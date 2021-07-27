export class User {
    firstName: string;
    lastName: string;

    public getFullName() {
        return this.firstName + ' ' + this.lastName
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}