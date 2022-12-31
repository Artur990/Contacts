import localforage from "localforage";
import { useCallback } from "react";

export const initialState = [
  {
    id: 1,
    name: "Marek",
    lastName: "Gaca",
    twitter: "",
    ava_url: "gaca.pl ",
    phoneNumber: 1222,
    note: "I like programing everyDay",
    isFav: false,
  },
  {
    id: 2,
    name: "Filip",
    lastName: "",
    twitter: "",
    ava_url: "",
    phoneNumber: 2223,
    note: "I like programing everyDay",
    isFav: false,
  },
  {
    id: 3,
    name: "Zenon",
    lastName: "",
    twitter: "",
    ava_url: "",
    phoneNumber: 1222,
    note: "I like programing everyDay",
    isFav: false,
  },
  {
    id: 4,
    name: "Wiktor",
    lastName: "",
    twitter: "",
    ava_url: "",
    phoneNumber: 1222,
    note: "I like programing everyDay",
    isFav: false,
  },
];
export type TypeObj = {
  id: number;
  name: string;
  lastName: string;
  twitter: string;
  ava_url: string;
  phoneNumber: string;
  note: string;
  isFav: boolean;
};
export const getContacts = async () => {
  try {
    const data = (await localforage.getItem("contacts")) as any;
    if (!data) {
      localforage.setItem("contacts", initialState);
    }
    const zmiena: TypeObj[] = [];
    for (const key in data) {
      zmiena.push({ id: key, ...data[key] });
    }
    return zmiena;
  } catch (error) {}
};

export const getListContacts = async (search: any) => {
  let state = (await getContacts()) as any[];
  // console.log(state);
  if (search) {
    return (state = state.filter((e) => e.name.toLowerCase().includes(search)));
  }
  return state;
};
export const createContact = async () => {
  let state = (await getContacts()) as any[];
  const obj = {
    id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    name: "No name",
    photoNumber: "noContact",
    note: "noNote",
  };
  state.push(obj);
  return await localforage.setItem("contacts", state);
};
export const getContactUser = async (id: any) => {
  // console.log(id.contactId);
  let state = (await getContacts()) as any[];
  return (state = state.filter((e) => e.id === +id.contactId));
};

export const delateContact = async (id: any) => {
  // console.log(id);
  let state = (await getContacts()) as any[];
  // console.log(state);
  state = state.filter((e) => e.id !== +id.contactId);
  return await localforage.setItem("contacts", state);
};

export const upDate = async (obj: TypeObj) => {
  let state = (await getContacts()) as TypeObj[];
  console.log(obj.id);

  state = state.map((e) => {
    if (e.id === +obj.id) {
      e = obj;
    }
    return e;
  });
  console.log(state);
  return await localforage.setItem("contacts", state);
  // (e.id === obj.id ? console.log(e) : e)));
};
