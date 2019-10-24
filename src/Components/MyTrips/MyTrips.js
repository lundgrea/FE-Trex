import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { fetchMyTrips } from '../../util/apiCalls';

export default class MyTrips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {id: 1},
      trips: [],
      error: ''
    }
  }
  
  generateTripsElements = () => {
    const {navigate} = this.props.navigation;
    return this.state.trips.map(trip => {
      return (
        <TouchableOpacity key={trip.name} style={styles.tripButton}>
        <Text onPress={() => navigate('Trip')} style={styles.text} key={trip.name}>{trip.name}</Text>
      </TouchableOpacity>
      )
    })
  }
  
  
  componentDidMount = async  () => {
    

    try {
      let trips = await fetchMyTrips(this.state.user.id)
      this.setState({ trips })
      console.log(this.state)

    } catch (error) {
      this.setState({error: 'There was an error fetching your trips.'})
      console.log(this.state)
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return(
      
      <View style={styles.container}>

        <Header />

        <ScrollView>
          <Text style={styles.title}>My Trips</Text>
          <View>
            {this.state.trips.length > 0 && this.generateTripsElements()}
          </View>
          <TouchableOpacity style={styles.addTripButton}>
            <Text style={styles.text} onPress={() => navigate('TripForm')}>Add a New Trip</Text>
          </TouchableOpacity>
        </ScrollView>
  
        <Footer navigate={navigate} />

        
    </View>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  }, 
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
    
  }, 
  text: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    paddingVertical: 10
  },
  tripButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginVertical: 10
  },
  addTripButton: {
    backgroundColor: '#1C4263',
    borderWidth: 1,
    borderColor: 'white', 
    color: 'white',
    borderRadius: 8,
    backgroundColor: '#1C4263'
  }
})
