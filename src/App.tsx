import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet,IonIcon, IonLabel, IonTabBar,
  IonTabButton,
  IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, schoolOutline, laptopOutline,storefrontOutline } from 'ionicons/icons';
import Course from './pages/Courses';
import Institutions  from './pages/Institutions';
import Faculty from './pages/Faculty';
import Dashboard from './pages/Dashboard';
import FacultyCourse from './pages/FacultyCourse';
import CourseDetail from './pages/CourseDetail';
import School from './pages/School';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    
    <IonTabs> 
      <IonRouterOutlet>
        <Route component={FacultyCourse} exact path="/facultyCourse/:id"/>
        <Route component={CourseDetail} exact path="/courseDetail/:id"/> 
        <Route component={Course} exact path="/courses"/> 
        <Route component={School} exact path="/school"/> 
        <Route component={Institutions} exact path="/institutions"/>
        <Route component={Dashboard} exact path="/dashboard"/>
        <Route component={Faculty} exact path="/faculty"/>
        <Route path="/" render={() => <Redirect to="/dashboard" />} exact={true} />
        
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/dashboard">
            <IonIcon icon={laptopOutline} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/institutions">
            <IonIcon icon={storefrontOutline} />
            <IonLabel>Institutions</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/faculty">
            <IonIcon icon={square} />
            <IonLabel>Faculties</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/courses">
            <IonIcon icon={schoolOutline} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
