import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faSchool,
  faTachometerAlt,
  faGraduationCap,
  faBalanceScale,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSplitPane,
  IonPage,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  schoolOutline,
  laptopOutline,
  storefrontOutline,
  logOutOutline,
  swapHorizontalOutline,
} from "ionicons/icons";
import Course from "./pages/Courses";
import Institutions from "./pages/Institutions";
import Faculty from "./pages/Faculty";
import Dashboard from "./pages/Dashboard";
import FacultyCourse from "./pages/FacultyCourse";
import CourseDetail from "./pages/CourseDetail";
import School from "./pages/School";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import HighestQuali from "./application/HighestQuali";
import PreviousQuali from "./application/PreviousQuali";
import HighSchool from "./application/HighSchool";
import EnglishTest from "./application/EnglishTest";
import Sponsorship from "./application/Sponsorship";
import VisaHistory from "./application/VisaHistory";
import Application from "./application/Application";
import Profile from "./application/Profile";
import Compare from "./pages/Compare";
import Menu from "./widget/menu";
import Config from "./utility/config";
import ForgotSuccess from "./accounts/ForgotSuccess";
import Forgot from "./accounts/Forgot";
import ApplicationView from "./application/ApplicationView";
import Checklist from "./pages/Checklist";
import Tour from "./accounts/Tour";
import UploadDoc from "./pages/Upload";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import {
  home,
  cardOutline,
  personCircleOutline,
  laptopSharp,
  chatbubblesOutline,
  readerOutline,
  checkboxOutline,
} from "ionicons/icons";
/* Theme variables */
import "./theme/variables.css";
import PaymentList from "./pages/PaymentList";
import AuthContext from "./my-context";
import ApplySuccess from "./application/ApplySuccess";
import DashboardPage from "./pages/Dashboard";
import { AppPage } from "./declarations";
import Institution from "./pages/Institution";
library.add(
  faCheckSquare,
  faSchool,
  faTachometerAlt,
  faGraduationCap,
  faBalanceScale,
  faDesktop
);
const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: Config.dashRoute(),
    icon: laptopSharp,
  },

  {
    title: "My Account",
    url: "/profile",
    icon: personCircleOutline,
  },

  {
    title: "Payments",
    url: "/payments",
    icon: cardOutline,
  },
  {
    title: "Checklist",
    url: "/checklist",
    icon: checkboxOutline,
  },
  {
    title: "About Us",
    url: "/about",
    icon: readerOutline,
  },
  {
    title: "Chat Us",
    url: "/chat",
    icon: chatbubblesOutline,
  },

  {
    title: "Logout",
    url: "/login",
    icon: logOutOutline,
  },
];
const tabColor = "#3880ff";
const App: React.FC = () => {
  const { authValues } = React.useContext(AuthContext);

  return (
    <IonApp>
      {!authValues.authenticated ? (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route component={Register} exact path="/register" />
            <Route component={Login} exact path="/login" />
            <Route component={Tour} exact path="/tour" />
            <Route component={Forgot} exact path="/forgot" />
            <Route component={ForgotSuccess} exact path="/forgotSuccess" />
            <Route
              path="/"
              render={() => (
                <Redirect
                  to={authValues.hasLoadedOnce == "true" ? "/login" : "/tour"}
                />
              )}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <IonSplitPane contentId="main">
                <Menu appPages={appPages} />
                <IonPage id="main">
                  <IonRouterOutlet>
                    <Route path="/dashboard/:id" component={Dashboard} />
                    <Route component={Profile} path={`/profile`} />
                    <Route component={PaymentList} path={`/payments`} />
                    <Route component={Faculty} path="/faculty" />

                    <Route
                      component={FacultyCourse}
                      path="/facultyCourse/:id"
                    />
                    <Route component={CourseDetail} path="/courseDetail/:id" />
                    <Route
                      component={ApplicationView}
                      path="/applicationView/:id"
                    />
                    <Route component={Institution} path="/institution/:id" />
                  </IonRouterOutlet>
                </IonPage>
              </IonSplitPane>

              <Route component={Course} path="/courses" />
              <Route component={Compare} path="/compare" />
              <Route component={Checklist} path="/checklist" />
              <Route component={School} path="/school" />
              <Route component={Institutions} path="/institutions" />
              <Route component={HighestQuali} path={`/highestQuali`} />
              <Route component={HighSchool} path={`/highSchool`} />
              <Route component={EnglishTest} path={`/englishTest`} />
              <Route component={Sponsorship} path={`/sponsorship`} />
              <Route component={VisaHistory} path={`/visaHistory`} />
              <Route component={Application} path={`/application`} />
              <Route component={ApplySuccess} path="/applySuccess" />
              <Route component={UploadDoc} path="/upload" />
              <Route component={Compare} path="/compare" />

              <Route
                component={PreviousQuali}
                path={`/previousQualification`}
              />

              <Route
                path="/"
                render={() => <Redirect to={Config.dashRoute()} />}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href={Config.dashRoute()}>
                <FontAwesomeIcon style={{color:tabColor}} size="2x" icon="desktop" />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/institutions">
                <FontAwesomeIcon style={{color:tabColor}} size="2x" icon="school" />
                <IonLabel>Institutions</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="tab4" href="/courses">
                <FontAwesomeIcon style={{color:tabColor}} size="2x" icon="graduation-cap" />
                <IonLabel>Courses</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab5" href="/compare">
                <FontAwesomeIcon style={{color:tabColor}} size="2x" icon="balance-scale" />
                <IonLabel>Compare</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
