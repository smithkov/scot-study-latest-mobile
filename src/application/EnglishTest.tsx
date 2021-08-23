import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonLoading,
  IonSelect,
  IonSelectOption,
  useIonLoading,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import Config from "../utility/config";
import ApiService from "../services/api";
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
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonList,
  IonAvatar,
  IonThumbnail,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";

import axios from "axios";
const endpoint = `${Config.url}`;

const EnglishTest: React.FC = (prLoadingPropsops) => {
  const { register, logout } = React.useContext(AuthContext);
  const history = useHistory();
  const typeArray = [
    { key: 1, text: "NONE", value: "NONE" },
    { key: 1, text: "TOEFL", value: "TOEFL" },
    { key: 2, text: "IELTS", value: "IELTS" },
  ];

  let [userId, setUserId] = useState("e2352890-171d-4d14-95f9-80879b3c8f99");
  let [selectedName, setSelectedName] = useState("");
  let [score, setScore] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const findEnglish = await ApiService.findEnglish({
        userId,
      });
      const currentData = findEnglish.data.data;

      if (currentData) {
        setScore(currentData.score);
        setSelectedName(currentData.name);
      }
    })();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.saveEnglishTest({
      score: score,
      name: selectedName,
      userId: userId,
    });

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.push(`/visaHistory`);

    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">English Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={save}>
          <IonList>
            <IonItem>
              <IonLabel>Test Type</IonLabel>
              <IonSelect
                name="selectedName"
                value={selectedName}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedName(e.detail.value);
                }}
              >
                {typeArray.map((item: any) => (
                  <>
                    <IonSelectOption key={item.key} value={item.value}>
                      {item.text}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Score</IonLabel>
              <IonInput
                value={score}
                name="score"
                onIonInput={(e: any) => setScore(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
          </IonList>
          <br />
          <br />
          <IonButton
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Save & Next
          </IonButton>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EnglishTest;
