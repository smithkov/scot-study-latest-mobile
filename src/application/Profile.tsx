import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
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

const Profile: React.FC = (prLoadingPropsops) => {
  const { register, logout } = React.useContext(AuthContext);
  const history = useHistory();
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
  let [userId, setUserId] = useState("e2352890-171d-4d14-95f9-80879b3c8f99");

  const genderArray = [
    { key: 1, text: "Male", value: "Male" },
    { key: 2, text: "Female", value: "Female" },
  ];

  const maritalArray = [
    { key: 1, text: "Single", value: "Single" },
    { key: 2, text: "Married", value: "Married" },
  ];

  useEffect(() => {
    ApiService.findUserById({ userId })
      .then((result) => {
        const userData = result.data.data;
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
        setMiddlename(userData.middlename);
        setDob(userData.dob);
        setUserId(userData.id);
        setSelectedGender(userData.gender);
        setSelectedMarital(userData.marital);
        setHomeAddress(userData.homeAddress);
        setPostalAddress(userData.postalAddress);
        setContactEmail(userData.contactEmail);
        setPhone(userData.phone);
        setSelectedCountry(userData.Country ? userData.Country.id : "");
      })
      .catch(function (error) {});
  }, []);
  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleSave = async (e: any) => {
    e.preventDefault();

    setShowLoading(true);
    const saveResult = await ApiService.updateUserInfo(
      {
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
      },
      userId
    )
      .then((result: any) => {
        history.replace(`/dashboard`);
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
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={handleSave}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Contact Email</IonLabel>
              <IonInput
                name="contactEmail"
                value={contactEmail}
                onIonInput={(e: any) => setContactEmail(e.target.value!)}
                required
                type="email"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput
                value={firstname}
                name="firstname"
                onIonInput={(e: any) => setFirstname(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Middle Name</IonLabel>
              <IonInput
                value={middlename}
                name="middlename"
                onIonInput={(e: any) => setMiddlename(e.target.value!)}
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput
                name="lastname"
                value={lastname}
                onIonInput={(e: any) => setLastname(e.target.value!)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput
                value={phone}
                name="phone"
                onIonInput={(e: any) => setPhone(e.target.value!)}
                required
                type="text"
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
                value={homeAddress}
                onIonInput={(e: any) => setHomeAddress(e.target.value)}
                required
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Address</IonLabel>
              <IonInput
                value={postalAddress}
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
            Save
          </IonButton>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
