import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { ConfigurationUserProfileIcon, ConfigurationEditIcon } from "../../../../assets/icons/icons";
import CardOptionsGeneral from "../../../../components/profile/CardOptionsGeneral";
import useStore from "../../../../store/authStore"; 
import { useRouter } from 'expo-router';

const PersonalInformation = () => {
  const user = useStore((state) => state.user); 
  const router = useRouter();

  const handleEditNamePress = () => {
    router.push('/(stack)/profile/personalInfo/EditInformation');
  };

  return (
    <View style={styles.container}>
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
              <Text style={styles.textWelcome}>Foto de perfil</Text>
            </View>
          </View>
          <View style={styles.containerNotifications}>
            <SvgXml
              xml={ConfigurationEditIcon}
              width={20}
              height={20}
              fill={"#FFA4DB"}
            />
          </View>
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>Información Personal</Text>
        </View>
        <CardOptionsGeneral 
          title="Nombres y apellidos" 
          description={`${user.name}`} 
          onPress={handleEditNamePress} 
        />
        <CardOptionsGeneral title="Correo" description={user.email} onPress={() => {}} />
        <CardOptionsGeneral title="Telefono" description="+57 3211234567" onPress={() => {}} />
        <CardOptionsGeneral title="Fecha de nacimiento" description="01/01/2000" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF7FC",
  },
  containerProfile: {
    flex: 1,
    justifyContent: "flex-start",
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
  containerTitle: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "flex-start",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  textWelcome: {
    fontSize: 20,
    color: "#40383C",
    fontWeight: "500",
  },
  textTitle: {
    fontSize: 24,
    color: "#40383C",
    fontWeight: "700",
  },
});

export default PersonalInformation;