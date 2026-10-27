
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

interface paisProp {
  bandeira: string;
  titulo: string;
  capital: string;
  regiao: string;
  codigo: string;
}

export default function CountryCard({
  bandeira,
  titulo,
  capital,
  regiao,
  codigo,
}: paisProp) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://flagcdn.com/w160/${codigo.toLowerCase()}.png`,
        }}
        style={styles.bandeira}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>{titulo}</Text>

      <Text style={styles.texto}>
        Capital: {capital}
      </Text>

      <Text style={styles.texto}>
        Continente: {regiao}
      </Text>

      <Text style={styles.texto}>
        Código: {codigo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  bandeira: {
    width: 100,
    height: 65,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
});
