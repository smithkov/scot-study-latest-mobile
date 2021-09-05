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
const endpoint = `${Config.url}`;

const Tour: React.FC = (prLoadingPropsops) => {
  const { setTourPage } = React.useContext(AuthContext);
 
  useEffect(() => {
    setTourPage();
  }, []);

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <div text-center>
          <img src="assets/banner_home.jpg" alt="Logo" title="Logo" />
        </div>
        <IonCard>
          <IonCardContent>
            <p>
              <h1>
                <strong>Welcome to Scot-Study!</strong>
              </h1>
              <br />
              <br />
              Are you interested in studying, working and living in Scotland?
              Join the thousands of students who are presently studying in
              Aberdeen, Dundee, Edinburgh, Perth, Glasgow, Stirling, St.
              Andrews, Paisley, Ayr, and Inverness.
            </p>
            <br />

            <p>
              Scotia-Study is a Mobile and Web app designed to provide you with
              relevant information about Scotland High Education (HE) and to
              give you the platform to apply to any Scottish institutions of
              your choice, monitor your application while waiting for decisions,
              step-by-step enrolment progression, visa application guidance and
              processing, and pre-departure briefing from your mobile phones at
              your convenience without any charges.
            </p>
            <br />
            <p>
              We understand the challenges international students faced in
              settling down in a new environment and the feel of loneliness when
              away from home, and that is why we are providing ‘everything’
              necessary for students to settle-in into the new life in Scotland
              with ease and without any charges. We are determined to create an
              easy and awesome experience for our the international students
              from start to finish. Our Mobile app will help students experience
              a seamless journey from applying from their various homes to
              beginning a new life in Scotland just by the touch of a button.
            </p>
            <br />
            <p>
              With the privilege of having access to join our international
              students network across all institutions in Scotland, we can
              guarantee home-away-from-home experience throughout your study in
              Scottish territories. So join our students network today by
              signing up.
            </p>
            <br />
          </IonCardContent>
          <br />
        </IonCard>
        <IonGrid>
          <IonRow color="primary" justify-content-right>
            <IonCol align-self-right size-md="6" size-lg="5" size-xs="12">
              <div text-right>
                <IonButton
                  class="pull-right"
                  routerLink="/login"
                  routerDirection="forward"
                  size="small"
                  type="submit"
                  color="primary"
                >
                  Click to continue
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tour;
