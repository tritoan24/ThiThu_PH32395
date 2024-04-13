import {createSlice} from '@reduxjs/toolkit';
import {
  deleteXemayApi,
  addXemayApi,
  updateXemayApi,
} from '../actions/XemayAction';
import {ToastAndroid} from 'react-native';

const initialState = {
  listXemay: [],
};

const XemaySlice = createSlice({
  name: 'xemay',
  initialState,
  reducers: {
    addXemay(state, action) {
      const newXemay = action.payload;
      state.listXemay.push(newXemay);
    },
    deleteXemay(state, action) {
      state.listXemay = state.listXemay.filter(
        row => row.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteXemayApi.fulfilled, (state, action) => {
        // Xóa todo cụ bộ trên store để không phải load lại danh sách
        state.listXemay = state.listXemay.filter(
          row => row.id !== action.payload,
        );
      })
      .addCase(deleteXemayApi.rejected, (state, action) => {
        console.log('Delete todo rejected:', action.payload); // In ra thông tin lỗi
        state.error = action.payload;
      });

    builder
      .addCase(addXemayApi.fulfilled, (state, action) => {
        state.listXemay.push(action.payload);
        ToastAndroid.show('Them thanh cong', ToastAndroid.SHORT);
      })
      .addCase(addXemayApi.rejected, (state, action) => {
        console.log('Add todo rejected:', action.payload); // In ra thông tin lỗi
        state.error = action.payload;
      });

    builder.addCase(updateXemayApi.fulfilled, (state, action) => {
      const {
        id,
        ten_xe_ph32395,
        mau_sac_ph32395,
        gia_ban_ph32395,
        mo_ta_ph32395,
        hinh_anh_ph32395,
      } = action.payload;

      const xemay = state.listXemay.find(row => row.id ===id);

      if(xemay){
        xemay.ten_xe_ph32395 = ten_xe_ph32395;
        xemay.mau_sac_ph32395 = mau_sac_ph32395;
        xemay.gia_ban_ph32395 = gia_ban_ph32395;
        xemay.mo_ta_ph32395 = mo_ta_ph32395;
        xemay.hinh_anh_ph32395 = hinh_anh_ph32395;
      }
    })
    .addCase(updateXemayApi.rejected,(state,action)=>{
        console.log("false,",action.error.message);
    })
  },
});

export const {addXemay} = XemaySlice.actions;
export default XemaySlice.reducer;
