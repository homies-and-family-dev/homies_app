import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TermsConditions = () => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Términos y Condiciones de la App Móvil "Homies and Family"</Text>
                <Text style={styles.lastUpdate}>Última actualización: [Fecha]</Text>
                <Text style={styles.content}>
                    Bienvenido a la aplicación móvil de Homies and Family (“la App”). Estos términos y condiciones (“Términos”) regulan el uso de nuestra App y los servicios ofrecidos a través de ella. Al usar la App, aceptas estos Términos. Si no estás de acuerdo con ellos, por favor no uses nuestra App.
                </Text>
                <Text style={styles.sectionTitle}>1. Información General</Text>
                <Text style={styles.content}>
                    Homies and Family es una cadena de restaurantes de hamburguesas que ofrece comidas rápidas y malteadas. La App tiene como propósito facilitar las ventas para envío a domicilio dentro de Colombia.
                </Text>
                <Text style={styles.sectionTitle}>2. Uso de la App</Text>
                <Text style={styles.content}>
                    La App está dirigida a clientes que deseen hacer pedidos a domicilio. Para acceder a todas las funcionalidades, deberás crear una cuenta personal. El registro requiere verificación mediante correo electrónico o número telefónico.
                </Text>
                <Text style={styles.sectionTitle}>3. Registro y Cuentas</Text>
                <Text style={styles.content}>
                    Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso. Homies and Family se reserva el derecho de suspender o eliminar cuentas en caso de uso indebido o incumplimiento de estos Términos.
                </Text>
                <Text style={styles.sectionTitle}>4. Pagos</Text>
                <Text style={styles.content}>
                    Los pagos realizados en la App son procesados mediante la pasarela de pagos PayU. Al realizar un pedido, aceptas cumplir con los términos y condiciones de PayU. Homies and Family no almacena información sensible de las tarjetas de crédito o débito.
                </Text>
                <Text style={styles.sectionTitle}>5. Política de Privacidad</Text>
                <Text style={styles.content}>
                    Datos recopilados: Recopilamos y almacenamos los siguientes datos: Nombre completo, Correo electrónico, Fecha de nacimiento, Número de teléfono, Ubicación (para envíos a domicilio).
                    Uso de los datos: Los datos se utilizan exclusivamente para procesar pedidos, personalizar la experiencia del usuario y mejorar nuestros servicios. No compartimos tus datos con terceros.
                </Text>
                <Text style={styles.sectionTitle}>6. Restricciones de Edad</Text>
                <Text style={styles.content}>
                    No existen restricciones de edad para usar la App. Sin embargo, los menores de edad deben contar con el permiso de sus padres o tutores legales.
                </Text>
                <Text style={styles.sectionTitle}>7. Dependencia de Servicios Externos</Text>
                <Text style={styles.content}>
                    La App depende de servicios externos como: PayU para procesar pagos, Servicios de mapas para determinar la ubicación de los envíos. Homies and Family no es responsable por fallos en estos servicios.
                </Text>
                <Text style={styles.sectionTitle}>8. Seguridad</Text>
                <Text style={styles.content}>
                    Implementamos medidas razonables para proteger la información del usuario. Sin embargo, no podemos garantizar seguridad absoluta. El uso de la App es bajo tu propio riesgo.
                </Text>
                <Text style={styles.sectionTitle}>9. Limitación de Responsabilidad</Text>
                <Text style={styles.content}>
                    Homies and Family no se hace responsable de daños directos, indirectos o incidentales que resulten del uso de la App. En caso de errores técnicos, trabajaremos para solucionarlos lo antes posible, pero no garantizamos la disponibilidad ininterrumpida de la App.
                </Text>
                <Text style={styles.sectionTitle}>10. Jurisdicción y Ley Aplicable</Text>
                <Text style={styles.content}>
                    Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta en los tribunales competentes de Colombia.
                </Text>
                <Text style={styles.sectionTitle}>11. Modificaciones a los Términos</Text>
                <Text style={styles.content}>
                    Nos reservamos el derecho de modificar estos Términos en cualquier momento. Notificaremos a los usuarios de cualquier cambio de manera pertinente antes de su aplicación.
                </Text>
                <Text style={styles.sectionTitle}>12. Contacto</Text>
                <Text style={styles.content}>
                    Si tienes preguntas sobre estos Términos, puedes contactarnos a través de: Correo electrónico: [Correo de contacto], Teléfono: [Teléfono de contacto].
                </Text>
                <Text style={styles.content}>
                    Al usar la App, confirmas que has leído y aceptado estos Términos y Condiciones.
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

export default TermsConditions;