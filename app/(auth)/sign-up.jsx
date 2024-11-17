import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome for icons
import { useRouter } from 'expo-router'; // Importing router for navigation
import { images } from '../../constants'; // Ensure you have the path to your images

const SignUp = () => {
    const router = useRouter(); // Initialize router
    const backgroundImageUrl = 'https://i.pinimg.com/564x/f6/45/02/f64502b389f7e88d9db69c27cf8e3c0f.jpg'; // Updated travel-themed background
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

    // Function to handle Sign Up navigation
    const handleSignUpPress = () => {
        router.push('/sign-in'); // Navigate to the sign-in page after successful sign-up
    };

    // Function to navigate to the Login screen
    const handleLogInPress = () => {
        router.push('/sign-in'); // Navigate to sign-in page
    };

    return (
        <ImageBackground
            source={{ uri: backgroundImageUrl }}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.formContainer}>
                        {/* Logo Image */}
                        <Image
                            source={images.logo} // Ensure this points to your logo image
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Create Your Account</Text>

                        {/* Email Input */}
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#B0BEC5"
                            style={styles.input}
                            keyboardType="email-address"
                        />

                        {/* Password Input */}
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#B0BEC5"
                                secureTextEntry={!passwordVisible}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            >
                                <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#B0BEC5" />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#B0BEC5"
                                secureTextEntry={!confirmPasswordVisible}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            >
                                <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} color="#B0BEC5" />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={styles.signUpButton}
                            activeOpacity={0.8}
                            onPress={handleSignUpPress}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Additional Links */}
                        <Text style={styles.footerText}>
                            Already have an account?{' '}
                            <TouchableOpacity onPress={handleLogInPress}>
                                <Text style={styles.signInText}>Log In</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better readability
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circular logo
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        color: '#001F3F',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Arial', // Modern, readable font
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        color: '#333',
        fontFamily: 'Arial', // Clean, modern font
        fontSize: 16, // Adjusted for readability
        borderWidth: 1,
        borderColor: '#B0BEC5', // Subtle border for the input fields
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
        padding: 5,
    },
    signUpButton: {
        backgroundColor: '#1e90ff', // A vibrant blue color
        borderRadius: 25, // Rounded button shape
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Adding a slight 3D effect
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Arial', // Clean font for the button
    },
    footerText: {
        color: '#000',
        marginTop: 16,
        textAlign: 'center',
        fontFamily: 'Arial', // Consistent font family for all text
        fontSize: 16,
    },
    signInText: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
        fontFamily: 'Arial', // Consistent font family
        fontSize: 16,
    },
});

export default SignUp;
