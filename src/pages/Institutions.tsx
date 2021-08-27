import React, { useState, useEffect } from "react";
import {IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonImg,
  IonLoading,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import axios from "axios";
import ApiService from "../services/api";
const endpoint = `https://scotstudy.foodengo.com/api/`;

const Institutions: React.FC = () => {
  const [institutions, setInstitutions] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    //return () => {
    (async () => {
      const result = await ApiService.institutions();
      setInstitutions(result.data.data);
      setShowLoading(false);
    })();

    //};
  }, []);
  return (
    <IonPage>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => null}
        message={"Please wait..."}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Institutions</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {institutions.map((item: any) => (
          <IonCard>
            <IonImg src={`${item.banner}`} />
            <IonCardHeader>
              <IonCardSubtitle>{item.City?.name}</IonCardSubtitle>
              <IonCardTitle>{item.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{item.sellingPoint}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Institutions;
