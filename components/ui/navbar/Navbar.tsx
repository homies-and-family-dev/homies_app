import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";
import { DownArrowIcon, locationIcon, SearchIcon, NotificationIcon } from "@/assets/icons/icons";
import useSedeStore from "@/store/sedeStore";

interface NavbarProps {
  setSedeModalVisible: (visible: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSedeModalVisible }) => {
  const router = useRouter();
  const selectedSede = useSedeStore((state) => state.selectedSede);
  const fetchPrices = useSedeStore((state) => state.fetchPrices);

  useEffect(() => {
    if (selectedSede) {
      fetchPrices(selectedSede.name);
    }
  }, [selectedSede, fetchPrices]);

  const handleShopClick = useCallback(() => {
    
  }, [router]);

  return (
    <View style={styles.navbar}>
{/*
      <Pressable style={styles.iconButton} onPress={handleShopClick}>
        <SvgXml xml={SearchIcon} width="20" height="20" fill="#FFA4DB" />
      </Pressable>
      */}
      
      <Pressable style={styles.selectContainer} onPress={() => setSedeModalVisible(true)}>
        <SvgXml xml={locationIcon} width="20" height="20" fill="#FFA4DB" />
        <Text style={styles.selectText}>{selectedSede?.name || "Seleccione sede"}</Text>
        <SvgXml xml={DownArrowIcon} width="28" height="28" fill="#FFA4DB" />
      </Pressable>
{/* 
      <Pressable style={styles.iconButton} onPress={handleShopClick}>
        <SvgXml xml={NotificationIcon} width="20" height="20" fill="#FFA4DB" />
      </Pressable>
      */}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#FFF7FC",
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center", // Center the content horizontally
    alignItems: "center",
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    gap: 5,
    shadowColor: "#AEAEAE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  selectText: {
    fontSize: 16,
    color: "#FFA4DB",
  },
  iconButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#AEAEAE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
