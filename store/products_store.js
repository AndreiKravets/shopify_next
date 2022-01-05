import {makeAutoObservable} from "mobx";
import {client} from "../utils/shopify";




class Products_store {



    count = 0;
    allProducts = 1;
    allCollections = "1";

    constructor() {
        makeAutoObservable(this)
    }
    setAllProduct(products){
        this.allProducts = products;
    }
    async getProducts(){
        if(this.allProducts == 1){
            const products = await client.product.fetchAll();
            const allProduct = JSON.parse(JSON.stringify(products));
            this.allProducts = allProduct;
        }
    }
    async getAllCollections(){
        if(this.allCollections == 1){
            const collections = await client.collection.fetchAllWithProducts();
            const allCollections = JSON.parse(JSON.stringify(collections));
            this.allCollections = allCollections;
        }
    }
}

export default new Products_store();