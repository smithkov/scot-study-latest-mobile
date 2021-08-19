import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;



const Institutions: React.FC = () => {
  const [institutions, setInstitutions] = useState([]);
  useEffect(() => {
    //return () => {

      axios.post(`${endpoint}institutions`).then(result=>{
         
          setInstitutions(result.data.data);
         
        }).catch(function (error) {
          // handle error
          console.log(error);
        })
    //};
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">Institutions</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        
        
        {institutions.map((item:any) => ( 
        <IonCard>
            <IonImg src={`${item.banner}`} />
            <IonCardHeader>
          <IonCardSubtitle>{item.City?.name}</IonCardSubtitle>
          <IonCardTitle>{item.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
         {item.sellingPoint}
        </IonCardContent>
      </IonCard>
      ))}
   
      </IonContent>
    </IonPage>
  );
};

export default Institutions;
