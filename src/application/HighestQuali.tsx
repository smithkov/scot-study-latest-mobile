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

const HighestQuali: React.FC = (prLoadingPropsops) => {
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();

  let [selectedQualification, setSelectedQualification] = useState(null);
  let [qualification, setQualification] = useState([]);
  let [hq_completed, setHq_completed] = useState(null);
  let [userId, setUserId] = useState(authValues.user.id);
  let [hq_grade, setHq_grade] = useState(null);
  let [hq_schoolName, setHq_schoolName] = useState(null);
  let [selectedProgrammeYear, setSelectedProgrammeYear] = useState(null);
  let [programmeYear, setProgrammeYear] = useState([]);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const qualification = await ApiService.qualificationTypes();
      setQualification(qualification.data.data);

      const findHighestQuali = await ApiService.findHighestQualification({
        userId,
      });
      const currentData = findHighestQuali.data.data;

      if (currentData) {
        const {
          hq_schoolName,
          hq_completed,
          hq_grade,
          hq_programmeYear,
          QualificationType,
        } = currentData;
        setHq_schoolName(hq_schoolName);
        setHq_completed(hq_completed);
        setHq_grade(hq_grade);
        setSelectedProgrammeYear(hq_programmeYear);
        setSelectedQualification(QualificationType.id);
      }
    })();
  }, []);

  const back = (e: any) => {
    e.preventDefault();
    history.goBack();
  };
  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.saveHighestQualification({
      hq_programmeYear: selectedProgrammeYear,
      hq_completed,
      hq_grade,
      hq_schoolName,
      qualificationTypeId: selectedQualification,
      userId,
    });

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.push(`/previousQualification`);
    setShowLoading(false);
    // register({
    //   email,
    //   password,
    //   phone,
    //   firstname,
    //   middlename,
    //   lastname,
    //   marital: selectedMarital,
    //   gender: selectedGender,
    //   dob,
    //   homeAddress,
    //   postalAddress,
    //   contactEmail,
    //   countryId: selectedCountry,
    // })
    //   .then((result: any) => {
    //     history.replace(`/dashboard`);
    //   })
    //   .catch((error: any) => {
    //     setShowLoading(false);
    //   });
    // if (result) history.replace(`/dashboard`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons onClick={back} slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Highest Qualification</IonTitle>
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
              <IonLabel position="floating">School Name</IonLabel>
              <IonInput
                value={hq_schoolName}
                name="hq_schoolName"
                onIonInput={(e: any) => setHq_schoolName(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Grade</IonLabel>
              <IonInput
                name="hq_grade"
                value={hq_grade}
                onIonInput={(e: any) => setHq_grade(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Has Completed</IonLabel>
              <IonSelect
                name="hq_completed"
                value={hq_completed}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setHq_completed(e.detail.value)}
              >
                <IonSelectOption key="1" value="Yes">
                  Yes
                </IonSelectOption>
                <IonSelectOption key="2" value="No">
                  No
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Programme Year</IonLabel>
              <IonSelect
                name="selectedProgrammeYear"
                value={selectedProgrammeYear}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedProgrammeYear(e.detail.value);
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
            <IonItem>
              <IonLabel>Qualification</IonLabel>
              <IonSelect
                name="selectedQualification"
                value={selectedQualification}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setSelectedQualification(e.detail.value)}
              >
                {qualification.map((item: any) => (
                  <>
                    <IonSelectOption key={item.id} value={item.id}>
                      {item.name}
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

export default HighestQuali;
