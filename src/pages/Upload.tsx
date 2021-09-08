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
  IonDatetime,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonListHeader,
  IonNote,
  IonIcon,
  IonLoading,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { attachOutline } from "ionicons/icons";
import "./faculty.css";
import { useHistory } from "react-router-dom";

import axios from "axios";
import ApiService from "../services/api";
import AuthContext from "../my-context";
import MyAlert from "../widget/myAlert";

const UploadDoc: React.FC = (props) => {
  const { authValues } = React.useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [documents, setDocuments] = useState([]);
  let [userId, setUserId] = useState(authValues.user.id);

  let [name, setName] = useState("");
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const result = await ApiService.findUserDocuments({ userId });
      setDocuments(result.data.data);
    })();
  });
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const skip = async () => {
    const resultData = await ApiService.findUserDocuments({ userId });
    if (resultData.data.data.length > 0) {
      history.push("/application");
    } else {
      setShowError(true);
      setMessage("Please upload your academic documents");
      return;
    }
  };
  const handleSubmission = async () => {
    if (name == "") {
      setShowError(true);
      setMessage("File name is required.");
      return;
    }
    setShowLoading(true);
    const formData = new FormData();

    formData.append("docs", selectedFile);
    formData.append("userId", userId);
    formData.append("name", name);
    const result = await ApiService.uploadDocument(formData);

    const resultData = await ApiService.findUserDocuments({ userId });
    setDocuments(resultData.data.data);
    setName("");
    setShowLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Upload Documents</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
      <br />
      <br />
      <MyAlert message={message} showAlert={showError} />
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Uploading document..."}
      />
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">Title of document</IonLabel>
          <IonInput
            value={name}
            name="name"
            onIonInput={(e: any) => setName(e.target.value)}
            required
            type="text"
          ></IonInput>
        </IonItem>
        <input
          className="ion-margin"
          type="file"
          name="file"
          onChange={changeHandler}
        />
        <IonList>
          <IonListHeader>My Documents</IonListHeader>
          {documents.map((item: any) => (
            <IonItem>
              <IonLabel>{item.name}</IonLabel>
              <IonNote slot="end" color="primary">
                <IonIcon size="large" icon={attachOutline}></IonIcon>
              </IonNote>
            </IonItem>
          ))}
        </IonList>
        <div>
          <IonButton
            onClick={handleSubmission}
            className="ion-margin"
            type="submit"
            shape="round"
            expand="block"
          >
            Upload
          </IonButton>
          <IonButton
            onClick={skip}
            color="success"
            className="ion-margin"
            type="button"
            shape="round"
            expand="block"
          >
            Proceed to application
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadDoc;
