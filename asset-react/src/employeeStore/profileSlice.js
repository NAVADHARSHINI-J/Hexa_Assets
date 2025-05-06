import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({

    name:"profile",
    initialState:{
        profile:{}
    },
    reducers:{

        setProfile(state, action){
            state.profile = action.payload //here the reducer update the state with the dispatched data from action
        }
    }
})

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;