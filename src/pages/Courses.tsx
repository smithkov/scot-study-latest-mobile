import React, { useState, useEffect } from "react";
import { IonSearchbar,IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox,  IonImg,IonThumbnail,IonGrid, IonRow, IonCol, IonIcon,IonNote  } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import axios from 'axios';
import { useHistory } from "react-router-dom";
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;




const Course: React.FC = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    //return () => {

      axios.post(`${endpoint}allCoursesSearch`, { 
        institutionId: "",
        facultyId: "",
        offset:1,
        limit:15,
        degreeTypeId: "",
        search:"",}).then(result=>{
         
          setCourses(result.data.data);
         
        }).catch(function (error) {
          // handle error
          console.log(error);
        })
    //};
  }, []);

  const courseDetail =(id:any)=>{
    history.push(`/courseDetail/${id}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">Courses</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
         
          <IonSearchbar placeholder="Search courses" ></IonSearchbar>
        </IonToolbar>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle  size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
        {courses.map((item:any) => ( 
      <IonItem onClick={()=>courseDetail(item.id)}>
         <IonThumbnail slot="start">
            <IonImg src={`${item.CoursePhoto.url}`} />
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

export default Course;
