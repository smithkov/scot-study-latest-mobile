import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItemDivider,
  IonList,
  IonLoading,
  IonRow,
  IonSelect,
  IonSelectOption,
  useIonLoading,
} from "@ionic/react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Storage } from "@capacitor/storage";
import Config from "../utility/config";

const ForgotSuccess: React.FC = (prLoadingPropsops) => {
  const history = useHistory();
  const next = async (e: any) => {
    history.replace("/login");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center"></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />
        <IonGrid>
          <IonRow>
            <IonCol></IonCol>
            <IonCol>
              {/* <IonIcon
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                color="success"
                size="large"
                icon={checkmarkCircle}
              /> */}
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>

        <IonCard>
          <IonCardHeader style={{ textAlign: "center" }}>
            <IonCardTitle>
              An e-mail has been sent to you with further instructions
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonItemDivider />
        <IonButton
          onClick={next}
          className="ion-margin"
          color="primary"
          shape="round"
          expand="block"
          type="button"
        >
          Login
        </IonButton>

        <br />
        <br />
      </IonContent>
    </IonPage>
  );
};

export default ForgotSuccess;
