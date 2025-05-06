import { createSlice } from "@reduxjs/toolkit";


const liquidAssetAllocationSlice = createSlice({
    name:"liquidAssetAllocation",
    initialState:{
        liquidAssetAllocation:[]
    },
    reducers:{

        setLiquidAssetAllocation(state, action){
            state.liquidAssetAllocation = action.payload.liquidAssetAllocation
        }
    }
})

export const {setLiquidAssetAllocation} = liquidAssetAllocationSlice.actions;
export default liquidAssetAllocationSlice.reducer; 