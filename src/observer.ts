export default class Observer{
    data:any;

    constructor(data:any) {
        this.data = data;
    }

    public update(data: any){
        console.log(`updated: ${this.data}->${data}`);
        this.data = data;
    }
}