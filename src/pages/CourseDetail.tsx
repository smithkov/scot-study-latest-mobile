import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonList, IonThumbnail, IonSearchbar, IonNote, IonChip } from '@ionic/react';
import { RouteComponentProps } from "react-router-dom";
import {checkmarkCircle} from "ionicons/icons";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;

interface CourseDetailProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const CourseDetail: React.FC<CourseDetailProps> = ({ match }) => {
  const id = match.params.id;
 

  const [course, setCourse] = useState({id:"",name:"",intake:"", scholarshipAmount:"", fee:"", CoursePhoto:{url:""}, Faculty:{name:""}, DegreeType:{name:""}, City:{name:""}, Institution:{name:""}});
  const [title, setTitle] = useState("");
  
  useEffect(() => {
      axios.get(`${endpoint}course/${id}`,
     ).then(result=>{
      
          setCourse(result.data.data);
         
        console.log(result.data.data)
        }).catch(function (error) {
          
        })
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
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
        <IonButton expand="block">Apply</IonButton>
        </IonCardContent>
      </IonCard>
      <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center"> <IonChip>
          <IonLabel color="secondary">{course.Institution.name}</IonLabel>
          </IonChip>  
         </IonCol>
        </IonRow>
      </IonGrid>
      <IonList>
        {course.City &&  <IonItem>
          <IonLabel>City</IonLabel>
          <IonNote slot="end" color="tertiary"><h5>{course.City.name}</h5></IonNote>
        </IonItem>}
     
        {course.scholarshipAmount  && <IonItem>
          <IonLabel>Scholarship Amount</IonLabel>
          <IonNote slot="end"><h5><IonIcon color="success" size="medium" icon={checkmarkCircle}> </IonIcon>{` ${course.scholarshipAmount}`}</h5></IonNote>
        </IonItem>}
       
        <IonItem>
          <IonLabel>Intake</IonLabel>
          <IonNote slot="end" color="tertiary"><h5>{course.intake}</h5></IonNote>
        </IonItem>
        <IonItem>
          <IonLabel >Degree</IonLabel>
          <IonNote slot="end" color="tertiary"><h5> {course.DegreeType.name}</h5></IonNote>
        </IonItem>
      </IonList>
      
      </IonContent>
    </IonPage>
  );
};

export default CourseDetail;
