import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'; // Ensure your logo image is imported here
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Travel-themed background (e.g., a scenic view or iconic landmark)
    const backgroundImageUrl = 'https://i.pinimg.com/564x/f6/45/02/f64502b389f7e88d9db69c27cf8e3c0f.jpg'; // Replace with a suitable travel background

    // Navigation functions
    const handleSignUpPress = () => router.push('/sign-up');
    const handleSignInPress = () => router.push('/Home');

    return (
        <ImageBackground
            source={{ uri: backgroundImageUrl }}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.formContainer}>
                        {/* Rounded Logo */}
                        <Image
                            source={images.logo}
                            style={styles.logo}
                            resizeMode='cover'
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#B0BEC5"
                            style={styles.input}
                            keyboardType="email-address"
                        />
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

                        {/* Enhanced Button */}
                        <TouchableOpacity
                            style={styles.signInButton}
                            activeOpacity={0.8}
                            onPress={handleSignInPress}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <Text style={styles.footerText}>
                            Don't have an account?{' '}
                            <TouchableOpacity onPress={handleSignUpPress}>
                                <Text style={styles.signUpText}>Sign Up</Text>
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
        borderRadius: 60, // Circular shape for logo
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        color: '#333',
        fontFamily: 'Arial', // Use a clean, modern font
        fontSize: 16, // Adjusting font size for readability
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    signInButton: {
        backgroundColor: '#1e90ff', // A vibrant color for the button
        borderRadius: 25, // Rounded button
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Adding a slight 3D effect to the button
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Arial', // Clean, modern font for button text
    },
    footerText: {
        color: '#000',
        marginTop: 16,
        textAlign: 'center',
        fontFamily: 'Arial', // Consistent font family for all text
        fontSize: 16,
    },
    signUpText: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
        fontFamily: 'Arial', // Consistent font family
        fontSize: 16,
    },
});

export default SignIn;
