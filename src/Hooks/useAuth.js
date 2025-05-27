import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../Config/FirebaseConfig';

export function useAuth() {
   const [user, setUser] = useState(null);
   const [initializing, setInitializing] = useState(true);
   // Estado para saber se o Firebase já verificou a autenticação pela primeira vez

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);

         if (initializing) {
            setInitializing(false);
         }
      });
      return () => {
         unsubscribe();
      };
   },[]);

   return{user, initializing}
}
