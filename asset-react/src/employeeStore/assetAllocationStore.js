import { configureStore } from "@reduxjs/toolkit";
import assetAllocationSlice from "./assetAllocationSlice";
import liquidAssetAllocationSlice from "./liquidAssetAllocationSlice";

const store = configureStore({ //store holds the state
    reducer:{
        //assetAllocation - state by reducer        //assetAllocationSlice - the reducer exported in slice and is the reducer (handling the state logic) 
        assetAllocation: assetAllocationSlice, //registering the reducer
        liquidAssetAllocation: liquidAssetAllocationSlice
    }
})

export default store;