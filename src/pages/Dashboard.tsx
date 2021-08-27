import React, { useState, useEffect } from "react";

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

  const history = useHistory();
  let [userId, setUserId] = useState(authValues.user.id);
  let [applications, setApplications] = useState([]);
  let [hasApplied, setHasApplied] = useState(false);
  let [buttonText, setButtontext] = useState("Apply");
  let [message, setMessage] = useState("");
  let [showAlert, setShowAlert] = useState(false);
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
    })();
  }, [id]);

  const apply = (e: any) => {
    e.preventDefault();
    history.push(`/highestQuali`);
    // const findPendingApplication = applications.find(
    //   (x: any) => x.Decision == null
    // );

    // if (findPendingApplication) {
    //   setShowAlert(true);
    //   setMessage("You already have got an application waiting to be approved.");
    //   return;
    // } else {
    //   history.push(`/highestQuali`);
    // }
  };
  return (
    <IonPage>
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
                <IonHeader>
                  <h2 style={{ textAlign: "center" }}>{item.refNo}</h2>
                </IonHeader>
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

                  <IonLabel>Has CAS?</IonLabel>
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
                  <IonIcon
                    slot="end"
                    size="large"
                    color={hasCAS ? "success" : "danger"}
                    icon={hasCAS ? happyOutline : sadOutline}
                  ></IonIcon>
                  <IonLabel>Has CAS?</IonLabel>
                </IonItem>
                <IonItem>
                  <IonNote slot="end" color="primary">
                    <h5>{Decision ? Decision.name : "Pending"}</h5>
                  </IonNote>
                  <IonLabel>Decision</IonLabel>
                </IonItem>
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
