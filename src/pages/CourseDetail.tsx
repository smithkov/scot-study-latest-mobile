import React, { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import AuthContext from "../my-context";
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
  IonList,
  IonThumbnail,
  IonSearchbar,
  IonNote,
  IonChip,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { checkmarkCircle } from "ionicons/icons";

import axios from "axios";
import ApiService from "../services/api";
const endpoint = `https://scotstudy.foodengo.com/api/`;

interface CourseDetailProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const CourseDetail: React.FC<CourseDetailProps> = ({ match }) => {
  const id = match.params.id;
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();
  const [course, setCourse] = useState({
    id: "",
    name: "",
    intake: "",
    scholarshipAmount: "",
    fee: "",
    CoursePhoto: { url: "" },
    Faculty: { name: "" },
    DegreeType: { name: "" },
    City: { name: "" },
    Institution: { name: "" },
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      const result = await ApiService.findCourseById(id);
      setCourse(result.data.data);
    })();
  }, [id]);
  const apply = async (e: any) => {
    e.preventDefault();
    await Storage.set({
      key: "courseId",
      value: course.id,
    });

    history.replace("/highestQuali");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Course Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonImg src={course.CoursePhoto?.url} />
          <IonCardHeader>
            <IonCardSubtitle>{course.fee}</IonCardSubtitle>
            <IonCardTitle>{course.name}</IonCardTitle>
            <p>{course.Faculty.name}</p>
          </IonCardHeader>

          <IonCardContent>
            <IonButton
              type="button"
              shape="round"
              onClick={apply}
              expand="block"
              disabled={!authValues.user.isUser}
            >
              Apply
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              {" "}
              <IonChip>
                <IonLabel color="secondary">{course.Institution.name}</IonLabel>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonList>
          {course.City && (
            <IonItem>
              <IonLabel>City</IonLabel>
              <IonNote slot="end" color="tertiary">
                <h5>{course.City.name}</h5>
              </IonNote>
            </IonItem>
          )}

          {course.scholarshipAmount && (
            <IonItem>
              <IonLabel>Scholarship Amount</IonLabel>
              <IonNote slot="end">
                <h5>
                  <IonIcon color="success" size="medium" icon={checkmarkCircle}>
                    {" "}
                  </IonIcon>
                  {` ${course.scholarshipAmount}`}
                </h5>
              </IonNote>
            </IonItem>
          )}

          <IonItem>
            <IonLabel>Intake</IonLabel>
            <IonNote slot="end" color="tertiary">
              <h5>{course.intake}</h5>
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Degree</IonLabel>
            <IonNote slot="end" color="tertiary">
              <h5> {course.DegreeType.name}</h5>
            </IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetail;
