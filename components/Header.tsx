import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Países do Mundo</Text>
      <Text style={styles.subtitulo}>Conheça alguns países e suas bandeiras</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: '#1e3a8a',
        fontWeight: 'bold'
    },
    subtitulo: {
        color: '#666',
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center'
    }
})