import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      state.items=[...state.items,action.payload]
    },
    removeFromBasket: (state, action) => {
      //remove item
      const index=state.items.findIndex(
        (basketItem)=>basketItem.id===action.payload.id
        )
        //console.log('action: ',action)
        let newBasket=[...state.items]
        if (index>=0){
          // men item exist in basket
          newBasket.splice(index,1)
        }
        else{
          console.warn('cannot remove product id: '+action.payload.id+' as it isnot in basket')
        }
        state.items=newBasket
      },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal=(state)=>state.basket.items.reduce((total,item)=>total+item.price,0)

export default basketSlice.reducer;
