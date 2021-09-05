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
  IonItemDivider,
  IonText,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { checkmarkCircle } from "ionicons/icons";

import axios from "axios";
import ApiService from "../services/api";

interface ApplicationViewProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const ApplicationView: React.FC<ApplicationViewProps> = ({ match }) => {
  const id = match.params.id;
  const { authValues } = React.useContext(AuthContext);
  const [userId, setUserId] = useState(authValues.user.id);
  const [english, setEnglish] = useState({ name: "", score: "" });
  const [title, setTitle] = useState("");
  const [highSchool, setHighSchool] = useState({
    highSchoolName: "",
    completionYear: "",
  });
  const [highestQuali, setHighestQuali] = useState({
    hq_grade: "",
    hq_schoolName: "",
    hq_completed: "",
    hq_programmeYear: "",
  });
  const [previousQuali, setPreviousQuali] = useState({
    pq_grade: "",
    pq_schoolName: "",
    pq_completed: "",
    pq_programmeYear: "",
  });
  const [sponsor, setSponsor] = useState({
    sponsor: "",
    name: "",
    occupation: "",
    budget: "",
    Relationship: { name: "" },
  });
  const [visa, setVisa] = useState({
    hasApplied: "",
    purpose: "",
    hasRefused: "",
    reason: "",
    moreInfo: "",
  });
  const [application, setApplication] = useState({
    hasDeleted: "",
    stage: "",
    decision: "",
    DegreeType: { name: "" },
    cityId: "",
    courseOne: "",
    courseTwo: "",
    institutionOne: "",
    institutionTwo: "",
    userId: "",
    eligibilityCheck: "",
    createdAt: "",
    hasSubmitted: "",
    hasApplied: "",
    hasPaid: "",
    hasDecided: "",
    hasCAS: "",
    refNo: "",
  });

  useEffect(() => {
    (async () => {
      const findEnglish = await ApiService.findEnglish({
        userId,
      });
      setEnglish(findEnglish.data.data);

      const findHighestQuali = await ApiService.findHighestQualification({
        userId,
      });
      setHighestQuali(findHighestQuali.data.data);

      const findHighSchool = await ApiService.findHighSchool({
        userId,
      });
      setHighSchool(findHighSchool.data.data);
      const findPreviousQuali = await ApiService.findPreviousQualification({
        userId,
      });

      setPreviousQuali(findPreviousQuali.data.data);
      const findSponsorship = await ApiService.findSponsorship({
        userId,
      });
      setSponsor(findSponsorship.data.data);

      const findVisaHistory = await ApiService.findVisaHistory({
        userId,
      });
      setVisa(findVisaHistory.data.data);
      const findApplication = await ApiService.findApplicationById({
        id,
      });
      setApplication(findApplication.data.data);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">{application.refNo}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonCard>
            <h4 style={{ textAlign: "center" }}>Highest Qualification</h4>

            <IonItem>
              <IonLabel>Shool Name</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highestQuali.hq_schoolName}</h5>
              </IonNote>
            </IonItem>

            <IonItem>
              <IonLabel>Grade</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highestQuali.hq_grade}</h5>
              </IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Year</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highestQuali.hq_programmeYear}</h5>
              </IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Has Completed?</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highestQuali.hq_completed}</h5>
              </IonNote>
            </IonItem>
          </IonCard>
          {previousQuali?.pq_schoolName ? (
            <IonCard>
              <h4 style={{ textAlign: "center" }}>Previous Qualification</h4>

              <IonItem>
                <IonLabel>Shool Name</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{previousQuali?.pq_schoolName}</h5>
                </IonNote>
              </IonItem>

              <IonItem>
                <IonLabel>Grade</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{previousQuali?.pq_grade}</h5>
                </IonNote>
              </IonItem>
              <IonItem>
                <IonLabel>Year</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{previousQuali?.pq_programmeYear}</h5>
                </IonNote>
              </IonItem>
              <IonItem>
                <IonLabel>Has Completed?</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{previousQuali?.pq_completed}</h5>
                </IonNote>
              </IonItem>
            </IonCard>
          ) : (
            ""
          )}
          <IonCard>
            <h4 style={{ textAlign: "center" }}>High School</h4>

