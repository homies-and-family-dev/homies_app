import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { NotificationIcon, arrowRightIcon, ConfigurationUserIcon, ConfigurationShopIcon, ConfigurationSecurityIcon, ConfigurationLegalIcon } from "../../assets/icons/icons";

const icons = {
    NotificationIcon,
    arrowRightIcon,
    ConfigurationUserIcon,
    ConfigurationShopIcon,
    ConfigurationSecurityIcon,
    ConfigurationLegalIcon,
};

interface CardOptionsProfileProps {
  title: string;
  iconName: keyof typeof icons;
  onPress: () => void;
}

const CardOptionsProfile: React.FC<CardOptionsProfileProps> = ({ title, iconName, onPress }) => {
  const IconComponent = icons[iconName];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <SvgXml
          xml={IconComponent}
          width={25}
          height={25}
          fill={"#FFA4DB"}
        />
        <Text style={styles.text}>{title}</Text>
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
  );
};

const styles = StyleSheet.create({
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
});

export default CardOptionsProfile;