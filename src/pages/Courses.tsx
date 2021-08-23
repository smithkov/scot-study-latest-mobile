import React, { useState, useEffect } from "react";
import {
  IonSearchbar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonImg,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonNote,
  IonButtons,
  IonButton,
  IonMenuButton,
} from "@ionic/react";
import { checkmarkCircle, filterOutline } from "ionicons/icons";
import ApiService from "../services/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
const endpoint = `https://scotstudy.foodengo.com/api/`;

const Course: React.FC = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    //return () => {
    (async () => {
      const result = await ApiService.allCoursesSearch({
        institutionId: "",
        facultyId: "",
        offset: 1,
        limit: 15,
        degreeTypeId: "",
        search: "",
      });
      setCourses(result.data.data);
    })();

    //};
  }, []);
  const handleSearch = async (e: any) => {
    const value = e.target.value;
    const result = await ApiService.allCoursesSearch({
      institutionId: "",
      facultyId: "",
      offset: 1,
      limit: 15,
      degreeTypeId: "",
      search: value,
    });
    setCourses(result.data.data);
  };
  const courseDetail = (id: any) => {
    history.push(`/courseDetail/${id}`);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSearchbar
          onIonInput={(e: any) => handleSearch(e)}
          placeholder="Search courses"
        ></IonSearchbar>
      </IonToolbar>
      <IonContent fullscreen>
        <IonToolbar>
          <IonButtons slot="end">
            <IonIcon
              slot="end"
              size="large"
              color="primary"
              icon={filterOutline}
            ></IonIcon>
          </IonButtons>
        </IonToolbar>
        <IonList>
          {courses.map((item: any) => (
            <IonItem onClick={() => courseDetail(item.id)}>
              <IonThumbnail slot="start">
                <IonImg src={`${item.CoursePhoto?.url}`} />
              </IonThumbnail>

              <IonLabel>
                <h2>{item.name}</h2>
                <h3>{item.Faculty.name}</h3>
                <p>{item.fee}</p>
                {item.scholarshipAmount && (
                  <>
                    <IonIcon color="success" icon={checkmarkCircle} />{" "}
                    <IonNote slot="end">Scholarship available</IonNote>
                  </>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Course;
