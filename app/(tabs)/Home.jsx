import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo-vector-icons installed

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null); // New state for selected destination

  const destinations = [
    {
      name: 'Paris',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1400&h=1400&s=1',
      description: 'The city of lights, known for its art, fashion, and culture.',
    },
    {
      name: 'New York',
      image: 'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg',
      description: 'The Big Apple, famous for its skyline and vibrant city life.',
    },
    {
      name: 'Tokyo',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXlSi-lKXieIiTqaWM7GqGLiunVAiIflSKDxp0NIEzibp5A8K46PtdFAMZcF2zaniuJRY&usqp=CAU',
      description: 'A bustling metropolis blending tradition with modernity.',
    },
    // Add more destinations as needed...
  ];

  const trendingDeals = [
    {
      name: 'Dubai',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmjPqgDmxrY--K2UpPnXf1Oj1tkx9qzk1lBg&s',
      description: 'Experience luxury shopping and ultramodern architecture.',
    },
    {
      name: 'London',
      image: 'https://cdn.uniacco.com/blog/wp-content/uploads/2019/12/09124221/17-tourists-places-to-visit-in-london.jpg',
      description: 'The capital city of England, rich in history and culture.',
    },
    // Add more deals as needed...
  ];

  // Filter destinations based on search query
  const filteredDestinations = searchQuery
    ? destinations.filter(destination =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : destinations;

  const handleSeeMore = () => {
    Linking.openURL('https://yourwebsite.com/more-destinations'); // Replace with your website link
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleReserve = (destination) => {
    setSelectedDestination(destination); // Set the selected destination
  };

  const confirmReservation = () => {
    if (selectedDestination) {
      const reservationUrl = `https://yourwebsite.com/reserve?destination=${encodeURIComponent(selectedDestination.name)}`;
      Linking.openURL(reservationUrl).catch(err => console.error("Failed to open reservation URL:", err));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Discover Your Next Adventure</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search destinations..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query state on input change
        />
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
          <Ionicons name="close-circle" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsContainer}>
        {filteredDestinations.map((destination, index) => (
          <TouchableOpacity key={index} style={styles.destinationCard} onPress={() => handleReserve(destination)}>
            <Image source={{ uri: destination.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <Text style={styles.destinationDescription}>{destination.description}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleReserve(destination)} // Added onPress handler
              >
                <Text style={styles.detailsButtonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedDestination && ( // Render the selected destination details
        <View style={styles.selectedDestinationContainer}>
          <Text style={styles.selectedDestinationTitle}>{selectedDestination.name}</Text>
          <Image source={{ uri: selectedDestination.image }} style={styles.selectedDestinationImage} />
          <Text style={styles.selectedDestinationDescription}>{selectedDestination.description}</Text>
          <TouchableOpacity style={styles.reserveButton} onPress={confirmReservation}>
            <Text style={styles.reserveButtonText}>Reserve This Place</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>Trending Deals</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsContainer}>
        {trendingDeals.map((deal, index) => (
          <TouchableOpacity key={index} style={styles.dealCard}>
            <Image source={{ uri: deal.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.destinationName}>{deal.name}</Text>
              <Text style={styles.destinationDescription}>{deal.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.offersTitle}>Special Offers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersContainer}>
        <View style={styles.offerCard}>
          <Text style={styles.offer}>50% off on selected flights!</Text>
        </View>
        <View style={styles.offerCard}>
          <Text style={styles.offer}>Book now and save on hotels!</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
        <Text style={styles.seeMoreText}>See More Destinations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  clearButton: {
    marginLeft: 10,
  },
  destinationsContainer: {
    marginBottom: 20,
  },
  destinationCard: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: 160,
    marginVertical: 5,
  },
  dealsContainer: {
    marginBottom: 20,
  },
  dealCard: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0f7fa',
    elevation: 5,
    width: 160,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  destinationDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDestinationContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  selectedDestinationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDestinationImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  selectedDestinationDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  reserveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  offersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  offersContainer: {
    marginBottom: 20,
  },
  offerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginRight: 10,
    width: 200,
    justifyContent: 'center',
  },
  offer: {
    fontSize: 16,
    color: '#d9534f',
    textAlign: 'center',
  },
  seeMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
