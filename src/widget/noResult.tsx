import React from "react";
import { IonAlert, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

const NoResult: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader style={{ textAlign: "center" }}>
        <IonCardTitle>No Result Found</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default NoResult;
