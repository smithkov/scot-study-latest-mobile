import React, { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
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
  IonButtons,
  IonBackButton,
  IonLoading,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  IonText,
} from "@ionic/react";
import "./faculty.css";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { checkmarkCircle, filterCircleOutline, search } from "ionicons/icons";
import Filter from "../widget/filter";
import { LoadStatus } from "../utility/config";
import ApiService from "../services/api";
import NoResult from "../widget/noResult";
const endpoint = `https://scotstudy.foodengo.com/api/`;
const degree_k = "degreeFF";
const search_k ="searchFF";
const institution_k = "schoolFF";

interface FacultyCourseProps
  extends RouteComponentProps<{
    id: string;
  }> {}
const FacultyCourse: React.FC<FacultyCourseProps> = ({ match }) => {
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const facultyId = match.params.id;
  const initialOffset = 0;
  const initialLimit = 6;
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadType, setLoadType] = useState(LoadStatus.Loading);
  const [offset, setOffset] = useState(initialOffset);
  const [institutions, setInstitutions] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const getSearch = await Storage.get({ key: search_k });
      setSearchText(getSearch.value! || "");

      const getDegree = await Storage.get({ key: degree_k });
      setSelectedDegreeType(getDegree.value! || "");

      const getInstitution = await Storage.get({ key: institution_k });
      setSelectedInstitution(getInstitution.value! || "");


      const result = await ApiService.courseByParams({
        institutionId: getInstitution.value || "",
        offset: offset,
        limit: initialLimit,
        degreeTypeId: getDegree.value || "",
        search: getSearch.value || "",
        facultyId: facultyId,
      });

      let dataResult = result.data.data;
      setCourses(dataResult);

      setTitle(result.data.data[0].Faculty.name);
      if (dataResult.length > 0) {
        setLoadType(LoadStatus.Loaded);
      } else {
        setLoadType(LoadStatus.Empty);
      }
      setShowLoading(false);

      const institutionResult = await ApiService.institutionsLighter();
      setInstitutions(institutionResult.data.data);

      const degreeTyeResult = await ApiService.degreeTypes();
      setDegreeTypes(degreeTyeResult.data.data);
    })();
  }, [facultyId]);

  const handleSearch = async (e: any) => {
    const value = e.target.value;
    await Storage.set({
      key: institution_k,
      value: value,
    });
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSearchText(value);
    const result = await ApiService.courseByParams({
      facultyId: facultyId,
      institutionId: selectedInstitution,
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
    setShowLoading(false);
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

  async function searchNext($event: CustomEvent<void>) {
    let newOffset = offset + initialOffset;
    setOffset(newOffset);
    const result = await ApiService.courseByParams({
      facultyId: facultyId,
      institutionId: selectedInstitution,
      offset: offset,
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
  const handleOnChangeDegreeType = async (e: any) => {
    const value = e.detail.value;
    await Storage.set({
      key: degree_k,
      value: value,
    });
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSelectedDegreeType(value);
    const result = await ApiService.courseByParams({
      facultyId: facultyId,
      institutionId: selectedInstitution,
      offset: newOffset,
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

  const handleOnChangeInstitution = async (e: any) => {
    const value = e.detail.value;
    await Storage.set({
      key: institution_k,
      value: value,
    });
    const newOffset = initialOffset;
    setOffset(newOffset);
    setSelectedInstitution(value);
    const result = await ApiService.courseByParams({
      institutionId: value,
      facultyId: facultyId,
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
        isShowFaculty={false}
        open={open}
        handleClose={handleClose}
        handleOnChangeDegreeType={handleOnChangeDegreeType}
        handleOnChangeFaculty={() => null}
        selectedDegreeType={selectedDegreeType}
        selectedFaculty={""}
        selectedInstitution={selectedInstitution}
        handleOnChangeInstitution={handleOnChangeInstitution}
        institutions={institutions}
        faculties={""}
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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonToolbar>
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
            icon={filterCircleOutline}
          ></IonIcon>
        </IonButtons>
      </IonToolbar>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
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
          {loadType == LoadStatus.Empty && <NoResult message="" />}
          <IonInfiniteScroll
            threshold="100px"
            disabled={disableInfiniteScroll}
            onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
          >
            <IonInfiniteScrollContent loadingText="Loading more data"></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FacultyCourse;
