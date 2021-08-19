import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonList, IonThumbnail, IonSearchbar, IonNote } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import "./faculty.css";
import { RouteComponentProps, useHistory } from "react-router-dom";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;

interface FacultyCourseProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const FacultyCourse: React.FC<FacultyCourseProps> = ({ match }) => {
  const facultyId = match.params.id;
 
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
      axios.post(`${endpoint}courseByParams`,
      {
      facultyId: facultyId,
      institutionId: "",
      offset:1,
      limit:15,
      degreeTypeId:"",
      search: "",
      }).then(result=>{
       //const data = result.data.data;
          setCourses(result.data.data);
         setTitle(result.data.data[0].Faculty.name)
        }).catch(function (error) {
          
        })
  }, [facultyId]);

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">{title}</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
         
          <IonSearchbar placeholder="Search courses" ></IonSearchbar>
        </IonToolbar>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
         
        </IonHeader>
        <IonList>
        {courses.map((item:any) => ( 
      <IonItem>
         <IonThumbnail slot="start">
            <IonImg src={`${item.CoursePhoto?.url}`} />
          </IonThumbnail>
        
        <IonLabel>
        <h2>{item.name}</h2>
            <h3>{item.Faculty.name}</h3>
            <p>{item.fee}</p>
            {item.scholarshipAmount && 
              <><IonIcon  color="success" icon={checkmarkCircle} /> <IonNote slot="end">Scholarship available</IonNote></>
              
          }
            
            
            
           
        </IonLabel>
      </IonItem>
      ))}
    </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FacultyCourse;
