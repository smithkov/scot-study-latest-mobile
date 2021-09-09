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

const Sponsorship: React.FC = (prLoadingPropsops) => {
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();

  const sponsorType = [
    {
      key: 1,
      text: "Self-sponsored",
      value: "Self-sponsored",
    },
    { key: 2, text: "Parents", value: "Parents" },
    {
      key: 1,
      text: "Other relatives",
      value: "Other relatives",
    },
    { key: 2, text: "Scholarship", value: "Scholarship" },
  ];

  let [userId, setUserId] = useState(authValues.user.id);
  let [selectedSponsor, setSelectedSponsor] = useState("");
  let [name, setName] = useState("");
  let [occupation, setOccupation] = useState("");
  let [budget, setBudget] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const findSponsorship = await ApiService.findSponsorship({
        userId,
      });
      const currentData = findSponsorship.data.data;

      if (currentData) {
        setSelectedSponsor(currentData.sponsor);
        setName(currentData.name);
        setOccupation(currentData.occupation);
        setBudget(currentData.budget);
      }
    })();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.saveSponsorship({
      name: name,
      sponsor: selectedSponsor,
      occupation: occupation,
      budget: budget,
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
          <IonTitle className="ion-text-center">Sponsorship</IonTitle>
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
              <IonLabel>Sponsorship</IonLabel>
              <IonSelect
                name="selectedSponsor"
                value={selectedSponsor}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedSponsor(e.detail.value);
                }}
              >
                {sponsorType.map((item: any) => (
                  <>
                    <IonSelectOption key={item.key} value={item.value}>
                      {item.text}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Sponsor's Name</IonLabel>
              <IonInput
                value={name}
                name="name"
                onIonInput={(e: any) => setName(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Occupation</IonLabel>
              <IonInput
                value={occupation}
                name="occupation"
                onIonInput={(e: any) => setOccupation(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Budget</IonLabel>
              <IonInput
                value={budget}
                name="budget"
                onIonInput={(e: any) => setBudget(e.target.value)}
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

export default Sponsorship;
