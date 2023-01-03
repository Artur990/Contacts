import React, { useState, useRef, FormEventHandler, useEffect } from "react";
import Logo from "./logo192.png";
import {
  initialState,
  getListContacts,
  getContacts,
  createContact,
} from "./contacts";
import { BiSearchAlt2 } from "react-icons/bi";
import "./App.css";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import "./components/Loaderr.css";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useDebounce } from "rooks";

const getContactsLists = (props: any) => ({
  queryKey: ["contacts", props],
  queryFn: () => getListContacts(props),
});

export const Loader =
  (queryClient: QueryClient) =>
  async ({ request }: any) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    if (!queryClient.getQueryData(getContactsLists(q).queryKey)) {
      await queryClient.fetchQuery(getContactsLists(q));
    }
    return { q };
  };
export const action = (queryClient: QueryClient) => async () => {
  const contact = "a";
  console.log("action");
  await createContact();
  await queryClient.refetchQueries({ queryKey: ["contacts"] });
  queryClient.invalidateQueries({ queryKey: ["contacts", "list"] });
  return contact;
};
function Root() {
  const { q } = useLoaderData() as any;
  const { data } = useQuery(getContactsLists(q));

  const submit = useSubmit();
  const debouncedSubmit = useDebounce(submit, 500);
  return (
    <div className="App">
      <h1 className="text-xl font-bold ">Contacts</h1>
      <main>
        <section className="flex justify-center rounded-lg ">
          <div className="w-4/5 rounded-xl sm:w-1/2 h-72  flex ">
            <div className="w-3/5 sm:w-2/5 bg-slate-700 rounded-lg ">
              <div className="flex">
                <form role="search" className="flex  w-3/4 ">
                  <div className="flex h-4 sm:h-6 w-full bg-white rounded-lg m-1">
                    <button className="border-r-gray-800 h-4 sm:h-6">
                      <BiSearchAlt2 className="bg-white hidden sm:block w-5  h-4 sm:h-6 rounded-lg" />
                    </button>
                    <input
                      type="text"
                      name="q"
                      aria-label="Search contacts"
                      id="q"
                      className="w-full focus:outline-none rounded-lg text-xs sm:text-base"
                      onChange={(event) => {
                        debouncedSubmit(event.currentTarget.form);
                      }}
                      // value={search}
                    />
                  </div>
                </form>
                <Form method="post" className=" w-1/3  sm:m-1">
                  <button
                    className="w-10 sm:w-12 h-4 sm:h-6 text-xs sm:p-1 bg-slate-300 text-blue-600 font-medium rounded-md hover:bg-slate-400"
                    type="submit"
                  >
                    New
                  </button>
                </Form>
              </div>
              {data ? (
                <ul className="p-2">
                  {data.map((e) => {
                    return (
                      <li
                        className="text-left focus:bg-fuchsia-200 hover:bg-slate-400 hover:rounded-lg hover:p-0.5"
                        key={e.id}
                      >
                        <NavLink
                          // className="active:bg-blue-600"
                          to={`contacts/${e.id}`}
                        >
                          {" "}
                          {e.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h2 className="text-left focus:bg-fuchsia-200">No contacts</h2>
              )}
            </div>
            <div className="w-3/5 bg-slate-400 rounded-xl">
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Root;
