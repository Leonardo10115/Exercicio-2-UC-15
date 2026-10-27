
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import CountryCard from './CountryCard';
import Header from './Header';

interface Pais {
  name: string;
  capital: string | null;
  emoji: string;
  code: string;
  continent: {
    name: string;
  };
}

export default function CountryList() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarPaises() {
      try {
        const resposta = await fetch(
          'https://countries.trevorblades.com/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query {
                  countries {
                    name
                    capital
                    emoji
                    code
                    continent {
                      name
                    }
                  }
                }
              `,
            }),
          }
        );

        if (!resposta.ok) {
          throw new Error('Erro na resposta da API');
        }

        const resultado = await resposta.json();

        if (resultado.errors || !resultado.data) {
          throw new Error('Não foi possível carregar os países');
        }

        setPaises(resultado.data.countries);
      } catch (error) {
        console.log('Erro ao buscar países:', error);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    buscarPaises();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Carregando países...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>Não foi possível carregar os países.</Text>
        <Text>Verifique sua conexão e tente novamente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        data={paises}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CountryCard
            bandeira={item.emoji}
            titulo={item.name}
            capital={item.capital || 'Não informada'}
            regiao={item.continent.name}
            codigo={item.code}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
