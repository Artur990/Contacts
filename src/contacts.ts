import localforage from "localforage";
import { matchSorter } from "match-sorter";
// import sortBy from "sort-by";
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
      // set(initialState)
    }
    const zmiena: TypeObj[] = [];
    for (const key in data) {
      zmiena.push({ id: key, ...data[key] });
    }
    return zmiena.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } catch (error) {}
};

export const getListContacts = async (search: any) => {
  let state = (await getContacts()) as any[];
  // if (search) {
  // return (state = state.filter((e) => e.name.toLowerCase().includes(search)));
  // }
  if (search) {
    state = matchSorter(state, search, { keys: ["name", "lastName"] });
  }

  return state;
};
export const createContact = async () => {
  let state = (await getContacts()) as any[];
  // let state = localforage.getItem("contacts") as any;
  const obj = {
    id: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    name: "No name",
    photoNumber: "noContact",
    note: "noNote",
  };
  state.push(obj);
  await localforage.setItem("contacts", state);
  return state;
};
export const getContactUser = async (id: any) => {
  let state = (await getContacts()) as any[];
  return (state = state.filter((e) => e.id === +id.contactId));
};

export const delateContact = async (id: any) => {
  let state = (await getContacts()) as any[];

  state = state.filter((e) => e.id !== +id.contactId);
  return await localforage.setItem("contacts", state);
};

export const upDate = async (obj: TypeObj) => {
  let state = (await getContacts()) as TypeObj[];

  state = state.map((e) => {
    if (e.id === +obj.id) {
      e = obj;
    }
    return e;
  });

  await localforage.setItem("contacts", state);
  return state;
};
