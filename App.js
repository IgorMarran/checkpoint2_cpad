import { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [novoItem, setNovoItem] = useState('');
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    const texto = novoItem.trim();
    if (texto === '') return;

    const item = { id: String(Date.now()), texto };

    // Cria um array novo em vez de mutar o atual com .push():
    // o React só re-renderiza quando a referência do estado muda.
    setItens([...itens, item]);
    setNovoItem('');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Lista de Compras</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Digite um novo item"
          value={novoItem}
          onChangeText={setNovoItem}
          onSubmitEditing={adicionarItem}
        />
        <Button title="Adicionar" onPress={adicionarItem} />
      </View>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.texto}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum item na lista ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formulario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemTexto: {
    fontSize: 18,
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
});
