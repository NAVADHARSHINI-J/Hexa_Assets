import { createSlice } from "@reduxjs/toolkit";

const ServiceSlice = createSlice({
    name : "services",
    initialState : {
        services : []
    },
    reducers : {
        setService(state,action){
            state.services = action.payload.ser 
        }
    }
});
export const {setService} = ServiceSlice.actions;
export default ServiceSlice.reducer