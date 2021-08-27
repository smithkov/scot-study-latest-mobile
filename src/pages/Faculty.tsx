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
import { checkmarkCircle } from "ionicons/icons";
import "./faculty.css";
import { useHistory } from "react-router-dom";

import axios from "axios";
const endpoint = `https://scotstudy.foodengo.com/api/`;

const Faculty: React.FC = (props) => {
  const history = useHistory();
  const [faculties, setFaculties] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const result = await axios.post(`${endpoint}facultiesLight`);
      setFaculties(result.data.data);
      setShowLoading(false);
    })();
  }, []);

  const courses = (id: any) => {
    history.push(`/facultyCourse/${id}`);
  };

  return (
    <IonPage>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => null}
        message={"Please wait..."}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Faculties</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {faculties.map((item: any) => {
              const photos = item.CoursePhotos;
              const length = photos.length - 1;
              const rand = Math.floor(Math.random() * (length - 0 + 1)) + 0;
              return (
                <IonCol key={item.id} size="6">
                  <div
                    onClick={() => courses(item.id)}
                    key={item.id}
                    className="container"
                  >
                    <img
                      src={photos[rand].url}
                      alt="Snow"
                      style={{ width: "100%", height: 110 }}
                    ></img>
                    <div
                      style={{
                        backgroundColor: "black",
                        padding: 10,
                        opacity: 0.5,
                      }}
                      className="centered"
                    >
                      {item.name}
                    </div>
                  </div>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Faculty;
