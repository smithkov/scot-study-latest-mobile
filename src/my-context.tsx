import React from "react";
import ApiService from "./services/api";

const Context = React.createContext<any>(undefined);
export const AuthProvider: React.FC = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    authenticated: false,
    user: {},
  });

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
        setAuthValues({
          authenticated: true,
          user: {
            email: data.email,
            id: data.id,
            token: token,
            firstname: data.firstname,
          },
        });
        resolve(true);
      } else {
        reject(false);
      }
    });
  };
  const logout = () => {
    setAuthValues({
      authenticated: false,
      user: {},
    });
    return Promise.resolve(true);
  };

  let state = {
    authValues,
    login,
    logout,
    register,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;
