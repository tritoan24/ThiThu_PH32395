import{configureStore} from '@reduxjs/toolkit';
import XemayReducer from '../reducers/XemayReducer';

export default configureStore({
    reducer:{
        listXemay: XemayReducer
    }
});   