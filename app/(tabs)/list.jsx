import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Modal,
  Button,
  ScrollView,
  Alert,
} from 'react-native';

const destinations = [
  {
    id: '1',
    name: 'Eiffel Tower, Paris',
    description: 'Iconic iron tower offering stunning views.',
    image: 'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Statue of Liberty, New York',
    description: 'Symbol of freedom and democracy in the U.S.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-JOGJtEYVDbgqJS4vqsRM6xtDbUXg_2XN0g&s',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Great Wall of China',
    description: 'Ancient wall offering breathtaking views.',
    image: 'https://justhistoryposts.com/wp-content/uploads/2017/07/great-wall-of-china-fact.jpg?w=1170',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Colosseum, Rome',
    description: 'Famous ancient arena with guided tours.',
    image: 'https://cdn.mos.cms.futurecdn.net/BiNbcY5fXy9Lra47jqHKGK-1200-80.jpg',
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Sydney Opera House',
    description: 'Architectural marvel with performances.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsT8nI1D-kwg9szg31Ge6HHn5uGbNjzyWb0Q&s',
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Big Ben, London',
    description: 'Iconic clock tower in Westminster.',
    image: 'https://cdn.britannica.com/89/187589-004-9E6F1BB7/Workers-Big-Ben-London.jpg',
    rating: 4.6,
  },
  {
    id: '7',
    name: 'Machu Picchu, Peru',
    description: 'Stunning Incan citadel in the Andes.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqi-dOHJewgWadlyW80eVVhCtzQMLXL6o71A&s',
    rating: 4.9,
  },
  {
    id: '8',
    name: 'Taj Mahal, India',
    description: 'A beautiful marble mausoleum.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd85JMR2A8uc_l_-hV1dLCbTy3g9cXbN1fvg&s',
    rating: 4.9,
  },
  {
    id: '9',
    name: 'Santorini, Greece',
    description: 'Famous for sunsets and beautiful beaches.',
    image: 'https://res.cloudinary.com/enchanting/q_70,f_auto,w_600,h_400,c_fit/ymt-web/2023/01/600x400-Santorini20Greece20Sunset.jpg',
    rating: 4.8,
  },
  {
    id: '10',
    name: 'Christ the Redeemer, Brazil',
    description: 'Iconic statue with panoramic views.',
    image: 'https://www.fodors.com/wp-content/uploads/2022/07/HERO-shutterstock_1283692720.jpg',
    rating: 4.7,
  },
];

const TravelList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scaleValue] = useState(new Animated.Value(1));
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // State to handle booking confirmation

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (destination) => {
    setSelectedDestination(destination);
    setBookingConfirmed(false); // Reset booking confirmation when selecting a new destination
  };

  const handleBook = (destination) => {
    setBookingConfirmed(true); // Set booking confirmation state to true
    Alert.alert("Booking", "Your booking for " + destination.name + " has been confirmed!");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Text style={styles.ratingText}>Rating: {item.rating} ★</Text>
        <Button title="Book Now" onPress={() => handleBook(item)} color="#e67e22" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Destinations</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search destinations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDestinations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.noResults}>No destinations found.</Text>}
      />
      {selectedDestination && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={() => setSelectedDestination(null)}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Image source={{ uri: selectedDestination.image }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedDestination.name}</Text>
            <Text style={styles.modalDescription}>{selectedDestination.description}</Text>
            <Text style={styles.ratingText}>Rating: {selectedDestination.rating} ★</Text>
            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={() => setSelectedDestination(null)} color="#bdc3c7" />
            </View>
            {bookingConfirmed && ( // Show confirmation message if booked
              <Text style={styles.confirmationText}>Your booking is confirmed!</Text>
            )}
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#34495e',
  },
  searchInput: {
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    color: '#34495e',
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  ratingText: {
    fontSize: 16,
    color: '#f39c12',
    marginTop: 5,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#e74c3c',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
    color: '#34495e',
  },
  modalDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  confirmationText: {
    marginTop: 20,
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
});

export default TravelList;
