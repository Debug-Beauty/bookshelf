"use client";

import { useState, useEffect } from 'react';

function useLocalStorageState<T>(key: string, defaultValue: T | (() => T)) { 
  const [state, setState] = useState<T>(defaultValue);
  
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {    
        setState(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Erro ao ler a chave "${key}" do localStorage:`, error);
    }   
  }, [key]); 

  useEffect(() => {
    try {     
      if (state !== defaultValue) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error(`Erro ao salvar a chave "${key}" no localStorage:`, error);
    }
  }, [key, state, defaultValue]);

  return [state, setState] as const;
}

export default useLocalStorageState;