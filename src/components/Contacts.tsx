import React from "react";
import Logo from "../logo192.png";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { getContactUser } from "../contacts";
import Image from "next/image";

const getData = (params: any) => ({
  queryKey: ["list", params],
  queryFn: () => getContactUser(params),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    if (!queryClient.getQueryData(getData(params).queryKey)) {
      await queryClient.fetchQuery(getData(params));
    }
    return { params };
  };
export const action = (queryClient: QueryClient) => () => {
  queryClient.invalidateQueries(["list"]);
  console.log("actriion Contact");
};
const Contacts = () => {
  const { params } = useLoaderData() as any;
  const { data, isLoading } = useQuery(getData(params));
  console.log(params.contactId);
  if (isLoading) {
    return <div>isLoading</div>;
  }

  return (
    <div className="w-full  sm:h-1/2 bg-slate-400  sm:flex content-center rounded-lg ">
      <div className=" sm:w-5/6 flex justify-center  border-slate-900 rounded-lg dark:border-gray-100 ">
        <img src={Logo} alt="" className="  w-1/3 sm:w-2/3  h-4/5 " />
      </div>
      <div className="px-3">
        {data?.map((e) => {
          return (
            <div key={e.id}>
              <h1 className="text-left">{e?.name}</h1>
              <h2 className="text-left">{e?.phoneNumber}</h2>
            </div>
          );
        })}
        <div className="flex">
          <Form action="edit">
            <button
              type="submit"
              className="w-12 h-5 bg-white rounded-md my-1 mr-2  text-xs "
            >
              Edit
            </button>
          </Form>
          <Form method="post" action="destory">
            <button
              type="submit"
              className="w-12 h-5 bg-white rounded-md my-1  text-xs  "
            >
              Delate
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
