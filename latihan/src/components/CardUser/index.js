import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {faEdit,faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const CardUser = ({id, userItems, navigation, removeUser}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('UserDetails', {id: id})}>
      <View>
        <Text style={styles.nama}>{userItems.nama}</Text>
        <Text style={styles.nama}>{userItems.umur}</Text>
        <Text style={styles.nama}>{userItems.gender}</Text>
        <Text style={styles.nama}>{userItems.status}</Text>
      </View>
      <View style={styles.icon}>
        <FontAwesomeIcon
          icon={faEdit}
          color={'orange'}
          size={25}
          onPress={() => navigation.navigate('EditUser', {id: id})}/>
        <FontAwesomeIcon
          icon={faTimes}
          color={'red'}
          size={25}
          onPress={() => removeUser(id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardUser;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
