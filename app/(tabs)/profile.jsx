import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation();

  // State variables
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Arnel Demotor');
  const [email, setEmail] = useState('arnel@egmail.com');
  const [bio, setBio] = useState('Travel enthusiast and adventure seeker.');
  const [phone, setPhone] = useState('123-456-7890');
  const [location, setLocation] = useState('Toledo');
  const [languages, setLanguages] = useState('English');
  const [interests, setInterests] = useState('Hiking, Photography, Blogging');
  const [achievements, setAchievements] = useState('Completed 50+ trips worldwide.');
  const [personalQuote, setPersonalQuote] = useState('"Travel is the only thing you buy that makes you richer."');
  const [favorites, setFavorites] = useState([
    { id: '1', name: 'Paris, France', image: 'https://i.pinimg.com/564x/98/51/0a/98510a0c6013f5913fac4b6d6c3aac12.jpg' },
    { id: '2', name: 'Tokyo, Japan', image: 'https://i.pinimg.com/564x/0b/1b/f3/0b1bf3faa177460a12f59fe6d3decca8.jpg' },
    { id: '3', name: 'New York, USA', image: 'https://i.pinimg.com/564x/f8/50/43/f850430b3cc9efbf42691ee691242571.jpg' },
  ]);
  const [photoGallery, setPhotoGallery] = useState([
    { id: '1', image: 'https://i.pinimg.com/236x/e1/99/b2/e199b25cd826924f861cf8762eee449c.jpg' },
    { id: '2', image: 'https://i.pinimg.com/236x/f5/4d/f9/f54df995f46abca1cf73dc7b1f9a0813.jpg' },
    { id: '3', image: 'https://i.pinimg.com/564x/27/16/57/271657afb107aac0136bffbcbc4fe87b.jpg' },
    { id: '4', image: 'https://i.pinimg.com/236x/4d/e0/11/4de011316192df27ed6f2c4a3183393c.jpg' },
    { id: '5', image: 'https://i.pinimg.com/564x/30/b8/10/30b81087a3b06a0d10e28d835b2f8b73.jpg' },
    { id: '6', image: 'https://i.pinimg.com/736x/99/13/4e/99134ee693095746c0ec70c03ae3ae72.jpg' },
  ]);
  const [pastTrips, setPastTrips] = useState([
    { id: '1', destination: 'Bali, Indonesia', duration: '5 Days' },
    { id: '2', destination: 'Sydney, Australia', duration: '7 Days' },
    { id: '3', destination: 'Rome, Italy', duration: '4 Days' },
  ]);
  const [socialLinks, setSocialLinks] = useState({
    instagram: 'arnel_insta',
    facebook: 'arnel_fb',
    twitter: 'arnel_tw',
  });

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveChanges = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Name and Email are required.');
      return;
    }
    setIsEditing(false);
    Alert.alert('Success', 'Your profile has been updated.');
  };

  const logOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: handleLogOut },
    ]);
  };

  const handleLogOut = () => {
    // Perform any necessary cleanup here, like clearing user data or tokens
    Alert.alert('Logged Out', 'You have been successfully logged out.', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate to the login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
          });
        },
      },
    ]);
  };

  const openSocialLink = (platform) => {
    let url = '';
    switch (platform) {
      case 'instagram':
        url = `https://instagram.com/${socialLinks.instagram}`;
        break;
      case 'facebook':
        url = `https://facebook.com/${socialLinks.facebook}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${socialLinks.twitter}`;
        break;
      default:
        return;
    }
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Failed to open the link.'));
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPhoto(null);
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <Text style={styles.favoriteName}>{item.name}</Text>
    </View>
  );

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Image source={{ uri: item.image }} style={styles.photoItem} />
    </TouchableOpacity>
  );

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Icon name="location-sharp" size={20} color="#007bff" />
      <View style={styles.tripInfo}>
        <Text style={styles.tripDestination}>{item.destination}</Text>
        <Text style={styles.tripDuration}>{item.duration}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/01/86/1a/01861a9cae0ae1d090e21a142c0fcf91.jpg' }}
          style={styles.profileImage}
        />
        {!isEditing && (
          <TouchableOpacity style={styles.editIcon} onPress={toggleEdit}>
            <Icon name="create-outline" size={25} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.profileCard}>
        {isEditing ? (
          <>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Email" />
            <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Bio" />
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Location" />
            <TextInput style={styles.input} value={languages} onChangeText={setLanguages} placeholder="Languages" />
            <TextInput style={styles.input} value={interests} onChangeText={setInterests} placeholder="Interests" />
            <TextInput style={styles.input} value={achievements} onChangeText={setAchievements} placeholder="Achievements" />
            <TextInput style={styles.input} value={personalQuote} onChangeText={setPersonalQuote} placeholder="Personal Quote" />
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
            <Text style={styles.profileBio}>{bio}</Text>
            <Text style={styles.profilePhone}>{phone}</Text>
            <Text style={styles.profileLocation}>{location}</Text>
            <Text style={styles.profileLanguages}>{languages}</Text>
            <Text style={styles.profileInterests}>{interests}</Text>
            <Text style={styles.profileAchievements}>{achievements}</Text>
            <Text style={styles.profileQuote}>{personalQuote}</Text>
            <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Favorites Section */}
      <Text style={styles.sectionTitle}>Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Photo Gallery Section */}
      <Text style={styles.sectionTitle}>Photo Gallery</Text>
      <FlatList
        data={photoGallery}
        renderItem={renderPhotoItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Past Trips Section */}
      <Text style={styles.sectionTitle}>Past Trips</Text>
      <FlatList
        data={pastTrips}
        renderItem={renderTripItem}
        keyExtractor={item => item.id}
      />

      {/* Social Links Section */}
      <Text style={styles.sectionTitle}>Social Links</Text>
      <View style={styles.socialLinks}>
        <TouchableOpacity onPress={() => openSocialLink('instagram')}>
          <Icon name="logo-instagram" size={30} color="#e4405f" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openSocialLink('facebook')}>
          <Icon name="logo-facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openSocialLink('twitter')}>
          <Icon name="logo-twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Photo Modal */}
      <Modal visible={isModalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {selectedPhoto && (
                <Image source={{ uri: selectedPhoto.image }} style={styles.modalImage} />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    marginBottom: 10,
  },
  profilePhone: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileLanguages: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileInterests: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileAchievements: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#f1c40f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  favoriteItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  favoriteImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  favoriteName: {
    marginTop: 5,
    textAlign: 'center',
  },
  photoItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripInfo: {
    marginLeft: 10,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDuration: {
    fontSize: 14,
    color: '#666',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Profile;
