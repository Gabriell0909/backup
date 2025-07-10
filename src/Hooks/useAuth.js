import { auth } from '../Config/FirebaseConfig';
import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

// Criar contexto global
const AuthContext = createContext();

// Provider do contexto
export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [initializing, setInitializing] = useState(true);

   useEffect(() => {
      const subscriber = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         if (initializing) {
            setInitializing(false);
         }
      });

      return subscriber;
   }, [initializing]);

   // Função para forçar atualização do usuário
   const refreshUser = () => {
      setUser(auth.currentUser);
   };

   // Função para atualizar o displayName localmente
   const updateUserDisplayName = (newDisplayName) => {
      console.log('AuthProvider - updateUserDisplayName chamado:', newDisplayName);
      if (user) {
         const updatedUser = {
            ...user,
            displayName: newDisplayName,
         };
         console.log('AuthProvider - usuário atualizado:', updatedUser);
         setUser(updatedUser);
      }
   };

   const value = {
      user,
      initializing,
      refreshUser,
      updateUserDisplayName,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto
export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
   }
   return context;
}
