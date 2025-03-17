import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useStore from "../../store/authStore";
import ProfileNotLoggedIn from "../../components/profile/ProfileNotLoggedIn";
import { SvgXml } from "react-native-svg";
import { ConfigurationUserProfileIcon, NotificationIcon, ConfigurationUserIcon, arrowRightIcon } from "../../assets/icons/icons";
import CardOptionsProfile from "../../components/profile/CardOptionsProfile";
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {user.id ? (
        <View style={styles.containerProfile}>
          <View style={styles.containerHeader}>
            <View style={styles.containerUser}>
              <View style={styles.containerUserImage}>
                <SvgXml
                  xml={ConfigurationUserProfileIcon}
                  width={65}
                  height={65}
                  fill={"#4F4F4F"}
                />
              </View>
              <View style={styles.containerUserData}>
                <Text style={styles.textWelcome}>Bienvenido</Text>
                <Text style={styles.textUser}>{user.name}</Text>
              </View>
            </View>
            {/* 
            <View style={styles.containerNotifications}>
              <SvgXml
                xml={NotificationIcon}
                width={20}
                height={24}
                fill={"#FFA4DB"}
              />
            </View>
            */}
          </View>
          <View style={styles.containerConfig}>
            <View style={styles.containerConfigTitle}>
              <Text style={styles.text}>Configuración</Text>
            </View>
            <View style={styles.containerConfig}>
              <CardOptionsProfile
                title="Informacion personal"
                iconName="ConfigurationUserIcon"
                route="/profile/personalInfo/PersonalInformation"
              />
              <CardOptionsProfile
                title="Mis pedidos"
                iconName="ConfigurationShopIcon"
                route="/profile/orders/Orders"
              />
              <CardOptionsProfile
                title="Inicio de sesion y seguridad"
                iconName="ConfigurationSecurityIcon"
                route="/profile/securityLogin/SecurityLogin"
              />
            </View>
          </View>
          <View style={styles.containerLegal}>
            <View style={styles.containerLegalTitle}>
              <Text style={styles.text}>Legal</Text>
            </View>
            <View style={styles.containerLegal}>
              <CardOptionsProfile
                title="Terminos y condiciones"
                iconName="ConfigurationLegalIcon"
                route="/profile/legal/TermsConditions"
              />
              <CardOptionsProfile
                title="Politica de privacidad"
                iconName="ConfigurationLegalIcon"
                route="/profile/legal/PrivacyPolicies"
              />
            </View>
          </View>
          <View style={styles.containerLogout}>
            <TouchableOpacity style={styles.card} onPress={logout}>
              <View style={styles.textContainer}>
                <SvgXml
                  xml={ConfigurationUserIcon}
                  width={25}
                  height={25}
                  fill={"#FFA4DB"}
                />
                <Text style={styles.text}>Cerrar sesión</Text>
              </View>
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={arrowRightIcon}
                  width={12}
                  height={17}
                  fill={"#FFA4DB"}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.textVersion}>Version 1.0.13</Text>
          </View>
        </View>
      ) : (
        <ProfileNotLoggedIn />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF7FC",
  },
  containerProfile: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: 25,
    paddingHorizontal: 40,
  },
  containerHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  containerUserImage: {
    marginRight: 10,
  },
  containerUserData: {
    justifyContent: "center",
  },
  containerNotifications: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerConfig: {
    width: "100%",
    alignItems: "center",
  },
  containerConfigTitle: {
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  containerLegal: {
    width: "100%",
    alignItems: "center",
  },
  containerLegalTitle: {
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  containerLogout: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "110%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconContainer: {
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  textWelcome: {
    fontSize: 26,
    color: "#40383C",
    fontWeight: "800",
  },
  textUser: {
    fontSize: 18,
    color: "#40383C",
    fontWeight: "300",
  },
  textVersion: {
    fontSize: 12,
    color: "#40383C",
    fontWeight: "300",
    marginTop: 10,
  },
});

export default ProfileScreen;