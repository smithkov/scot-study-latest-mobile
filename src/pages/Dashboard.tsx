import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import "./faculty.css";
import { useHistory } from "react-router-dom";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;

const Dashboard: React.FC = (props) => {
  const history = useHistory();
  
  

  const courses =()=>{
    
    history.push("/");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">Dashboard</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        
      <h1>Dashboard</h1>
     
   
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
