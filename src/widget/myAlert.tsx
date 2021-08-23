import React from "react";
import { IonAlert } from "@ionic/react";

const MyAlert: React.FC<{ message: string; showAlert: boolean }> = (props) => {
  return (
    <IonAlert
      isOpen={props.showAlert}
      //   onDidDismiss={() => setShowAlert1(false)}
      cssClass="my-custom-class"
      header={`Alert`}
      message={props.message}
      buttons={["OK"]}
      onDidDismiss={() => props.showAlert}
    />
  );
};

export default MyAlert;
