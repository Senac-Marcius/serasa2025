import React, { useState, useEffect } from 'react';
import {insertDocument, iDoc, updateDocument, deleteDocument, getListDocuments} from '../../src/controllers/documents'
import MyView from '../../src/components/MyView';
import MyDocument from '../../src/components/MyDocument';
import { getLoggedUserId } from '../../src/controllers/users';


export default function DocumentsScreen() {
const [userId, setuserId] = useState(-1)
  
  useEffect(() => {
    async function fetchUser() {
      const id = await getLoggedUserId();
      if (id)setuserId(Number(id));
    }
    fetchUser();
  }, [userId]);
  
  return (
      
    <MyView>

    <MyDocument
      type='Documentos'
      user_id={userId}
    />

      
    </MyView>
  );
}


