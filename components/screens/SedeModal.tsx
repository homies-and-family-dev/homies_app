import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { SedeIcon, SearchIcon, NoSedeIcons } from "@/assets/icons/icons";
import useSedeStore from "@/store/sedeStore";

// Hook personalizado para obtener sedes
interface Sede {
  id: number;
  name: string;
  // Add other properties if needed
}

const useFetchSedes = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch("https://api.homiesburger.com/api/location");
        if (!response.ok) throw new Error("Error al obtener las sedes");
        const data = await response.json();
        setSedes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSedes();
  }, []);

  return { sedes, loading };
};

interface SedeModalProps {
  visible: boolean;
  onClose: () => void;
}

const SedeModal: React.FC<SedeModalProps> = ({ visible, onClose }) => {
  const [search, setSearch] = useState("");
  const shakeAnim = useState(new Animated.Value(0))[0];

  const { sedes, loading } = useFetchSedes();
  const setSelectedSede = useSedeStore((state) => state.setSelectedSede);

  // Filtro de sedes según búsqueda
  const filteredSedes = useMemo(
    () => sedes.filter((sede) => sede.name.toLowerCase().includes(search.toLowerCase())),
    [sedes, search]
  );

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleSelect = useCallback(
    (sede: Sede) => {
      setSelectedSede(sede);
      onClose();
    },
    [setSelectedSede, onClose]
  );

  const renderItem = ({ item }: { item: Sede }) => (
    <Pressable
      style={({ pressed }) => [styles.optionContainer, { backgroundColor: pressed ? "#E0E0E0" : "#F9F9F9" }]}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.optionContainerIcon}>
        <SvgXml xml={SedeIcon} width="35" height="35" fill="#FFA4DB" />
      </View>
      <View style={styles.optionContainerText}>
        <Text style={styles.optionText}>{item.name}</Text>
        <Text style={styles.optionTextTwo}>La samaria Cr1 #2-3</Text>
      </View>
    </Pressable>
  );

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Seleccione la Sede</Text>
              </View>

              <View style={styles.headerContainerSearch}>
                <View style={styles.searchIconContainer}>
                  <SvgXml xml={SearchIcon} width="20" height="20" fill="#FFA4DB" />
                </View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar sede..."
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {loading ? (
                <ActivityIndicator size="large" color="#FFA4DB" />
              ) : (
                <FlatList
                  data={filteredSedes}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  getItemLayout={(data, index) => ({
                    length: 80,
                    offset: 80 * index,
                    index,
                  })}
                  ListEmptyComponent={() => (
                    <View style={styles.noOptionsContainer}>
                      <SvgXml xml={NoSedeIcons} width="150" height="150" fill="#DEDEDE" />
                      <Text style={styles.noOptionsText}>No se encontraron sedes disponibles</Text>
                    </View>
                  )}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 24,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: "center",
    height: "85%",
  },
  headerContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D6D6D",
    textAlign: "center",
    marginBottom: 16,
  },
  headerContainerSearch: {
    width: "90%",
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  optionContainer: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 8,
    width: "100%",
    justifyContent: "space-around",
  },
  optionContainerIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionContainerText: {
    width: "60%",
    alignItems: "flex-start",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  optionTextTwo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#5C5C5C",
  },
  noOptionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  noOptionsText: {
    fontSize: 18,
    color: "#D3D3D3",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default React.memo(SedeModal);
