import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonLoading,
  useIonLoading,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import Config from "../utility/config";
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
import Toast from "../widget/toast";
import MyAlert from "../widget/myAlert";
import ApiService from "../services/api";
const endpoint = `${Config.url}`;

const Forgot: React.FC = (prLoadingPropsops) => {
  const { login, logout } = React.useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleOnChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    const response = await ApiService.forgotPassword({ email });

    const { error } = response.data;
    setShowLoading(true);
    if (error) {
      setShowToast(true);
    } else {
      history.replace(`/forgotSuccess`);
    }
    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Reset Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Toast
          message={`It seems like your email does not exist!`}
          showToast={showToast}
        />
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={handleForgotPassword}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                name="email"
                onIonInput={handleOnChange}
                required
                type="text"
              ></IonInput>
            </IonItem>
          </IonList>

          <br />

          <IonButton
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Reset
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

export default Forgot;
