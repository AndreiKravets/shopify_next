import {makeAutoObservable} from "mobx";

class Cart_store {
    count = 0
    constructor() {
        makeAutoObservable(this)
    }


    incCount(){
        this.count = this.count + 1
    }
    decCount(){
        this.count = this.count - 1
    }
}

export default new Cart_store()