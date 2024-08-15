import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

const umMesAtras = () => {
  const hoje = new Date();
  hoje.setMonth(hoje.getMonth() - 1);
  return hoje;
};

const App = () => {
  const [tarefas, setTarefas] = useState([
    { id: '1', titulo: 'Comprar leite', concluida: false, dataCriacao: new Date('2024-07-01') },
    { id: '2', titulo: 'Lavar a louça', concluida: true, dataCriacao: new Date('2024-08-10') },
    { id: '3', titulo: 'Ir ao mercado', concluida: false, dataCriacao: new Date('2024-07-20') },
  ]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    const tarefasFiltradas = tarefas.filter(tarefa => tarefa.dataCriacao >= umMesAtras());
    setTarefas(tarefasFiltradas);
  }, []);

  const alternarConclusaoTarefa = (id) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const novaTarefaObj = { id: Date.now().toString(), titulo: novaTarefa, concluida: false, dataCriacao: new Date() };
      setTarefas([novaTarefaObj, ...tarefas]); 
      setNovaTarefa('');
    }
  };

  const renderizarItem = ({ item }) => (
    <TouchableOpacity
      style={[estilos.containerTarefa, item.concluida && estilos.tarefaConcluida]}
      onPress={() => alternarConclusaoTarefa(item.id)}
    >
      <Text style={[estilos.textoTarefa, item.concluida && estilos.textoTarefaConcluido]}>
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.input}
        value={novaTarefa}
        onChangeText={setNovaTarefa}
        placeholder="Adicionar nova tarefa"
      />
      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />
      <FlatList
        data={tarefas}
        renderItem={renderizarItem}
        keyExtractor={item => item.id}
        extraData={tarefas}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  containerTarefa: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  tarefaConcluida: {
    borderStyle: 'dashed',
    borderColor: 'green',
    borderWidth: 2,
  },
  textoTarefa: {
    fontSize: 18,
  },
  textoTarefaConcluido: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default App;
