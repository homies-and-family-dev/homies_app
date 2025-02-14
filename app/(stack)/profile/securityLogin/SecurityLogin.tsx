import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ConfigurationEditIcon } from '../../../../assets/icons/icons';
import { useRouter } from 'expo-router';

const SecurityLogin = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>Inicio de sesion y seguridad</Text>
            </View>
            <TouchableOpacity style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Contraseña</Text>
                    <Text style={styles.textDescription}>Ultima actualizacion hace 3 semanas</Text>
                </View>
                <View style={styles.iconContainer}>
                    <SvgXml
                        xml={ConfigurationEditIcon}
                        width={20}
                        height={20}
                        fill={"#FFA4DB"}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
                <View style={styles.iconContainer}>
                    <SvgXml
                        xml={ConfigurationEditIcon}
                        width={20}
                        height={20}
                        fill={"#FFA4DB"}
                    />
                </View>
                <Text style={styles.text}>Eliminar cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF7FC",
        padding: 25,
        paddingHorizontal: 40,
    },
    containerTitle: {
        marginBottom: 40,
        alignItems: "flex-start",
    },
    textTitle: {
        fontSize: 22,
        color: "#40383C",
        fontWeight: "700",
    },
    card: {
        width: "100%",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D0D0D0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    iconContainer: {
        justifyContent: "center",
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        color: "#333",
        fontWeight: "500",
    },
    textDescription: {
        fontSize: 15,
        color: "#969696",
        fontWeight: "300",
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 'auto',
        paddingVertical: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#D0D0D0",
    },
});

export default SecurityLogin;