            <IonItem>
              <IonLabel>Shool Name</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highSchool.highSchoolName}</h5>
              </IonNote>
            </IonItem>

            <IonItem>
              <IonLabel>Year</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{highSchool.completionYear}</h5>
              </IonNote>
            </IonItem>
          </IonCard>
          {english?.name != "" && english?.name != "NONE" ? (
            <IonCard>
              <h4 style={{ textAlign: "center" }}>English Test</h4>

              <IonItem>
                <IonLabel>Test Name</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{english.name}</h5>
                </IonNote>
              </IonItem>

              <IonItem>
                <IonLabel>Score</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{english.score}</h5>
                </IonNote>
              </IonItem>
            </IonCard>
          ) : (
            ""
          )}
          <IonCard>
            <h4 style={{ textAlign: "center" }}>Sponsorship</h4>

            <IonItem>
              <IonLabel>Sponsor</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{sponsor.sponsor}</h5>
              </IonNote>
            </IonItem>

            <IonItem>
              <IonLabel>Name</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{sponsor.name}</h5>
              </IonNote>
            </IonItem>
            {sponsor.Relationship?.name ? (
              <IonItem>
                <IonLabel>Relationsship</IonLabel>
                <IonNote slot="end" color="primary">
                  <h5>{sponsor.Relationship?.name}</h5>
                </IonNote>
              </IonItem>
            ) : (
              ""
            )}

            <IonItem>
              <IonLabel>Occupation</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{sponsor.occupation}</h5>
              </IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Budget</IonLabel>
              <IonNote slot="end" color="primary">
                <h5>{sponsor.budget}</h5>
              </IonNote>
            </IonItem>
          </IonCard>
          <IonCard>
            <h4 style={{ textAlign: "center" }}>UK Visa History</h4>

            <IonItem lines="none">
              <IonLabel>Has Applied For A UK Visa Before ?</IonLabel>
            </IonItem>
            <IonItemDivider>
              <IonLabel>
                <h4>{visa.hasApplied}</h4>
              </IonLabel>
            </IonItemDivider>
            {visa?.hasApplied == "No" ? (
              ""
            ) : (
              <>
                <IonItem lines="none">
                  <IonLabel>Purpose of Travel</IonLabel>
                </IonItem>
                <IonItemDivider>
                  <IonLabel>
                    <h4>{visa.purpose}</h4>
                  </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                  <IonLabel>Has Refused UK Visa Before?</IonLabel>
                </IonItem>
                <IonItemDivider>
                  <IonLabel>
                    <h4>{visa.hasRefused}</h4>
                  </IonLabel>
                </IonItemDivider>
                {visa.hasRefused == "Yes" ? (
                  <>
                    <IonItem lines="none">
                      <IonLabel>Reason for Refusal</IonLabel>
                    </IonItem>
                    <IonItemDivider>
                      <IonLabel>
                        <h4>{visa.reason}</h4>
                      </IonLabel>
                    </IonItemDivider>
                  </>
                ) : (
                  ""
                )}

                <IonItem lines="none">
                  <IonLabel>More Information</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel></IonLabel>
                  <IonNote slot="end" color="primary">
                    <h5>{visa.moreInfo}</h5>
                  </IonNote>
                </IonItem>
              </>
            )}
          </IonCard>

          <IonCard>
            <h4 style={{ textAlign: "center" }}>Application</h4>

            <IonItem lines="none">
              <IonLabel>First Course Of Choice</IonLabel>
            </IonItem>
            <IonItemDivider>
              <IonText color="primary">
                <h4>{application.courseOne}</h4>
              </IonText>
            </IonItemDivider>
            <IonItemDivider>
              <IonLabel>{application.institutionOne}</IonLabel>
            </IonItemDivider>

            {application?.courseTwo ? (
              <>
                <IonItem lines="none">
                  <IonLabel>Second Course Of Choice</IonLabel>
                </IonItem>
                <IonItemDivider>
                  <IonText color="primary">
                    <h4>{application.courseTwo}</h4>
                  </IonText>
                </IonItemDivider>
                <IonItemDivider>
                  <IonLabel>{application.institutionTwo}</IonLabel>
                </IonItemDivider>
              </>
            ) : (
              ""
            )}

            <IonItem lines="none">
              <IonLabel>Degree Type</IonLabel>
            </IonItem>
            <IonItemDivider>
              <IonText color="primary">
                <h4>{application.DegreeType.name}</h4>
              </IonText>
            </IonItemDivider>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ApplicationView;
