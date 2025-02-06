import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { DownArrowIcon, locationIcon } from "../../assets/icons/icons";
import useStore from "../../store/sedeStore";

interface SedeComponentProps {
  setSedeModalVisible: (visible: boolean) => void;
}

const SedeComponent: React.FC<SedeComponentProps> = ({ setSedeModalVisible }) => {
  const selectedSede = useStore((state) => state.selectedSede);

  const handlePress = () => {
    setSedeModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <View style={styles.locationContainer}>
          <SvgXml xml={locationIcon} width="20" height="20" fill="#FFA4DB" />
          <View style={styles.textContainer}>
            <Text style={styles.selectText}>{selectedSede.name}</Text>
            <Text style={styles.selectAddressText}>Esta sera la direccion #1-2</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <SvgXml xml={DownArrowIcon} width="28" height="28" fill="#FFA4DB" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#AEAEAE",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  selectText: {
    fontSize: 16,
    color: "#FFA4DB",
  },
  selectAddressText: {
    fontSize: 12,
    color: "#AEAEAE",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SedeComponent;