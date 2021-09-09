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

import axios from "axios";
import ApiService from "../services/api";
const endpoint = `https://scotstudy.foodengo.com/api/`;

interface CourseDetailProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const CourseDetail: React.FC<CourseDetailProps> = ({ match }) => {
  const id = match.params.id;
  const { authValues } = React.useContext(AuthContext);
  const history = useHistory();
  const [course, setCourse] = useState({
    id: "",
    name: "",
    intake: "",
    scholarshipAmount: "",
    fee: "",
    CoursePhoto: { url: "" },
    Faculty: { name: "" },
    DegreeType: { name: "", id: "" },
    City: { name: "" },
    Institution: { name: "" },
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      const result = await ApiService.findCourseById(id);
      setCourse(result.data.data);
      await Storage.remove({ key: "institution" });
    })();
  }, [id]);
  const apply = async (e: any) => {
    e.preventDefault();
    await Storage.set({
      key: "courseId",
      value: course.id,
    });

    history.replace("/highestQuali");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Course Detail</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonImg src={course.CoursePhoto?.url} />
          <IonCardHeader>
            <p>{course.Institution?.name}</p>
            <IonCardSubtitle>{course.fee}</IonCardSubtitle>
            <IonCardTitle>{course.name}</IonCardTitle>
            <p>{course.Faculty.name}</p>
          </IonCardHeader>

          <IonCardContent>
            <IonButton
              type="button"
              shape="round"
              onClick={apply}
              expand="block"
              disabled={!authValues.user.isUser}
            >
              Apply
            </IonButton>
          </IonCardContent>
        </IonCard>
        {/* <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              {" "}
              <IonChip>
                <IonLabel color="secondary">{course.Institution.name}</IonLabel>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid> */}
        <IonList>
          {course.City && (
            <IonItem>
              <IonLabel>City</IonLabel>
              <IonNote slot="end" color="tertiary">
                <h5>{course.City.name}</h5>
              </IonNote>
            </IonItem>
          )}

          {course.scholarshipAmount && (
            <IonItem>
              <IonLabel>Scholarship Amount</IonLabel>
              <IonNote slot="end">
                <h5>
                  <IonIcon color="success" size="medium" icon={checkmarkCircle}>
                    {" "}
                  </IonIcon>
                  {` ${course.scholarshipAmount}`}
                </h5>
              </IonNote>
            </IonItem>
          )}

          <IonItem>
            <IonLabel>Intake</IonLabel>
            <IonNote slot="end" color="tertiary">
              <h5>{course.intake}</h5>
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Degree</IonLabel>
            <IonNote slot="end" color="tertiary">
              <h5> {course.DegreeType.name}</h5>
            </IonNote>
          </IonItem>
        </IonList>
        <>
          <IonGrid>
            <IonRow>
              <IonCol className="ion-margin">
                {course.DegreeType.id ==
                "1aad6011-8464-4c38-a84e-36442d64911c" ? (
                  <div className="course-learn">
                    <h5>Course Requirements</h5>
                    <p>
                      Undergraduate is a post-secondary school education. An
                      undergraduate degree is a bachelor's or associate's
                      degree. Undergraduate degrees are offered at institutions
                      of higher learning and fall below the level of a master's
                      degree. If you are looking to pursue an undergraduate
                      degree, read on to find out more about the differences
                      between associate's and bachelor's degrees and the type of
                      educational requirements you can expect. Requirements for
                      admission into 1st year of university degree and advanced
                      entry (top-up){" "}
                    </p>
                    <br />
                    <br />
                    <p>-Completed application form</p>

                    <p> -Copy of passport data page</p>
                    <p>
                      -High school/diploma/advance diploma
                      certificates/statement of results
                    </p>
                    <p>-2 academic references</p>
                    <p>-CV</p>
                    <p>
                      -Any other relevant academic/vocational qualifications (if
                      any)
                    </p>

                    <br />
                    <p>
                      {" "}
                      IN ADDITION : Write a personal statement detailing your
                      reasons for choosing the proposed course and benefits to
                      be gained on completion.
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {/* Checks for postgraduates requirements */}
                {course.DegreeType.id ==
                "ead37f16-9474-4c55-ab96-c798341d60f4" ? (
                  <div className="course-learn">
                    <h5>Course Requirements</h5>
                    <p>
                      Generally, a postgraduate degree is a degree which you
                      study for once you have finished a bachelor's degree. Some
                      postgraduate degrees require the completion of particular
                      bachelor's degree from specified fields, others don't. As
                      a general rule, you need to have completed a bachelor's
                      degree before doing a postgraduate degree (although there
                      are some exceptions). There are four main types of
                      postgraduate degrees: taught courses, research degrees,
                      conversion courses and professional qualifications. Many
                      postgraduate courses are studied at university, but some
                      courses are taught in a commercial environment.
                      <br />
                      <br />
                      Requirements for admission for masters, masters of
                      research and doctorates.
                      <br />
                      <br />
                      - Completed application form.
                      <br />
                      - Copy of passport data page.
                      <br />- High school certificate/statement of result.
                      <br />
                      - Bachelors degree transcripts & certificate/statement of
                      results
                      <br />
                      - Write a personal statement detailing your reasons for
                      choosing the proposed course and benefits to be gained on
                      completion.
                      <br />
                      - 2 references (academic & profession).
                      <br />
                      - Curriculum Vitae.
                      <br />
                      - Masters degree certificate/transcript (for Masters
                      research and doctorate degree applicants).
                      <br />
                      - Research proposal (for masters of research and doctorate
                      degree applicants).
                      <br /> <br />
                      Please note : <br /> <br />
                      - Additional documentations may be required depending on
                      the proposed course i.e Architecture, MBA, Photography,
                      etc
                      <br />
                      - An interview may be required in some programmes.
                      <br />
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetail;
