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
import FilterCompare from "../widget/filterCompare";
import NoResult from "../widget/noResult";
import { off } from "process";

const endpoint = `https://scotstudy.foodengo.com/api/`;

const Compare: React.FC = () => {
  const initialOffset = 0;
  const initialLimit = 6;
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedInstitution1, setSelectedInstitution1] = useState("");
  const [selectedInstitution2, setSelectedInstitution2] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadType, setLoadType] = useState(LoadStatus.Loading);
  const [offset, setOffset] = useState(initialOffset);

  useEffect(() => {
    (async () => {
      const result = await ApiService.compare({
        institutionId1: selectedInstitution1,
        institutionId2: selectedInstitution2,
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
    })();
  }, []);

  async function searchNext($event: CustomEvent<void>) {
    let newOffset = offset + initialOffset;
    setOffset(newOffset);
    const result = await ApiService.compare({
      institutionId1: selectedInstitution1,
      institutionId2: selectedInstitution2,
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

  const handleSearch = async (e: any) => {
    const value = e.target.value;
    setSearchText(value);
    const result = await ApiService.compare({
      institutionId1: selectedInstitution1,
      institutionId2: selectedInstitution2,
      facultyId: selectedFaculty,
      offset: offset,
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
    applyFilter();
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOnChangeDegreeType = async (e: any) => {
    setSelectedDegreeType(e.detail.value);
  };
  const handleOnChangeFaculty = async (e: any) => {
    setSelectedFaculty(e.detail.value);
  };

  const applyFilter = async () => {
    setOffset(initialOffset);

    const result = await ApiService.compare({
      institutionId1: selectedInstitution1,
      institutionId2: selectedInstitution2,
      facultyId: selectedFaculty,
      offset: initialOffset,
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

  const handleOnChangeInstitution1 = async (e: any) => {
    setSelectedInstitution1(e.detail.value);
  };

  const handleOnChangeInstitution2 = async (e: any) => {
    setSelectedInstitution2(e.detail.value);
  };
  return (
    <IonPage>
      <FilterCompare
        isShowFaculty={true}
        institutions={institutions}
        faculties={faculties}
        degreeTypes={degreeTypes}
        open={open}
        handleClose={handleClose}
        handleOnChangeDegreeType={handleOnChangeDegreeType}
        handleOnChangeFaculty={handleOnChangeFaculty}
        selectedDegreeType={selectedDegreeType}
        selectedFaculty={selectedFaculty}
        selectedInstitution1={selectedInstitution1}
        handleOnChangeInstitution1={handleOnChangeInstitution1}
        selectedInstitution2={selectedInstitution2}
        handleOnChangeInstitution2={handleOnChangeInstitution2}
      />
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Compare</IonTitle>
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

                {selectedInstitution1 && selectedInstitution2 && (
                  <IonText
                    color={
                      item.Institution?.id == selectedInstitution1
                        ? "danger"
                        : "tertiary"
                    }
                  >
                    <h3>
                      <strong>{item.Institution?.name}</strong>
                    </h3>
                  </IonText>
                )}
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

export default Compare;
