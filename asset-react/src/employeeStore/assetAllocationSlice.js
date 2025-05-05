import { createSlice } from "@reduxjs/toolkit"; 

//This initializes a new slice named assetAllocationSlice
const assetAllocationSlice = createSlice({ //defines state, actions, and reducers
   //Specifies the name of this slice.
    name:"assetAllocation",
    initialState:{
        assetAllocation:[] //defines  the default value of the state for this slice
    },
    reducers:{ // the reducers — pure functions to update the state
        //Reducers listen for dispatched actions and apply changes to the state accordingly
        //Defines a reducer function named setAssetAllocation
        setAssetAllocation(state, action){
            state.assetAllocation =action.payload.assetAllocation //here the reducer update the state with the dispatched data from action
        }
    }
})

export const {setAssetAllocation} = assetAllocationSlice.actions;
export default assetAllocationSlice.reducer;