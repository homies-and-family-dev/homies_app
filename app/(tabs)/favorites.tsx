import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorites: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hola, este es un componente básico en React Native con Expo!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});

export default Favorites;