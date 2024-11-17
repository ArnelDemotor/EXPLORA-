import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'; // Ensure your logo image is in this import
import CustomButton from '../components/CustomButton';

export default function ExploraApp() {
  const logoSize = { width: 150, height: 150 };
  const backgroundImageUrl = 'https://example.com/your-matching-background.jpg'; // Replace with a suitable background

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Semi-transparent overlay */}
      <View style={styles.overlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.innerContainer}>
            {/* Circular logo */}
            <Image
              source={images.logo}
              style={{ ...styles.logo, ...logoSize }}
              resizeMode="cover"
            />

            {/* App tagline */}
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>
                Explore the World with Ease: Discover, Plan, and Experience Your Next Great Adventure
              </Text>
            </View>

            {/* Call-to-action */}
            <Text style={styles.ctaText}>
              Embark on a journey like never before with Explora.
            </Text>

            {/* Custom button */}
            <CustomButton
              title="Start Your Journey"
              handlePress={() => router.push('/sign-in')}
              containerStyles={styles.buttonContainer}
              textStyle={styles.buttonText}
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="black" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    marginTop: 40,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 80,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#f36c3d', // Replace with a color that suits your logo
    borderRadius: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
