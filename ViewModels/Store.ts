export class Store {
    Name: String;
    Branches: Array<String>;
    Logo: String;
    constructor(name: String, branshes: Array<String>, logo: String) {
        this.Name = name;
        this.Branches = branshes;
        this.Logo = logo;
    }
}