import React from "react";
import { IonAlert, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

const NoResult: React.FC<{
  message: string;
}> = (props) => {
  return (
    <IonCard>
      <IonCardHeader style={{ textAlign: "center" }}>
        <IonCardTitle> {props.message || "No Result Found"} </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default NoResult;
