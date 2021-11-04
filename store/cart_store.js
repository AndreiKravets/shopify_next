import {makeAutoObservable} from "mobx";

class Cart_store {
    count = 0
    constructor() {
        makeAutoObservable(this)
    }

    setCount(e){
        this.count = e
    }
    incCount(){
        this.count = this.count + 1
    }
    decCount(){
        this.count = this.count - 1
    }
}

export default new Cart_store()