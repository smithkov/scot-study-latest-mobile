import React, { useState, useEffect } from "react";
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { Storage } from "@capacitor/storage";
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
import { useHistory } from "react-router";
const endpoint = `https://scotstudy.foodengo.com/api/`;

const Institutions: React.FC = () => {
  const history = useHistory();
  const [institutions, setInstitutions] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    //return () => {
    (async () => {
      const { value } = await Storage.get({ key: "institution" });
      const cachedData = JSON.parse(value!);
      if (!cachedData) {
        const result = await ApiService.institutions();
        const data = result.data.data;
        console.log(data);
        setInstitutions(data);
        setShowLoading(false);
        await Storage.set({
          key: "institution",
          value: JSON.stringify(data),
        });
      } else {
        setInstitutions(cachedData);
        setShowLoading(false);
      }
    })();

    //};
  }, []);
  const institutionDetail = (id: any) => {
    history.push(`/institution/${id}`);
  };
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
          <IonCard onClick={() => institutionDetail(item.id)}>
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
