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

import SchoolAbout from "../widget/schoolAbout";
import ApiService from "../services/api";
const endpoint = `https://scotstudy.foodengo.com/api/`;

interface CourseDetailProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const Institution: React.FC<CourseDetailProps> = ({ match }) => {
  const id = match.params.id;
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();
  const [institution, setInstitution] = useState({
    id: "",
    name: "",
    intake: "",
    banner: "",
    fee: "",
    City: { name: "" },
    Faculty: { name: "" },
    DegreeType: { name: "" },
    Institution: { name: "" },
  });
 

  useEffect(() => {
    (async () => {
      const result = await ApiService.findInstitutionById({id});
      setInstitution(result.data.data);
    })();
  }, [id]);
  // const apply = async (e: any) => {
  //   e.preventDefault();
  //   await Storage.set({
  //     key: "courseId",
  //     value: course.id,
  //   });

  //   history.replace("/highestQuali");
  // };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">{institution?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonImg src={institution.banner} />
          <IonCardHeader>
          <IonCardTitle>{institution.name}</IonCardTitle>
            <IonCardSubtitle>{institution?.City.name}</IonCardSubtitle>
           
            
          </IonCardHeader>

          <IonCardContent>
           
          </IonCardContent>
        </IonCard>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
             <h4>{`About ${institution.name}`}</h4> 
             <SchoolAbout id={id} />
            </IonCol>
          </IonRow>
        </IonGrid>
        
      </IonContent>
    </IonPage>
  );
};

export default Institution;
