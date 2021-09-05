import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonTextarea,
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
import MyAlert from "../widget/myAlert";

import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";

import axios from "axios";
const endpoint = `${Config.url}`;

const VisaHistory: React.FC = (prLoadingPropsops) => {
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();

  let [userId, setUserId] = useState(authValues.user.id);
  let [selectedHasApplied, setSelectedHasApplied] = useState("");
  let [purpose, setPurpose] = useState("");
  let [reason, setReason] = useState("");
  let [isShowReason, setIsShowReason] = useState(false);
  let [isShowPurpose, setIsShowPurpose] = useState(false);
  let [moreInfo, setMoreInfo] = useState("");
  let [selectedHasRefused, setSelectedHasRefused] = useState("");
  let [message, setMessage] = useState("");
  let [showError, setShowError] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const findVisaHistory = await ApiService.findVisaHistory({
        userId,
      });
      const currentData = findVisaHistory.data.data;

      if (currentData) {
        setSelectedHasApplied(currentData.hasApplied);
        setSelectedHasRefused(currentData.hasRefused);
        setMoreInfo(currentData.moreInfo);
        setReason(currentData.reason);
        setPurpose(currentData.purpose);
      }
    })();
  }, []);

  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    const data = {
      hasApplied: selectedHasApplied,
      hasRefused: selectedHasRefused,
      purpose: purpose,
      moreInfo: moreInfo,
      reason: reason,
      userId,
    };

    if (selectedHasApplied == "Yes") {
      if (selectedHasRefused == "Yes" && reason == "") {
        setShowLoading(false);
        setMessage("Please fill in reason for refusal");
        setShowError(true);
        return;
      }
    } else {
      data.purpose = "";
      data.hasRefused = "";
      data.moreInfo = "";
      data.reason = "";
    }
    const saveResult = await ApiService.saveVisaHistory(data);

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.push(`/sponsorship`);

    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Visa History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={save}>
          <MyAlert message={message} showAlert={showError} />
          <IonList>
            <IonItem>
              <IonLabel>Has Applied For A UK Visa Before ?</IonLabel>
              <IonSelect
                name="selectedHasApplied"
                value={selectedHasApplied}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedHasApplied(e.detail.value);
                }}
              >
                <IonSelectOption key={1} value="Yes">
                  Yes
                </IonSelectOption>
                <IonSelectOption key={2} value="No">
                  No
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            {selectedHasApplied == "Yes" && (
              <>
                {" "}
                <IonItem>
                  <IonLabel position="floating">Purpose of Travel</IonLabel>
                  <IonTextarea
                    name="purpose"
                    value={purpose}
                    onIonChange={(e) => setPurpose(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel>Has Refused UK Visa Before?</IonLabel>
                  <IonSelect
                    name="selectedHasRefused"
                    value={selectedHasRefused}
                    okText="Okay"
                    cancelText="Dismiss"
                    onIonChange={(e) => {
                      setSelectedHasRefused(e.detail.value);
                    }}
                  >
                    <IonSelectOption key={1} value="Yes">
                      Yes
                    </IonSelectOption>
                    <IonSelectOption key={2} value="No">
                      No
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
                {selectedHasRefused == "Yes" && (
                  <IonItem>
                    <IonLabel position="floating">Reason for Refusal</IonLabel>
                    <IonTextarea
                      name="reason"
                      value={reason}
                      onIonChange={(e) => setReason(e.detail.value!)}
                    ></IonTextarea>
                  </IonItem>
                )}
                <IonItem>
                  <IonLabel position="floating">More Information</IonLabel>
                  <IonTextarea
                    name="moreInfo"
                    value={moreInfo}
                    onIonChange={(e) => setMoreInfo(e.detail.value!)}
                  ></IonTextarea>
                </IonItem>
              </>
            )}
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

export default VisaHistory;
