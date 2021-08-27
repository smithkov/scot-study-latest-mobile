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

const FilterCompare: React.FC<{
  open: boolean;
  isShowFaculty: boolean;
  selectedDegreeType: string | number;
  selectedFaculty: string | number;
  selectedInstitution1: string | number;
  selectedInstitution2: string | number;
  handleClose: () => void;
  institutions: any;
  faculties: any;
  degreeTypes: any;
  handleOnChangeDegreeType: (course: any) => void;
  handleOnChangeFaculty: (course: any) => void;
  handleOnChangeInstitution1: (course: any) => void;
  handleOnChangeInstitution2: (course: any) => void;
}> = (props) => {
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  return (
    <IonModal
      isOpen={props.open}
      cssClass="my-custom-class"
      swipeToClose={true}
      onDidDismiss={props.handleClose}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Filter Compare</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Institution One</IonLabel>
            <IonSelect
              name="selectedInstitution1"
              value={props.selectedInstitution1}
              okText="Okay"
              cancelText="Dismiss"
              onIonChange={props.handleOnChangeInstitution1}
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
            <IonLabel>Institution Two</IonLabel>
            <IonSelect
              name="selectedInstitution2"
              value={props.selectedInstitution2}
              okText="Okay"
              cancelText="Dismiss"
              onIonChange={props.handleOnChangeInstitution2}
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

export default FilterCompare;
