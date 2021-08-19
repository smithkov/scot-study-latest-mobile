import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol } from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import "./faculty.css";
import { useHistory } from "react-router-dom";

import axios from 'axios';
const  endpoint  =  `https://scotstudy.foodengo.com/api/`;

const Faculty: React.FC = (props) => {
  const history = useHistory();
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
      axios.post(`${endpoint}facultiesLight`).then(result=>{
       
          setFaculties(result.data.data);
        }).catch(function (error) {
          console.log(error);
        })
  }, []);

  const courses =(id:any)=>{
    
    history.push(`/facultyCourse/${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  color="primary">
          <IonTitle className="ion-text-center">Faculties</IonTitle>
          
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        
        <IonGrid>
        <IonRow>
        {faculties.map((item:any) => {
           
           const photos = item.CoursePhotos;
           const length = photos.length - 1;
           const rand =
             Math.floor(Math.random() * (length - 0 + 1)) + 0;
           return ( 
        
        <IonCol size="6">
          <div onClick={()=>courses(item.id)} key={item.id} className="container">
            <img   src={photos[rand].url} alt="Snow" style={{width:"100%", height:110}}></img>
            <div style={{backgroundColor:"black", padding:10, opacity: 0.5}} className="centered">{item.name}</div>
          </div>
     
      </IonCol>
        
       
      )})}
      </IonRow>
        </IonGrid>
     
   
      </IonContent>
    </IonPage>
  );
};

export default Faculty;
