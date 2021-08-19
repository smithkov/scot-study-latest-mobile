import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import "./faculty.css";
import { useHistory } from "react-router-dom";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;

const School: React.FC = (props) => {
  const history = useHistory();
  
  

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">School</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        
      <h1>School</h1>
     
   
      </IonContent>
    </IonPage>
  );
};

export default School;
