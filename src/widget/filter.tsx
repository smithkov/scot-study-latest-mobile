import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ApiService from "../services/api";
import { checkmarkCircle } from "ionicons/icons";

const Filter: React.FC<{
  open: boolean;
  isShowFaculty: boolean;
  selectedDegreeType: string | number;
  selectedFaculty: string | number;
  selectedInstitution: string | number;
  handleClose: () => void;
  handleOnChangeDegreeType: (course: any) => void;
  handleOnChangeFaculty: (course: any) => void;
  handleOnChangeInstitution: (course: any) => void;
  institutions: any;
  faculties: any;
  degreeTypes: any;
}> = (props) => {
  return (
    <IonModal
      isOpen={props.open}
      cssClass="my-custom-class"
      swipeToClose={true}
      onDidDismiss={props.handleClose}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Filter Course</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Institution</IonLabel>
            <IonSelect
              name="selectedInstitution"
              value={props.selectedInstitution}
              okText="Okay"
              cancelText="Dismiss"
              onIonChange={props.handleOnChangeInstitution}
            >
              <IonSelectOption key={1} value={""}>
                {`All`}
              </IonSelectOption>
              {props.institutions.map((item: any) => (
                <>
                  <IonSelectOption key={item.id} value={item.id}>
                    {item.name}
                  </IonSelectOption>
                </>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Degree Types</IonLabel>
            <IonSelect
              name="selectedDegreeType"
              value={props.selectedDegreeType}
              okText="Okay"
              cancelText="Dismiss"
              onIonChange={props.handleOnChangeDegreeType}
            >
              <IonSelectOption key={2} value={""}>
                {`All`}
              </IonSelectOption>
              {props.degreeTypes.map((item: any) => (
                <>
                  <IonSelectOption key={item.id} value={item.id}>
                    {item.name}
                  </IonSelectOption>
                </>
              ))}
            </IonSelect>
          </IonItem>
          {props.isShowFaculty && (
            <IonItem>
              <IonLabel>Faculties</IonLabel>
              <IonSelect
                name="selectedFaculty"
                value={props.selectedFaculty}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={props.handleOnChangeFaculty}
              >
                <IonSelectOption key={2} value={""}>
                  {`All`}
                </IonSelectOption>
                {props.faculties.map((item: any) => (
                  <>
                    <IonSelectOption key={item.id} value={item.id}>
                      {item.name}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
          )}
        </IonList>
      </IonContent>

      <IonButton
        className="ion-margin"
        type="button"
        shape="round"
        expand="block"
        onClick={props.handleClose}
      >
        Apply Fillter
      </IonButton>
    </IonModal>
  );
};

export default Filter;
