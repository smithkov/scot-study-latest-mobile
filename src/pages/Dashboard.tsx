import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonCheckbox,
  IonButton,
  IonItemDivider,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonImg,
  IonLoading,
} from "@ionic/react";
import { sadOutline, happyOutline } from "ionicons/icons";
import "./faculty.css";
import { RouteComponentProps, useHistory } from "react-router-dom";
import AuthContext from "../my-context";
import ApiService from "../services/api";
import MyAlert from "../widget/myAlert";

const endpoint = `https://scotstudy.foodengo.com/api/`;

interface DashboardProps
  extends RouteComponentProps<{
    id: any;
  }> {}
const Dashboard: React.FC<DashboardProps> = ({ match }) => {
  const { authValues } = React.useContext(AuthContext);
  const id = match.params.id;
  const fontSize = { fontSize: 11, backgroundColor: "blue" };
  const history = useHistory();
  let [userId, setUserId] = useState(authValues.user.id);
  let [applications, setApplications] = useState([]);
  let [hasApplied, setHasApplied] = useState(false);
  let [buttonText, setButtontext] = useState("Apply");
  let [message, setMessage] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [showLoading, setShowLoading] = useState(true);
  const imgStyle = {
    height: "40px",
    width: "40px",
    display: "block",
    margin: "auto",
  };
  let [isHasUnApprovedApplication, setIsHasUnApprovedApplication] =
    useState(false);

  useEffect(() => {
    (async () => {
      const findApplications = await ApiService.findApplicationsByUser({
        userId,
      });
      const applicationResult = findApplications.data.data;
      setApplications(applicationResult);
      let isNewApplication;
      setHasApplied(
        (isNewApplication = applicationResult.length > 0 ? true : false)
      );

      const highestQualification = await ApiService.findHighestQualification({
        userId,
      });
      const highestQualiData = highestQualification.data.data;
      if (applicationResult.length == 0 && highestQualiData) {
        setButtontext("Resume application");
      } else if (applicationResult.length > 0 && highestQualiData) {
        setButtontext("Start another application");
      }
      setShowLoading(false);
    })();
  }, [id]);

  const applicationDetail = (id: any) => {
    history.push(`/applicationView/${id}`);
  };
  const apply = (e: any) => {
    e.preventDefault();
    history.push(`/highestQuali`);
  };
  const courses = (id: any) => {
    history.push(`/facultyCourse/${id}`);
  };
  return (
    <IonPage>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
      />
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <MyAlert message={message} showAlert={showAlert} />
      <IonContent fullscreen>
        <IonCard style={{ textAlign: "center" }} color="light">
          <IonGrid>
            <IonRow className="ion-align-items-center ion-margin">
              <IonCol
                onClick={() => courses("36f19d62-ca16-4392-afc3-f6253d2da620")}
              >
                <IonImg style={imgStyle} src="/assets/icon/engineering.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Engineering
                </h6>
              </IonCol>
              <IonCol
                onClick={() => courses("3ef55fdd-6c8e-419f-9196-6053794b4095")}
              >
                <IonImg style={imgStyle} src="/assets/icon/science.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Life Sciences
                </h6>
              </IonCol>
              <IonCol
                onClick={() => courses("250d2d75-7e69-49fa-8234-1cd565f57376")}
              >
                <IonImg style={imgStyle} src="/assets/icon/business.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Business & Management
                </h6>
              </IonCol>
              <IonCol
                className="ion-align-self-center"
                onClick={() => courses("48478e98-42a6-4f08-9e49-8317870bfb44")}
              >
                <IonImg style={imgStyle} src="/assets/icon/media.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Media & Design
                </h6>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-margin">
              <IonCol
                onClick={() => courses("8d246951-4b16-44f6-8cfa-8bd736742825")}
              >
                <IonImg style={imgStyle} src="/assets/icon/computer.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Computer Science
                </h6>
              </IonCol>
              <IonCol
                onClick={() => courses("4d9d1262-450a-4eb9-a6a4-cff838af42d1")}
              >
                <IonImg style={imgStyle} src="/assets/icon/medicine.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>Medicine</h6>
              </IonCol>
              <IonCol
                onClick={() => courses("7fb12650-7615-4614-bbf2-797d885c7c40")}
              >
                <IonImg style={imgStyle} src="/assets/icon/nursing.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>Nursing</h6>
              </IonCol>
              <IonCol
                onClick={() => courses("8d246951-4b16-44f6-8cfa-8bd736742825")}
              >
                <IonImg style={imgStyle} src="/assets/icon/social.png" />
                <h6 style={{ textAlign: "center", fontSize: 11 }}>
                  Social Sciences & Humanities
                </h6>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonList>
          {applications.map((item: any) => {
            const {
              hasPaid,
              Decision,
              eligibilityCheck,
              hasCAS,
              VisaApplyStatus,
            } = item;
            return (
              <>
                <IonCard
                  style={{ textAlign: "center" }}
                  onClick={() => applicationDetail(item.id)}
                  color="light"
                >
                  <h2 style={{ textAlign: "center" }}>{item.refNo}</h2>

                  <IonItem>
                    <IonIcon
                      slot="end"
                      size="large"
                      color="success"
                      icon={happyOutline}
                    ></IonIcon>
                    <IonLabel>Form Submission</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon
                      slot="end"
                      size="large"
                      color={eligibilityCheck ? "success" : "danger"}
                      icon={eligibilityCheck ? happyOutline : sadOutline}
                    ></IonIcon>

                    <IonLabel>Eligibily Check</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonNote slot="end" color="primary">
                      <h5>{Decision ? Decision.name : "Pending"}</h5>
                    </IonNote>
                    <IonLabel>Decision</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon
                      slot="end"
                      size="large"
                      color={hasPaid ? "success" : "danger"}
                      icon={hasPaid ? happyOutline : sadOutline}
                    ></IonIcon>
                    <IonLabel>Tuition Payment</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonNote slot="end" color="primary">
                      <h5>
                        {hasCAS ? (
                          <IonIcon
                            slot="end"
                            size="large"
                            color={"success"}
                            icon={happyOutline}
                          ></IonIcon>
                        ) : (
                          "Pending"
                        )}
                      </h5>
                    </IonNote>
                    <IonLabel>Has CAS?</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonNote slot="end" color="primary">
                      <h5>
                        {VisaApplyStatus ? VisaApplyStatus.name : "Pending"}
                      </h5>
                    </IonNote>
                    <IonLabel>Visa Application</IonLabel>
                  </IonItem>

                  <IonItem>
                    <IonNote slot="end" color="primary">
                      <h4>
                        <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>
                      </h4>
                    </IonNote>
                    <IonLabel>Date of submission</IonLabel>
                  </IonItem>
                  <IonItem style={{ textAlign: "center" }} color="medium">
                    <h4>First Course Of Choice</h4>
                  </IonItem>

                  <IonText color="primary">
                    <h4>{item.courseOne}</h4>
                  </IonText>
                  <h5>{item.institutionOne}</h5>

                  {item?.courseTwo ? (
                    <>
                      <IonItem color="medium">
                        <h4>Second Course Of Choice</h4>
                      </IonItem>

                      <IonText color="primary">
                        <h4>{item.courseTwo}</h4>
                      </IonText>
                      <h5>{item.institutionTwo}</h5>
                    </>
                  ) : (
                    ""
                  )}
                </IonCard>
                <br />
                <br />
              </>
            );
          })}
        </IonList>
        {!authValues.user.isUser && (
          <IonCard>
            <IonCardHeader style={{ textAlign: "center" }}>
              <IonCardTitle>
                Admin operations are only active on the web application
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        )}
        {authValues.user.isUser && (
          <IonButton
            onClick={apply}
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            {buttonText}
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
