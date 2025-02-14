import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicies = () => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Políticas de Privacidad de la App Móvil "Homies and Family"</Text>
                <Text style={styles.lastUpdate}>Última actualización: [Fecha]</Text>
                <Text style={styles.content}>
                    En Homies and Family (“la Empresa”), nos comprometemos a proteger la privacidad de nuestros usuarios (“tú” o “usuarios”). Estas políticas de privacidad (“Política”) describen cómo recopilamos, usamos y protegemos tu información personal cuando usas nuestra aplicación móvil (“la App”).
                </Text>
                <Text style={styles.sectionTitle}>1. Información que Recopilamos</Text>
                <Text style={styles.content}>
                    Al usar la App, podemos recopilar la siguiente información personal:
                    Datos personales: Nombre completo, correo electrónico, fecha de nacimiento y número de teléfono.
                    Información de ubicación: Para facilitar el envío de pedidos a domicilio.
                    Datos transaccionales: Historial de pedidos, detalles de pagos (procesados por PayU, no almacenamos datos de tarjetas).
                </Text>
                <Text style={styles.sectionTitle}>2. Uso de la Información</Text>
                <Text style={styles.content}>
                    Usamos tu información personal para:
                    Procesar pedidos: Facilitar la entrega a domicilio de tus compras.
                    Comunicación: Enviarte confirmaciones de pedidos, actualizaciones, y notificaciones relevantes.
                    Mejorar la App: Analizar datos de uso para optimizar la experiencia del usuario.
                    Cumplir con obligaciones legales: Garantizar el cumplimiento de las leyes aplicables.
                </Text>
                <Text style={styles.sectionTitle}>3. Compartir tu Información</Text>
                <Text style={styles.content}>
                    No compartimos tus datos personales con terceros, salvo cuando sea necesario para:
                    Procesar pagos a través de la pasarela PayU.
                    Cumplir con leyes, regulaciones o procesos legales.
                </Text>
                <Text style={styles.sectionTitle}>4. Seguridad de la Información</Text>
                <Text style={styles.content}>
                    Implementamos medidas técnicas y organizativas razonables para proteger tu información personal. Sin embargo, ninguna medida de seguridad es completamente infalible. El uso de la App es bajo tu propio riesgo.
                </Text>
                <Text style={styles.sectionTitle}>5. Retención de Datos</Text>
                <Text style={styles.content}>
                    Conservaremos tu información personal mientras sea necesario para:
                    Completar las finalidades descritas en esta Política.
                    Cumplir con obligaciones legales o regulatorias.
                </Text>
                <Text style={styles.sectionTitle}>6. Derechos del Usuario</Text>
                <Text style={styles.content}>
                    Como usuario, tienes los siguientes derechos sobre tu información personal:
                    Acceso: Puedes solicitar una copia de los datos personales que almacenamos.
                    Rectificación: Puedes corregir errores o actualizar tu información.
                    Eliminación: Puedes solicitar la eliminación de tus datos personales, salvo que debamos conservarlos por razones legales.
                    Restricción del procesamiento: Puedes limitar el uso de tus datos personales.
                    Para ejercer estos derechos, contáctanos a través de [Correo de contacto] o [Teléfono de contacto].
                </Text>
                <Text style={styles.sectionTitle}>7. Uso de Servicios de Terceros</Text>
                <Text style={styles.content}>
                    La App utiliza servicios de terceros, como:
                    PayU: Para procesar pagos.
                    Servicios de mapas: Para determinar ubicaciones y facilitar entregas.
                    Estos servicios tienen sus propias políticas de privacidad, y recomendamos revisarlas.
                </Text>
                <Text style={styles.sectionTitle}>8. Cambios en la Política de Privacidad</Text>
                <Text style={styles.content}>
                    Nos reservamos el derecho de actualizar esta Política en cualquier momento. Notificaremos cualquier cambio significativo mediante la App o por otros medios razonables antes de su implementación.
                </Text>
                <Text style={styles.sectionTitle}>9. Jurisdicción y Ley Aplicable</Text>
                <Text style={styles.content}>
                    Esta Política se rige por las leyes de la República de Colombia. Cualquier controversia será resuelta en los tribunales competentes de Colombia.
                </Text>
                <Text style={styles.sectionTitle}>10. Contacto</Text>
                <Text style={styles.content}>
                    Si tienes preguntas sobre esta Política de Privacidad o el manejo de tus datos, contáctanos a través de:
                    Correo electrónico: [Correo de contacto].
                    Teléfono: [Teléfono de contacto].
                </Text>
                <Text style={styles.content}>
                    Al usar la App, confirmas que has leído y comprendido estas Políticas de Privacidad.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#FFF7FC",
    },
    container: {
        padding: 25,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#40383C",
        marginBottom: 20,
    },
    lastUpdate: {
        fontSize: 14,
        color: "#969696",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#40383C",
        marginTop: 20,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        marginBottom: 10,
    },
});

export default PrivacyPolicies;