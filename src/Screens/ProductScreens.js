import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchXeMay, deleteXemayApi, updateXemayApi} from '../redux/actions/XemayAction';
import TextInputCs from '../Customcomponents/TextInputCs';
import { launchImageLibrary} from 'react-native-image-picker';
import Bannercs from '../Customcomponents/Bannercs';

const ProductScreens = ({navigation}) => {
  //lay du lieu ve
  const [numColumns, setNumColumns] = useState(2);
  const dispatch = useDispatch();
  const listXemay = useSelector(state => state.listXemay.listXemay);
  //an hien modal
  const [modal, setmodal] = useState(false);
  //edit
  const [tenxe, settenxe] = useState('');
  const [giatien, setgiatien] = useState('');
  const [mauSac, setmauSac] = useState('');
  const [moTa, setmoTa] = useState('');
  const [hinhAnh, sethinhAnh] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Fi9Gbyr8Jqs3kJRmRN_COp831bOoLKRi-gcX4BJ9cw&s',
  );
  const [idEdit, setidEdit] = useState('')

  useEffect(() => {
    dispatch(fetchXeMay());
  }, []);

  // xoa du lieu

  const deleteXemay = id => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa mục này không?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteXemayApi(id));
          ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  //choice image
  const choiceImage = () => {
    const options = {
      skipBackup: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, Response => {
      if (!Response.didCancel && !Response.error) {
        sethinhAnh(Response.assets[0].uri);
      }
    });
  };
  const openModal = item => {
    settenxe(item.ten_xe_ph32395);
    setgiatien(item.gia_ban_ph32395.toString());
    setmauSac(item.mau_sac_ph32395);
    setmoTa(item.mo_ta_ph32395);
    sethinhAnh(item.hinh_anh_ph32395);
    setmodal(true);
    setidEdit(item.id)
  };

  const handleUpdate = ()=>{
    let data = {
        ten_xe_ph32395: tenxe,
        mau_sac_ph32395: mauSac,
        gia_ban_ph32395: giatien,
        mo_ta_ph32395: moTa,
        hinh_anh_ph32395: hinhAnh,
      };
      dispatch(updateXemayApi({id: idEdit,data:data}))
      .then((result)=>{
        console.log(result)
        setgiatien('');
        settenxe('');
        setmauSac('');
        setmoTa('');
        setidEdit(null)
        ToastAndroid.show('Update thành công', ToastAndroid.SHORT);
        setmodal(!modal);

      })
      .catch((e)=>{
        console.log('thaat bai:' +e)
      })
  }

  const renderItem = ({item}) => {

    return (
      <View style={styles.containerItem}>
        <Image
          source={{uri: item.hinh_anh_ph32395}}
          style={{width: 140, height: 100}}
        />
        <Text>{item.ten_xe_ph32395}</Text>
        <Text>{item.mau_sac_ph32395}</Text>
        <Text>{item.gia_ban_ph32395}</Text>
        <Text>{item.mo_ta_ph32395}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => deleteXemay(item.id)}
            style={{
              backgroundColor: 'blue',
              padding: 5,
              borderRadius: 5,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={{
              backgroundColor: 'blue',
              padding: 5,
              borderRadius: 5,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{color: 'white'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <Bannercs uri = 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1440'/>
      <FlatList
        data={listXemay}
        renderItem={renderItem}
        keyExtractor={item => item.id + numColumns}
        numColumns={2}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={{
          backgroundColor: '#ec6200',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          elevation: 5,
        }}>
        <Text>Them Xe</Text>
      </TouchableOpacity>

      {/*modal edit*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setmodal(!modal);
        }}>
        <View style={styles.containermodal}>
          <View style={styles.containercon}>
            <Text>Add Car</Text>
            <TouchableOpacity onPress={choiceImage} style={styles.choiceimage}>
              <Image style={styles.hinhanh} source={{uri: hinhAnh}} />
            </TouchableOpacity>
            <TextInputCs
              placeholder="Tên Xe"
              onChangeText={settenxe}
              value={tenxe}
            />
            <TextInputCs
              placeholder="Mau Xe"
              onChangeText={setmauSac}
              value={mauSac}
            />
            <TextInputCs
              placeholder="Gia Tien"
              onChangeText={setgiatien}
              value={giatien.toString()} // Chuyển đổi giá trị thành chuỗi
              keyboardType="numeric" // Hiển thị bàn phím số
            />
            <TextInputCs
              placeholder="Mo Ta"
              onChangeText={setmoTa}
              value={moTa}
            />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => setmodal(!modal)}
                style={{
                  backgroundColor: '#ff2525',
                  padding: 10,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  width: 80,
                }}>
                <Text>Huy</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={handleUpdate}
                style={{
                  backgroundColor: '#ec6200',
                  padding: 10,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  width: 80,
                }}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  containerItem: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //css modal
  containermodal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containercon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    padding: 15,
  },
  choiceimage: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    elevation: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 170,
    margin: 20,
  },
  hinhanh: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
});
