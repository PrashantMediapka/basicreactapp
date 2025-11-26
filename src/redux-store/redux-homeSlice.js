import { createSlice } from '@reduxjs/toolkit';

//this is slice  for Homepage
const homeSlice = createSlice({
    name: 'home',
    initialState: { status : 'idle' }, //this is shared DATA object accessed across components using useSelector
    reducers: {
        setStatus: (state, action) => {  //this is shared METHOD to set shared DATA object across components using useDispatch
            state.status = action.payload;  
        },

    },
});

    export const {setStatus} = homeSlice.actions;
    export default homeSlice.reducer;

    //2. CreateStore to combine all above slices in redux-store.js
    //3. Add redux Provider in App.tsx & pass redux store to all components