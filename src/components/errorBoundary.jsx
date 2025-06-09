import React from 'react';
import { View, Text } from 'react-native';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Você pode logar o erro em algum serviço externo aqui
    console.log('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Ocorreu um erro inesperado.</Text>
          <Text>{String(this.state.error)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}