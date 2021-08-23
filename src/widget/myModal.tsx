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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ApiService from "../services/api";
import { checkmarkCircle } from "ionicons/icons";

const MyModal: React.FC<{
  message: string;
  open: boolean;
  degreeTypeId: string;
  handleClose: () => void;
  handleSelectedCourse: (course: any) => void;
}> = (props) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    //return () => {
    ApiService.allCoursesSearch({
      institutionId: "",
      facultyId: "",
      offset: 1,
      limit: 15,
      degreeTypeId: "",
      search: search,
    })
      .then((result) => {
        setCourses(result.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    //};
  }, []);

  const handleSearch = async (e: any) => {
    const value = e.target.value;
    setSearch(value);
    const searchResult = await ApiService.allCoursesSearch({
      institutionId: "",
      facultyId: "",
      offset: 1,
      limit: 25,
      degreeTypeId: "",
      search: value,
    });

    setCourses(searchResult.data.data);
  };
  return (
    <IonModal
      isOpen={props.open}
      cssClass="my-custom-class"
      swipeToClose={true}
      onDidDismiss={props.handleClose}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSearchbar
          autoCorrect="on"
          onIonInput={(e: any) => handleSearch(e)}
          placeholder="Search courses"
        ></IonSearchbar>
      </IonToolbar>
      <IonContent>
        <IonList>
          {courses.length > 0 ? (
            <>
              {courses.map((item: any) => (
                <IonItem
                  onClick={() => {
                    props.handleSelectedCourse(item);
                  }}
                >
                  <IonAvatar slot="start">
                    <IonImg
                      src={`${item.CoursePhoto && item.CoursePhoto.url}`}
                    />
                  </IonAvatar>

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
            </>
          ) : (
            <IonCard>
              <IonCardContent style={{ textAlign: "center" }}>
                <h4>No result was found!</h4>
              </IonCardContent>
            </IonCard>
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
        Close Modal
      </IonButton>
    </IonModal>
  );
};

export default MyModal;
