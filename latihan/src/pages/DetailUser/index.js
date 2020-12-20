import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

export class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('User/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let UserItem = {...data};

        this.setState({
          user: UserItem,
        });
      });
  }
  render() {
    const {user} = this.state;
    return (
      <View style={styles.pages}>
        <Text>Nama:</Text>
        <Text>{user.nama}</Text>

        <Text>Umur:</Text>
        <Text>{user.umur}</Text>

        <Text>Gender:</Text>
        <Text>{user.gender}</Text>

        <Text>Status:</Text>
        <Text>{user.status}</Text>
      </View>
    );
  }
}

export default UserDetails;

const styles = StyleSheet.create({
  pages: {
    padding: 20,
    margin: 30,
    backgroundColor: 'white',
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
