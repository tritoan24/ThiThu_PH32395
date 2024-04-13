import {createAsyncThunk} from '@reduxjs/toolkit';
import { addXemay } from '../reducers/XemayReducer';

const api_Uri = 'http://192.168.0.104:3000/XeMay';

export const fetchXeMay = () =>{
    return async (dispatch)=>{
        try{
            const response = await fetch(api_Uri);
            const data = await response.json();
            data.forEach(element => {
                dispatch(addXemay(element));
                // console.log(element);
            });
        }
        catch(e){
            console.log(e);
        }
    }
}
export const deleteXemayApi = createAsyncThunk(
    'xemay/deleteXemayApi',
    async (id,thunkAPI) => {
        try{
            const response = await fetch(`${api_Uri}/${id}`,{
                method:'DELETE',
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json(); // Phân tích cú pháp JSON từ phản hồi lỗi
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const addXemayApi = createAsyncThunk(
    'xemay/addXemayApi',
    async (newXemay,thunkApi)=>{
        try{
            const response = await fetch(api_Uri,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(newXemay),
            });
            if(response.ok){
                const data = await response.json();
                return data;
            }
            else{
                const errorData = await response.json();
                return thunkApi.rejectWithValue(errorData);
            }
        }catch(e){
            return thunkApi.rejectWithValue(e.message);
        }
    }
)
export const updateXemayApi = createAsyncThunk(
    'xemay/updateXemayApi',
    async(xemay,thunkAPI)=>{
        try{
            const response = await fetch(`${api_Uri}/${xemay.id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(xemay.data)
            });
            const data = await response.json();
            if(response.ok){
                return data;
            }else{
                const errData = await response.json();
                return thunkAPI.rejectWithValue(errData);
            }
        }catch(e){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)


