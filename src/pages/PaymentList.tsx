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
  IonBackButton,
  IonAlert,
} from "@ionic/react";
import { checkmarkCircle, filterOutline, search } from "ionicons/icons";
import ApiService from "../services/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Filter from "../widget/filter";
import NoResult from "../widget/noResult";
const endpoint = `https://scotstudy.foodengo.com/api/`;

const PaymentList: React.FC = () => {
  const history = useHistory();
  const [payments, setPayments] = useState([]);
  const [loadType, setLoadType] = useState(LoadStatus.Loading);
  const [showLoading, setShowLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  let [userId, setUserId] = useState("e2352890-171d-4d14-95f9-80879b3c8f99");

  useEffect(() => {
    //return () => {

    (async () => {
      const result = await ApiService.findUserPayments({
        userId: userId,
      });
      let dataResult = result.data.data;
      setPayments(dataResult);

      setShowLoading(false);
      if (dataResult.length > 0) {
        setLoadType(LoadStatus.Loaded);
      } else {
        setLoadType(LoadStatus.Empty);
      }
    })();

    //};
  }, []);

  const pay = () => {
    setShowAlert(true);
  };
  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Payment Notice"}
        message={
          "<strong>You will be redirected to Scot-Study web application to continue with payment</strong>"
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Continue",
            handler: () => {
              window.location.href = "https://scotstudy.co.uk/payment";
            },
          },
        ]}
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
          <IonTitle className="ion-text-center">Payments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <br />
        <br />
        <IonButton
          onClick={pay}
          className="ion-margin"
          type="submit"
          shape="round"
          expand="block"
          color="primary"
        >
          Make Payment
        </IonButton>
        <IonList>
          {payments.map((item: any) => (
            <IonItem>
              <IonLabel>
                <h2>{item.refId}</h2>
                <h3>{item.Amount}</h3>
                <p>{item.fee}</p>
                {item.updatedAt}
              </IonLabel>
            </IonItem>
          ))}

          {loadType == LoadStatus.Empty && (
            <NoResult message="No payments has been made yet." />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PaymentList;
