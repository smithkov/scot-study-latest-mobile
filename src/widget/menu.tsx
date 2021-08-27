import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { AppPage } from "../declarations";
import AuthContext from "../my-context";

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const { logout, authValues } = React.useContext(AuthContext);
  const history = useHistory();
  const handleRoute = async (url: any) => {
    if (url == "/login") {
      logout();
    }
    history.replace(url);
  };
  return (
    <IonMenu contentId="main">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <br />
        <br />
        <br />
        <IonList>
          <IonMenuToggle key={4} auto-hide="false">
            <IonItem>
              <IonLabel>
                {" "}
                <h2>
                  <strong>{authValues.user?.firstname}</strong>
                </h2>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} auto-hide="false">
                <IonItem onClick={() => handleRoute(appPage.url)}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
