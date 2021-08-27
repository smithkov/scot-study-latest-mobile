import React from "react";
import { IonToast } from "@ionic/react";

const Toast: React.FC<{ message: string; showToast: boolean }> = (props) => {
  return (
    <IonToast
      isOpen={props.showToast}
      onDidDismiss={() => !props.showToast}
      message={props.message}
      duration={8000}
    />
  );
};

export default Toast;
