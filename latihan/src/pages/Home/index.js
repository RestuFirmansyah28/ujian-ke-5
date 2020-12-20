import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {CardUser} from '../../components';
import FIREBASE from '../../config/FIREBASE';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      usersKey: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    FIREBASE.database()
      .ref('User')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let UserItem = {...data};

        this.setState({
          users: UserItem,
          usersKey: Object.keys(UserItem),
        });
      });
  };

  removeUser = (id) => {
    Alert.alert(
      'Info',
      'Yakin ???',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          test: 'Ok',
          onPress: () => {
            FIREBASE.database()
              .ref('User/' + id)
              .remove();
            this.getUsers();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    const {users, usersKey} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>List User</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.listUser}>
          {usersKey.length > 0 ? (
            usersKey.map((key) => (
              <CardUser
                key={key}
                userItems={users[key]}
                id={key}
                {...this.props}
                removeUser={this.removeUser}
              />
            ))
          ) : (
            <Text>User List Kosong</Text>
          )}
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => this.props.navigation.navigate('TambahKontak')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  listUser: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  addBtn: {
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;
