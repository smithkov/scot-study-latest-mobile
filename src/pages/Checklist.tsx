import React, { useState, useEffect } from "react";
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
  IonLoading,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";

const Checklist: React.FC = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Checklist</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            This is to help you know the stages you need to undergo before you
            enrol at your selected university to begin your study journey.
          </IonCardContent>
          <IonCardHeader>
            <IonLabel>Admission Stage</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            Admission stage includes checking student’s eligibility to be sure
            they are qualified for the proposed courses they are interested in.
            After the eligibility check, students are to provide the
            requirements stated in the course and application will then be
            processed for offer of admission.
          </IonCardContent>

          <IonCardHeader>
            <IonLabel>Visa Stage</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            Visa is a stage where students have been issued an unconditional
            offer letter or Confirmation of Acceptance of Studies (CAS) and they
            are ready to apply for visa or waiting visa decision.
          </IonCardContent>

          <IonCardHeader>
            <IonLabel>Pre-departure Stage</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            Pre-departure is a stage where a student has been issued a study
            visa and they are preparing to depart from their country of
            residence to their study destination. Scot-Study organises
            pre-departure event and Union every enrolment window for students
            networking, short lecture on immigration regulations, how to apply
            for professional jobs prior to the end of their studies.
          </IonCardContent>

          <IonCardHeader>
            <IonLabel>Enrolment Stage</IonLabel>
          </IonCardHeader>
          <IonCardContent>
            Enrolment is the final stage where students arrive at their selected
            institutions to enrol for their studies and begin classes.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Checklist;
