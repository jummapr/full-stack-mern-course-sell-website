import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, subscriptionReducer, userReducer } from './reducer/userReducer';
import { courseReducer } from './reducer/courseReducer';
import { adminReducer } from './reducer/adminReducer';
import { otherReducer } from './reducer/otherReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        courses: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer
    }
});
export const server = "https://mern-course-hp4v.onrender.com/api/v1" 

export default store;

