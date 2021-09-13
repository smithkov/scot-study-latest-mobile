import React, { useState, useEffect } from "react";
import { LoadStatus } from "../utility/config";
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
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonText,
} from "@ionic/react";
import { checkmarkCircle, filterCircle, search } from "ionicons/icons";
import ApiService from "../services/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Filter from "../widget/filter";
import NoResult from "../widget/noResult";
import { off } from "process";

const endpoint = `https://scotstudy.foodengo.com/api/`;

const Course: React.FC = () => {
  const initialLimit = 6;
  const initialOffset = 0;
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadType, setLoadType] = useState(LoadStatus.Loading);
  const [offset, setOffset] = useState(initialOffset);
  const [institutions, setInstitutions] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [faculties, setFaculties] = useState([]);
  let hasLoaded = false;

  useIonViewWillEnter(async () => {
    if (!hasLoaded) {
      hasLoaded = true;
      const result = await ApiService.allCoursesSearch({
        institutionId: selectedInstitution,
        facultyId: selectedFaculty,
        offset: offset,
        limit: initialLimit,
        degreeTypeId: selectedDegreeType,
        search: searchText,
      });

      let dataResult = result.data.data;
      setCourses(dataResult);
      if (dataResult.length > 0) {
        setLoadType(LoadStatus.Loaded);
      } else {
        setLoadType(LoadStatus.Empty);
      }
      setShowLoading(false);

      const institutionResult = await ApiService.institutions();
      setInstitutions(institutionResult.data.data);

      const degreeTyeResult = await ApiService.degreeTypes();
      setDegreeTypes(degreeTyeResult.data.data);

      const facultyResult = await ApiService.facultiesLight();
      setFaculties(facultyResult.data.data);
    }
  });

  async function searchNext($event: CustomEvent<void>) {
    let newOffset = offset + initialLimit;
    setOffset(newOffset);
    const result = await ApiService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset: newOffset,
      limit: initialLimit,
      degreeTypeId: selectedDegreeType,
      search: searchText,
    });
    let dataResult: any = result.data.data;

    setCourses(courses.concat(dataResult));
    // if (dataResult.length > 0) {
    //   setLoadType(LoadStatus.Loaded);
    // } else {
    //   setLoadType(LoadStatus.Empty);
    // }
    setShowLoading(false);

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  // useEffect(() => {
  //   //return () => {

  //   (async () => {
  //     const result = await ApiService.allCoursesSearch({
  //       institutionId: selectedInstitution,
  //       facultyId: selectedFaculty,
  //       offset: 1,
  //       limit: initialLimit,
  //       degreeTypeId: selectedDegreeType,
  //       search: searchText,
  //     });
  //     let dataResult = result.data.data;
  //     setCourses(dataResult);
  //     if (dataResult.length > 0) {
  //       setLoadType(LoadStatus.Loaded);
  //     } else {
  //       setLoadType(LoadStatus.Empty);
  //     }
  //     setShowLoading(false);
  //   })();

  //   //};
  // }, []);
  const handleSearch = async (e: any) => {
    const value = e.target.value;
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSearchText(value);
    const result = await ApiService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset: newOffset,
      limit: initialLimit,
      degreeTypeId: selectedDegreeType,
      search: value,
    });
    let dataResult = result.data.data;
    setCourses(dataResult);
    if (dataResult.length > 0) {
      setLoadType(LoadStatus.Loaded);
    } else {
      setLoadType(LoadStatus.Empty);
    }
  };
  const courseDetail = (id: any) => {
    history.push(`/courseDetail/${id}`);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOnChangeDegreeType = async (e: any) => {
    const value = e.detail.value;
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSelectedDegreeType(value);
    const result = await ApiService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      offset:newOffset,
      limit: initialLimit,
      degreeTypeId: value,
      search: searchText,
    });
    let dataResult = result.data.data;
    setCourses(dataResult);
    if (dataResult.length > 0) {
      setLoadType(LoadStatus.Loaded);
    } else {
      setLoadType(LoadStatus.Empty);
    }
    setShowLoading(false);
  };
  const handleOnChangeFaculty = async (e: any) => {
    const value = e.detail.value;
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSelectedFaculty(value);
    const result = await ApiService.allCoursesSearch({
      institutionId: selectedInstitution,
      facultyId: value,
      offset: newOffset,
      limit: initialLimit,
      degreeTypeId: selectedDegreeType,
      search: searchText,
    });
    let dataResult = result.data.data;
    setCourses(dataResult);
    if (dataResult.length > 0) {
      setLoadType(LoadStatus.Loaded);
    } else {
      setLoadType(LoadStatus.Empty);
    }
    setShowLoading(false);
  };

  const handleOnChangeInstitution = async (e: any) => {
    const value = e.detail.value;
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSelectedInstitution(value);
    const result = await ApiService.allCoursesSearch({
      institutionId: value,
      facultyId: selectedFaculty,
      offset: newOffset,
      limit: initialLimit,
      degreeTypeId: selectedDegreeType,
      search: searchText,
    });

    let dataResult = result.data.data;
    setCourses(dataResult);
    if (dataResult.length > 0) {
      setLoadType(LoadStatus.Loaded);
    } else {
      setLoadType(LoadStatus.Empty);
    }
    setShowLoading(false);
  };
  return (
    <IonPage>
      <Filter
        isShowFaculty={true}
        open={open}
        handleClose={handleClose}
        handleOnChangeDegreeType={handleOnChangeDegreeType}
        handleOnChangeFaculty={handleOnChangeFaculty}
        selectedDegreeType={selectedDegreeType}
        selectedFaculty={selectedFaculty}
        selectedInstitution={selectedInstitution}
        handleOnChangeInstitution={handleOnChangeInstitution}
        institutions={institutions}
        faculties={faculties}
        degreeTypes={degreeTypes}
      />
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar style={{ padding: 5 }}>
        <IonSearchbar
          onIonInput={(e: any) => handleSearch(e)}
          placeholder="Search courses"
        ></IonSearchbar>
      </IonToolbar>
      <IonToolbar>
        <IonButtons onClick={handleOpen} slot="end">
          <IonIcon
            slot="end"
            size="large"
            color="primary"
            icon={filterCircle}
          ></IonIcon>
        </IonButtons>
      </IonToolbar>
      <IonContent fullscreen>
        <IonList>
          {courses.map((item: any) => (
            <IonItem onClick={() => courseDetail(item.id)}>
              <IonThumbnail slot="start">
                <IonImg src={`${item.CoursePhoto?.url}`} />
              </IonThumbnail>

              <IonLabel>
                <h2>{item.name}</h2>
                <IonText>
                  <h3>
                    <strong>{item.Institution?.name}</strong>
                  </h3>
                </IonText>
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
          <IonInfiniteScroll
            threshold="100px"
            disabled={disableInfiniteScroll}
            onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
          >
            <IonInfiniteScrollContent loadingText="Loading more data"></IonInfiniteScrollContent>
          </IonInfiniteScroll>
          {loadType == LoadStatus.Empty && <NoResult message="" />}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Course;
