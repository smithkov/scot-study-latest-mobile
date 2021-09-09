import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonLoading,
  useIonLoading,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import {
  ThemeDetection,
  ThemeDetectionResponse,
} from "@ionic-native/theme-detection";
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
const endpoint = `${Config.url}`;

const Login: React.FC = (prLoadingPropsops) => {
  const { login } = React.useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [logo, setLogo] = useState("/assets/light_logo.png");
  useEffect(() => {
    ThemeDetection.isDarkModeEnabled().then((res: any) => {
      if (res.value) {
        setLogo("/assets/dark_logo.png");
      } else {
        setLogo("/assets/light_logo.png");
      }
    });
  });
  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  const gotoRegister = () => {
    history.replace(`/register`);
  };

  const doLogin = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    login({
      user: email,
      password: password,
    })
      .then((result: any) => {
        history.replace(Config.dashRoute());
      })
      .catch((error: any) => {
        setShowLoading(false);
        setShowToast(true);
      });
    // if (result) history.replace(`/dashboard`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center"></IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <IonContent fullscreen>
        <Toast
          message={`Username or password is incorrect`}
          showToast={showToast}
        />

        <IonGrid>
          <IonRow>
            <IonCol></IonCol>

            <IonCol>
              <IonImg style={{ height: 65, width: 200 }} src={logo} />
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <form onSubmit={doLogin}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email or username</IonLabel>
              <IonInput
                name="email"
                onIonInput={handleOnChange}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                name="password"
                onIonInput={handleOnChange}
                required
                type="password"
              ></IonInput>
            </IonItem>
          </IonList>
          <div className="ion-text-end ion-margin">
            <a href="/forgot">Forgot Password</a>
          </div>
          <br />

          <IonButton
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Login
          </IonButton>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
          <p style={{ textAlign: "center" }}>Don't have an account?</p>
          <IonButton
            onClick={gotoRegister}
            className="ion-margin"
            type="button"
            color="danger"
            shape="round"
            expand="block"
          >
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
