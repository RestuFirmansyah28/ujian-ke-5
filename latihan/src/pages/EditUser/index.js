import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      umur: '',
      gender: '',
      status: '',
    };
  }
  componentDidMount() {
    FIREBASE.database()
      .ref('User/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let UserItem = {...data};

        this.setState({
          nama: UserItem.nama,
          umur: UserItem.umur,
          gender: UserItem.gender,
          status: UserItem.status,
        });
      });
  }
  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };
  onSubmit = () => {
    if (
      this.state.nama &&
      this.state.umur &&
      this.state.gender &&
      this.state.status
    ) {
      const userReferensi = FIREBASE.database().ref(
        'User/' + this.props.route.params.id,
      );
      const user = {
        nama: this.state.nama,
        umur: this.state.umur,
        gender: this.state.gender,
        status: this.state.status,
      };

      userReferensi
        .update(user)
        .then((data) => {
          Alert.alert('Suksess', 'User Update');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert('Error', 'Semua wajib di isi');
    }
  };
  render() {
    console.log(this.state.nama);
    return (
      <View style={sytles.pages}>
        <InputData
          label="Nama"
          placeholder="Input nama"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="Umur"
          placeholder="Input Umur"
          keywordType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.umur}
          namaState="umur"
        />
        <InputData
          label="Jenis Kelamin"
          placeholder="Input Jenis Kelamain"
          onChangeText={this.onChangeText}
          value={this.state.gender}
          namaState="gender"
        />
        <InputData
          label="Status"
          placeholder="Input Status"
          onChangeText={this.onChangeText}
          value={this.state.status}
          namaState="status"
        />
        <TouchableOpacity
          style={sytles.BtnAddSumbit}
          onPress={() => this.onSubmit()}>
          <Text style={sytles.textBtnAddSubmit}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const sytles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  BtnAddSumbit: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  textBtnAddSubmit: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});
