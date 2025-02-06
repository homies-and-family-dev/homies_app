import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { ConfigurationEditIcon } from "../../assets/icons/icons";

interface CardOptionsGeneralProps {
  title: string;
  description: string;
  onPress: () => void;
}

const CardOptionsGeneral: React.FC<CardOptionsGeneralProps> = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.textDescription}>{description}</Text>
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
  );
};

const styles = StyleSheet.create({
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
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  textDescription: {
    fontSize: 18,
    color: "#969696",
  },
});

export default CardOptionsGeneral;