import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';

interface Product {
  id: string;
  name: string;
  description?: string;
  amount: number | null;
}

const generateId = (): string => Math.random().toString(36).substring(2, 15);

const currencyFormatter = (value: number | null): string => {
  if (value === null) return 'N/A';
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

const validateProduct = (name: string, price: string | null): { valid: boolean; message?: string } => {
  if (!name.trim()) {
    return { valid: false, message: 'O nome do produto é obrigatório.' };
  }

  if (price && isNaN(parseFloat(price))) {
    return { valid: false, message: 'O preço do produto deve ser um número válido.' };
  }

  return { valid: true };
};

export default function ProductRegistration() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setProductName('');
    setProductDescription('');
    setProductAmount('');
    setEditingProductId(null);
    Keyboard.dismiss();
  }, []);

  const handleAddOrEditProduct = useCallback(() => {
    const validation = validateProduct(productName, productAmount);
    if (!validation.valid) {
      Alert.alert('Erro', validation.message);
      return;
    }

    const amountNumber = productAmount ? parseFloat(productAmount) : null;

    setProducts(prevProducts => {
      if (editingProductId) {
        return prevProducts.map(product =>
          product.id === editingProductId
            ? {
                ...product,
                name: productName,
                description: productDescription,
                amount: amountNumber,
              }
            : product
        );
      } else {
        const newProduct: Product = {
          id: generateId(),
          name: productName,
          description: productDescription,
          amount: amountNumber,
        };
        return [...prevProducts, newProduct];
      }
    });

    resetForm();
  }, [productName, productDescription, productAmount, editingProductId, resetForm]);

  const handleEditProduct = useCallback((id: string) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setEditingProductId(id);
      setProductName(productToEdit.name);
      setProductDescription(productToEdit.description || '');
      setProductAmount(productToEdit.amount !== null ? productAmount.toString() : '');
    }
  }, [products]);

  const handleDeleteProduct = useCallback((id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            if (editingProductId === id) {
              resetForm();
            }
          },
        },
      ]
    );
  }, [editingProductId, resetForm]);

  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <View style={styles.listItem}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.productDescription}>{item.description}</Text>
        )}
        <Text style={styles.productPrice}>
          Quantidade: {currencyFormatter(item.amount)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditProduct(item.id)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [handleEditProduct, handleDeleteProduct]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto*"
        value={productName}
        onChangeText={setProductName}
        onSubmitEditing={handleAddOrEditProduct}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição (Opcional)"
        value={productDescription}
        onChangeText={setProductDescription}
        onSubmitEditing={handleAddOrEditProduct}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={productAmount}
        onChangeText={setProductAmount}
        onSubmitEditing={handleAddOrEditProduct}
        returnKeyType="done"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleAddOrEditProduct}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {editingProductId ? 'Salvar Edição' : 'Cadastrar Produto'}
        </Text>
      </TouchableOpacity>

      {editingProductId && (
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={resetForm}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Cancelar Edição</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtitle}>Lista de Produtos ({products.length})</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Nenhum produto cadastrado.</Text>
        }
        contentContainerStyle={products.length === 0 && styles.emptyListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#28a745',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});