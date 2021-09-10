import React, { useEffect } from "react";
import ApiService from "./services/api";
import { Storage } from "@capacitor/storage";

const Context = React.createContext<any>(undefined);
const userKey = "user";
export const AuthProvider: React.FC = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    authenticated: false,
    hasLoadedOnce: false,
    user: {},
  });
  useEffect(() => {
    (async () => {
      const { value } = await Storage.get({ key: userKey });
      const user = JSON.parse(value!);
      const loadedOnce = await Storage.get({ key: "loaded" });

      if (user) {
        setAuthValues({
          authenticated: true,
          hasLoadedOnce: JSON.stringify(loadedOnce.value),
          user: {
            email: user?.email,
            id: user?.id,
            //token: token,
            firstname: user?.firstname,
            isUser: user?.Role?.name == "User" ? true : false,
          },
        });
      } else {
        setAuthValues({
          hasLoadedOnce: JSON.stringify(loadedOnce.value),
        });
      }
    })();
  }, []);
  const login = async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }) => {
    const api = await ApiService.login(user, password);
    const { error } = api.data;

    return new Promise((resolve, reject) => {
      if (!error) {
        const { data, token } = api.data;
        (async () => {
          await Storage.set({
            key: userKey,
            value: JSON.stringify(data),
          });
          await Storage.set({
            key: "isAuthenticated",
            value: "true",
          });
        })();

        setAuthValues({
          authenticated: true,
          user: {
            email: data.email,
            id: data.id,
            token: token,
            firstname: data.firstname,
            isUser: data.Role?.name == "User" ? true : false,
          },
        });
        resolve(true);
      } else {
        reject(false);
      }
    });
  };
  const setTourPage = async () => {
    return new Promise((resolve, reject) => {
      (async () => {
        await Storage.set({
          key: "loaded",
          value: "true",
        });
      })();

      setAuthValues({
        hasLoadedOnce: true,
      });
      resolve(true);
    });
  };
  const register = async ({
    email,
    password,
    phone,
    firstname,
    middlename,
    lastname,
    marital,
    gender,
    dob,
    homeAddress,
    postalAddress,
    contactEmail,
    countryId,
  }: {
    email: string;
    password: string;
    phone: string;
    firstname: string;
    middlename: string;
    lastname: string;
    marital: string;
    gender: string;
    dob: string;
    homeAddress: string;
    postalAddress: string;
    contactEmail: string;
    countryId: string;
  }) => {
    const api = await ApiService.register({
      email,
      password,
      phone,
      firstname,
      middlename,
      lastname,
      marital,
      gender,
      dob,
      homeAddress,
      postalAddress,
      contactEmail,
      countryId,
    });
    const { error } = api.data;

    return new Promise((resolve, reject) => {
      if (!error) {
        const { data, token } = api.data;
        (async () => {
          await Storage.set({
            key: userKey,
            value: JSON.stringify(data),
          });
          await Storage.set({
            key: "isAuthenticated",
            value: "true",
          });
        })();

        setAuthValues({
          authenticated: true,
          user: {
            email: data.email,
            id: data.id,
            token: token,
            firstname: data.firstname,
            isUser: true,
          },
        });
        resolve(true);
      } else {
        reject(false);
      }
    });
  };
  const logout = async (e: any) => {
    await Storage.set({
      key: "isAuthenticated",
      value: "false",
    });
    await Storage.remove({ key: userKey });

    setAuthValues({
      authenticated: false,
      user: {},
    });

    //return Promise.resolve(true);
  };

  let state = {
    authValues,
    login,
    logout,
    register,
    setTourPage,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;
