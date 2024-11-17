import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

// Notification Component
const Notification = ({ title, city, flightDate, ticketInfo, isPastTrip, imageUrl }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={[styles.title, isPastTrip && styles.pastTripTitle]}>{title}</Text>
        <Text style={styles.text}>✈️ Traveling to: {city}</Text>
        <Text style={styles.text}>🗓️ Flight Date: {flightDate}</Text>
        <Text style={styles.text}>🧳 Ticket Info: {ticketInfo}</Text>
      </View>
      <View style={[styles.statusIndicator, isPastTrip ? styles.pastTrip : styles.upcomingTrip]} />
    </TouchableOpacity>
  );
};

// Main App Component
const App = () => {
  const trips = [
    {
      title: 'Upcoming Trip Notification',
      city: 'Barcelona',
      flightDate: 'March 25, 2025',
      ticketInfo: 'Flight Number: UV123, Class: First Class, Price: $1400',
      imageUrl: 'https://i.pinimg.com/564x/4d/ed/02/4ded02b55ca28b9170b40c39708cfee6.jpg',
    },
    {
      title: 'Upcoming Trip Notification',
      city: 'New York',
      flightDate: 'October 15, 2024',
      ticketInfo: 'Flight Number: AB123, Class: Economy, Price: $250',
      imageUrl: 'https://i.pinimg.com/564x/0b/45/83/0b458370cbd8fa7011b2868473c94185.jpg',
    },
    {
      title: 'Past Trip Notification',
      city: 'Los Angeles',
      flightDate: 'August 20, 2024',
      ticketInfo: 'Flight Number: CD456, Class: Business, Price: $500',
      isPastTrip: true,
      imageUrl: 'https://i.pinimg.com/564x/07/f9/84/07f98429810a6e31bcf51a13bbfcfbe6.jpg',
    },
    {
      title: 'Upcoming Trip Notification',
      city: 'Paris',
      flightDate: 'November 10, 2024',
      ticketInfo: 'Flight Number: EF789, Class: First Class, Price: $1200',
      imageUrl: 'https://i.pinimg.com/474x/82/44/4f/82444feb326281feb555d334bf24f9ab.jpg',
    },
    {
      title: 'Past Trip Notification',
      city: 'Tokyo',
      flightDate: 'September 5, 2024',
      ticketInfo: 'Flight Number: GH012, Class: Economy, Price: $350',
      isPastTrip: true,
      imageUrl: 'https://i.pinimg.com/736x/99/a5/f2/99a5f20fdee57e12010f055840eda500.jpg',
    },
    {
      title: 'Upcoming Trip Notification',
      city: 'London',
      flightDate: 'December 1, 2024',
      ticketInfo: 'Flight Number: IJ345, Class: Economy, Price: $400',
      imageUrl: 'https://i.pinimg.com/736x/f2/80/71/f28071d918e6faffe06c0da64cfa90f4.jpg',
    },
    {
      title: 'Past Trip Notification',
      city: 'Rome',
      flightDate: 'July 15, 2024',
      ticketInfo: 'Flight Number: KL678, Class: Business, Price: $600',
      isPastTrip: true,
      imageUrl: 'https://i.pinimg.com/236x/85/12/4a/85124ad4a9916c3c820b5a0bbc890679.jpg',
    },
    {
      title: 'Upcoming Trip Notification',
      city: 'Sydney',
      flightDate: 'January 20, 2025',
      ticketInfo: 'Flight Number: MN901, Class: First Class, Price: $1500',
      imageUrl: 'https://i.pinimg.com/236x/00/23/ce/0023ce44de908310678bd5e400ca4713.jpg',
    },
    {
      title: 'Past Trip Notification',
      city: 'Berlin',
      flightDate: 'June 10, 2024',
      ticketInfo: 'Flight Number: OP234, Class: Economy, Price: $300',
      isPastTrip: true,
      imageUrl: 'https://i.pinimg.com/236x/16/53/fb/1653fb89dc4c072b4422837ff956e2a2.jpg',
    },
    {
      title: 'Upcoming Trip Notification',
      city: 'Toronto',
      flightDate: 'February 15, 2025',
      ticketInfo: 'Flight Number: QR567, Class: Business, Price: $700',
      imageUrl: 'https://i.pinimg.com/236x/72/cf/16/72cf16efb7aa8fd11668185db82180a8.jpg',
    },
    {
      title: 'Past Trip Notification',
      city: 'Dubai',
      flightDate: 'May 5, 2024',
      ticketInfo: 'Flight Number: ST890, Class: Economy, Price: $400',
      isPastTrip: true,
      imageUrl: 'https://i.pinimg.com/236x/4b/8c/25/4b8c25b28c9ea762b6513414cf2b8244.jpg',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {trips.map((trip, index) => (
          <Notification key={index} {...trip} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  pastTripTitle: {
    color: '#7f8c8d', // Different color for past trips
  },
  text: {
    fontSize: 16,
    color: '#34495e',
  },
  statusIndicator: {
    width: 10,
    borderRadius: 5,
  },
  upcomingTrip: {
    backgroundColor: '#2ecc71', // Green for upcoming trips
  },
  pastTrip: {
    backgroundColor: '#e74c3c', // Red for past trips
  },
});

// Export the App component
export default App;

