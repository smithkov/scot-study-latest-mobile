import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonLoading,
  IonSelect,
  IonSelectOption,
  useIonLoading,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import Config from "../utility/config";
import ApiService from "../services/api";
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
  IonInput,
  IonList,
  IonAvatar,
  IonThumbnail,
} from "@ionic/react";
import { school, checkmarkCircle } from "ionicons/icons";
import MyModal from "../widget/myModal";

import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";

import axios from "axios";
const endpoint = `${Config.url}`;

const Application: React.FC = (prLoadingPropsops) => {
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();

  let [userId, setUserId] = useState(authValues.user.id);
  let [degreeTypes, setDegreeTypes] = useState([]);

  let [selectedSchoolOneName, setSelectedSchoolOneName] = useState("");
  let [selectedSchoolTwoName, setSelectedSchoolTwoName] = useState("");
  let [isCourse1, setIsCourse1] = useState(false);
  let [isCourse2, setIsCourse2] = useState(false);
  let [open, setOpen] = useState(false);
  let [open2, setOpen2] = useState(false);
  let [selectedCourse1, setSelectedCourse1] = useState({
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
  let [selectedCourse2, setSelectedCourse2] = useState({
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

  const [showLoading, setShowLoading] = useState(false);
  const [selectedDegreeType, setSelectedDegreeType] = useState("");

  useEffect(() => {
    (async () => {
      const { value } = await Storage.get({ key: "courseId" });
      if (value) {
        const findCourseById = await ApiService.findCourseById(value);
        const courseData = findCourseById.data.data;
        setSelectedCourse1(courseData);

        setSelectedDegreeType(courseData.DegreeType.id);
      }

      const degreeTypeResult = ApiService.degreeTypes();

      setDegreeTypes((await degreeTypeResult).data.data);
    })();
  }, []);

  const openModal = async (e: any) => {
    setOpen(true);
  };

  const openModal2 = async (e: any) => {
    setOpen2(true);
  };

  const handleCloseModal = async () => {
    setOpen(false);
  };

  const handleCloseModal2 = async () => {
    setOpen2(false);
  };

  const handleSelectedCourse = async (course: any) => {
    setOpen(false);
    setSelectedCourse1(course);
  };

  const handleSelectedCourse2 = async (course: any) => {
    setOpen2(false);
    setSelectedCourse2(course);
  };
  const save = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const saveResult = await ApiService.saveApplication({
      courseOne: selectedCourse1?.name,
      courseTwo: selectedCourse2?.name,
      institutionOne: selectedCourse1?.Institution?.name,
      institutionTwo: selectedCourse2?.Institution?.name,
      degreeTypeId: selectedDegreeType,
      userId: userId,
    });

    const { error } = saveResult.data;
    if (error) alert("Error");
    else history.replace(`/applySuccess`);

    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Application</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={save}>
          <IonList>
            <MyModal
              message={"Modal body"}
              open={open}
              degreeTypeId={selectedDegreeType}
              handleClose={handleCloseModal}
              handleSelectedCourse={handleSelectedCourse}
            />

            <MyModal
              message={"Modal body"}
              open={open2}
              degreeTypeId={selectedDegreeType}
              handleClose={handleCloseModal2}
              handleSelectedCourse={handleSelectedCourse2}
            />
            <IonItem>
              <IonLabel>Degree Types</IonLabel>
              <IonSelect
                name="selectedDegreeType"
                value={selectedDegreeType}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  setSelectedDegreeType(e.detail.value);
                }}
              >
                {degreeTypes.map((item: any) => (
                  <>
                    <IonSelectOption key={item.id} value={item.id}>
                      {item.name}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            {selectedCourse1.name && (
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg
                    src={`${
                      selectedCourse1.CoursePhoto &&
                      selectedCourse1.CoursePhoto.url
                    }`}
                  />
                </IonAvatar>

                <IonLabel>
                  <h2>{selectedCourse1.name}</h2>
                  <h3>{selectedCourse1.Institution.name}</h3>
                  <p>{selectedCourse1.fee}</p>
                </IonLabel>
              </IonItem>
            )}

            {selectedDegreeType && (
              <IonButton
                className="ion-margin"
                shape="round"
                expand="block"
                onClick={openModal}
                size="default"
                color="success"
              >
                <IonIcon slot="start" icon={school} />
                Select First Course
              </IonButton>
            )}

            {selectedCourse2.name && (
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg
                    src={`${
                      selectedCourse2.CoursePhoto &&
                      selectedCourse2.CoursePhoto.url
                    }`}
                  />
                </IonAvatar>

                <IonLabel>
                  <h2>{selectedCourse2.name}</h2>
                  <h3>{selectedCourse2.Institution.name}</h3>
                  <p>{selectedCourse2.fee}</p>
                </IonLabel>
              </IonItem>
            )}
            {selectedCourse1.name && (
              <IonButton
                className="ion-margin"
                shape="round"
                expand="block"
                onClick={openModal2}
                size="default"
                color="success"
              >
                <IonIcon slot="start" icon={school} />
                Select Second Course
              </IonButton>
            )}
          </IonList>
          <br />
          <br />
          <IonButton
            disabled={selectedDegreeType == "" || selectedCourse1.name == ""}
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Submit
          </IonButton>

          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Application;
