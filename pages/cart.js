import React from "react"
import MainContainer from "../components/MainContainer";
import cart_store from "../store/cart_store";
import products_store from "../store/products_store";
import {observer} from "mobx-react-lite";
import { toJS } from 'mobx';

const Cart = observer(()=>  {
    products_store.getProducts()
    console.log(toJS(products_store.allProducts))
    if(products_store.getProducts == 1){
        return (
           <h1>weit</h1>
        )
    }
    else {
    return (
        <MainContainer title={'cart'}>

            <div className="container">
                <h1>Cart</h1>
                <button onClick={()=> cart_store.decCount()}>-</button>
                {cart_store.count}
                <button onClick={()=> cart_store.incCount()}>+</button>
            </div>
        </MainContainer>
    )}
})

export default Cart