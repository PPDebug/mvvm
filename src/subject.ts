import Observer from "./observer";
export default class Subject {
    observers: Observer[];

    constructor(){
        this.observers = [];
    }

    public attach(o: Observer){
        let index = this.observers.findIndex(item => item.data===o.data);
        if (index>=0) return; 
        this.observers.push(o);
    }

    public dettach(o: Observer){
        this.observers.filter(function(item){
            return item !== o;
        })
    }

    public notify(newVal: any){
        this.observers.forEach(o => {
            o.update(newVal);
        })
    }


}