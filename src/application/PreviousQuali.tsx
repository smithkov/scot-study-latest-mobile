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

const PreviousQuali: React.FC = (prLoadingPropsops) => {
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();

  let [selectedQualification, setSelectedQualification] = useState(null);
  let [qualification, setQualification] = useState([]);
  let [userId, setUserId] = useState(authValues.user.id);
  let [selectedProgrammeYear, setSelectedProgrammeYear] = useState(null);

  let [pq_completed, setPq_completed] = useState("");
  let [pq_grade, setPq_grade] = useState("");
  let [pq_schoolName, setPq_schoolName] = useState("");

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const qualification = await ApiService.qualificationTypes();
      setQualification(qualification.data.data);

      const findPreviousQuali = await ApiService.findPreviousQualification({
        userId,
      });
      const currentData = findPreviousQuali.data.data;

      if (currentData) {
        const {
          pq_schoolName,
          pq_completed,
          pq_grade,
          pq_programmeYear,
          QualificationType,
        } = currentData;
        setPq_schoolName(pq_schoolName);
        setPq_completed(pq_completed);
        setPq_grade(pq_grade);
        setSelectedProgrammeYear(pq_programmeYear);
        setSelectedQualification(QualificationType.id);
      }
    })();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.savePreviousQualification({
      pq_programmeYear: selectedProgrammeYear,
      pq_completed,
      pq_grade,
      pq_schoolName,
      qualificationTypeId: selectedQualification,
      userId,
    });

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.push(`/highSchool`);

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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">
            Previous Qualification
          </IonTitle>
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
                value={pq_schoolName}
                name="pq_schoolName"
                onIonInput={(e: any) => setPq_schoolName(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Grade</IonLabel>
              <IonInput
                name="pq_grade"
                value={pq_grade}
                onIonInput={(e: any) => setPq_grade(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Has Completed</IonLabel>
              <IonSelect
                name="pq_completed"
                value={pq_completed}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setPq_completed(e.detail.value)}
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

export default PreviousQuali;
