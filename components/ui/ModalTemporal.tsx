import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface ModalTemporalProps {
    visible: boolean;
    onClose: () => void;
}

const ModalTemporal: React.FC<ModalTemporalProps> = ({ visible, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Próximamente disponible</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        width: 320,
        padding: 25,
        backgroundColor: '#FFF7FC', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5C5C5C', 
    },
    button: {
        backgroundColor: '#FFA4DB', 
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ModalTemporal;