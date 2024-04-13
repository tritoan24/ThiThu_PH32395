import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TextInputCs from '../Customcomponents/TextInputCs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {addXemayApi} from '../redux/actions/XemayAction';

const Add = ({navigation}) => {
  const [tenxe, settenxe] = useState('');
  const [giatien, setgiatien] = useState('');
  const [mauSac, setmauSac] = useState('');
  const [moTa, setmoTa] = useState('');
  const [hinhAnh, sethinhAnh] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Fi9Gbyr8Jqs3kJRmRN_COp831bOoLKRi-gcX4BJ9cw&s',
  );

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

  const dispatch = useDispatch();

  const handleAdd = () => {
    let data = {
      id: Math.random().toString(),
      ten_xe_ph32395: tenxe,
      mau_sac_ph32395: mauSac,
      gia_ban_ph32395: giatien,
      mo_ta_ph32395: moTa,
      hinh_anh_ph32395: hinhAnh,
    };
    if (!tenxe || !mauSac || !giatien || !moTa) {
      ToastAndroid.show('Vui long nhap day du thong tin', ToastAndroid.SHORT);
      return;
    }
    dispatch(addXemayApi(data));
    setgiatien('');
    settenxe('');
    setmauSac('');
    setmoTa('');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
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
        <TextInputCs placeholder="Mo Ta" onChangeText={setmoTa} value={moTa} />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
            onPress={handleAdd}
            style={{
              backgroundColor: '#ec6200',
              padding: 10,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
              width: 80,
            }}>
            <Text>Them</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
