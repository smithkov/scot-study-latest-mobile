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

const HighSchool: React.FC = (prLoadingPropsops) => {
  const { register, logout } = React.useContext(AuthContext);
  const history = useHistory();

  let [selectedQualification, setSelectedQualification] = useState(null);
  let [qualification, setQualification] = useState([]);
  let [userId, setUserId] = useState("e2352890-171d-4d14-95f9-80879b3c8f99");
  let [highSchoolName, setHighSchoolName] = useState("");
  let [selectedCompletionYear, setSelectedCompletionYear] = useState("");
  let [completedYear, setCompletedYear] = useState([]);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const qualification = await ApiService.qualificationTypes();
      setQualification(qualification.data.data);

      const findHighSchool = await ApiService.findHighSchool({
        userId,
      });
      const currentData = findHighSchool.data.data;

      if (currentData) {
        setHighSchoolName(currentData.highSchoolName);
        setSelectedCompletionYear(currentData.completionYear);
      }
    })();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.saveHighSchool({
      completionYear: selectedCompletionYear,
      userId: userId,
      highSchoolName: highSchoolName,
    });

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.push(`/englishTest`);

    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">High School</IonTitle>
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
              <IonLabel position="floating">High School Name</IonLabel>
              <IonInput
                value={highSchoolName}
                name="highSchoolName"
                onIonInput={(e: any) => setHighSchoolName(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Completion Year</IonLabel>
              <IonSelect
                name="selectedCompletionYear"
                value={selectedCompletionYear}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedCompletionYear(e.detail.value);
                }}
              >
                {Config.years().map((item: any) => (
                  <>
                    <IonSelectOption key={item} value={item}>
                      {item}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
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

export default HighSchool;
