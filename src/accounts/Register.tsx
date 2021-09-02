import React, { useState, useEffect } from "react";
import {
  IonLoading,
  IonSelect,
  IonSelectOption,
  useIonLoading,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import Config from "../utility/config";
import ApiService from "../services/api";
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
  IonInput,
  IonList,
  IonAvatar,
  IonThumbnail,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";

import axios from "axios";
const endpoint = `${Config.url}`;

const Register: React.FC = (prLoadingPropsops) => {
  const { register, logout } = React.useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [phone, setPhone] = useState(null);
  const [dob, setDob] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [country, setCountry] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMarital, setSelectedMarital] = useState(null);
  const [homeAddress, setHomeAddress] = useState(null);
  const [postalAddress, setPostalAddress] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const genderArray = [
    { key: 1, text: "Male", value: "Male" },
    { key: 2, text: "Female", value: "Female" },
  ];

  const maritalArray = [
    { key: 1, text: "Single", value: "Single" },
    { key: 2, text: "Married", value: "Married" },
  ];

  useEffect(() => {
    ApiService.countries()
      .then((result) => {
        setCountry(result.data.data);
      })
      .catch(function (error) {});
  }, []);
  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };
  const gotoLogin = () => {
    history.replace(`/login`);
  };
  const doRegister = async (e: any) => {
    e.preventDefault();

    setShowLoading(true);
    register({
      email,
      password,
      phone,
      firstname,
      middlename,
      lastname,
      marital: selectedMarital,
      gender: selectedGender,
      dob,
      homeAddress,
      postalAddress,
      contactEmail,
      countryId: selectedCountry,
    })
      .then((result: any) => {
        history.replace(Config.dashRoute());
      })
      .catch((error: any) => {
        setShowLoading(false);
      });
    // if (result) history.replace(`/dashboard`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={doRegister}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                name="email"
                onIonInput={handleOnChange}
                required
                type="email"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                name="password"
                onIonInput={(e: any) => setPassword(e.target.value!)}
                required
                type="password"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Email</IonLabel>
              <IonInput
                name="contactEmail"
                onIonInput={(e: any) => setContactEmail(e.target.value!)}
                required
                type="email"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput
                name="firstname"
                onIonInput={(e: any) => setFirstname(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Middle Name</IonLabel>
              <IonInput
                name="middlename"
                onIonInput={(e: any) => setMiddlename(e.target.value!)}
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput
                name="lastname"
                onIonInput={(e: any) => setLastname(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput
                name="phone"
                onIonInput={(e: any) => setPhone(e.target.value!)}
                required
                type="tel"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Country</IonLabel>
              <IonSelect
                name="selectedCountry"
                value={selectedCountry}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setSelectedCountry(e.detail.value)}
              >
                {country.map((item: any) => (
                  <>
                    <IonSelectOption key={item.id} value={item.id}>
                      {item.name}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Gender</IonLabel>
              <IonSelect
                name="selectedGender"
                value={selectedGender}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setSelectedGender(e.detail.value)}
              >
                {genderArray.map((item: any) => (
                  <>
                    <IonSelectOption key={item.key} value={item.id}>
                      {item.text}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Marital</IonLabel>
              <IonSelect
                name="selectedMarital"
                value={selectedMarital}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) => setSelectedMarital(e.detail.value)}
              >
                {maritalArray.map((item: any) => (
                  <>
                    <IonSelectOption key={item.key} value={item.id}>
                      {item.text}
                    </IonSelectOption>
                  </>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Home Address</IonLabel>
              <IonInput
                name="homeAddress"
                onIonInput={(e: any) => setHomeAddress(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Address</IonLabel>
              <IonInput
                name="postalAddress"
                onIonInput={(e: any) => setPostalAddress(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
          </IonList>
          <br />
          <br />
          <IonButton
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Register
          </IonButton>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
          <p style={{ textAlign: "center" }}>Already have an account?</p>
          <IonButton
            onClick={gotoLogin}
            className="ion-margin"
            type="button"
            color="danger"
            shape="round"
            expand="block"
          >
            Login
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
