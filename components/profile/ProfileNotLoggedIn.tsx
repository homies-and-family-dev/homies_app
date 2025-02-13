import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { Link } from 'expo-router';
import { logoutIcon, registerIcon } from "../../assets/icons/icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tu perfil</Text>
        <Text style={styles.description}>
          Inicia sesión para poder disfrutar de una hamburguesa Homies and
          family
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Link href="/(stack)/login/EmailLoginScreen" style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Inicia Sesión</Text>
            <SvgXml xml={logoutIcon} width={20} height={24} fill={"#FFFFFF"} />
          </View>
        </Link>
        <Link href="/(stack)/register/EmailRegisterScreen" style={[styles.button, styles.buttonWhite]}>
          <View style={styles.buttonContent}>
            <Text style={[styles.buttonText, styles.buttonTextPink]}>
              Regístrate
            </Text>
            <SvgXml xml={registerIcon} width={20} height={24} fill={"#FFA4DB"} />
          </View>
        </Link>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.version}>Versión 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF7FC",
    paddingTop: Platform.OS === "ios" ? 60 : 35,
    padding: 25,
  },
  titleContainer: {
    alignItems: "flex-start",
    gap: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  description: {
    fontSize: 16,
    color: "#5C5C5C",
    textAlign: "left",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    display: 'flex',
    flexDirection: "row",
    backgroundColor: "#FFA4DB",
    paddingVertical: 15,
    borderRadius: 30,
    width: "80%",
    elevation: 3,
    shadowColor: "#969696",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    gap: 10,
  },
  buttonWhite: {
    backgroundColor: "#FFF",
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
  },
  buttonTextPink: {
    color: "#FFA4DB",
  },
  versionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  version: {
    fontSize: 14,
    color: "#5C5C5C",
  },
});

export default ProfileScreen;