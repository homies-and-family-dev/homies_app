import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  NotificationIcon,
  arrowRightIcon,
  ConfigurationUserIcon,
  ConfigurationShopIcon,
  ConfigurationSecurityIcon,
  ConfigurationLegalIcon,
} from "../../assets/icons/icons";
import { Link, Href } from "expo-router";

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
  route: Href;
}

const CardOptionsProfile: React.FC<CardOptionsProfileProps> = ({
  title,
  iconName,
  route,
}) => {
  const IconComponent = icons[iconName];

  return (
    <Link href={route}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <SvgXml xml={IconComponent} width={25} height={25} fill={"#FFA4DB"} />
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
      </View>
    </Link>
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
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  iconContainer: {
    marginLeft: "auto",
    paddingRight: 5,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default CardOptionsProfile;
