import { QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { TypeObj, getContactUser, upDate } from "../contacts";
import { watch } from "fs";
const getData = (params: any) => ({
  queryKey: ["list", params],
  queryFn: () => getContactUser(params),
});
type Inputs = {
  name: string;
  lastName: string;
  twitter: string;
  ava_url: string;
  note: string;
  phoneNumber: string;
};
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    if (!queryClient.getQueriesData(getData(params).queryKey)) {
      await queryClient.fetchQuery(getData(params));
    }
    return { params };
  };
export const action =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    console.log("action console");
    queryClient.refetchQueries({ queryKey: ["contacts"] });
    queryClient.invalidateQueries({ queryKey: ["contacts", "list"] });
  };
const Edit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    lastName,
    ava_url,
    note,
    twitter,
    phoneNumber,
  }) => {
    const obj: any = {
      id: +params.contactId,
      name,
      lastName,
      twitter,
      phoneNumber,
      ava_url,
      note,
      isFav: false,
    };
    await upDate(obj);
    navigate(-1);
    // console.log(obj);
  };

  const navigate = useNavigate();
  const { params } = useLoaderData() as any;
  const { data } = useQuery<TypeObj[]>(getData(params));
  return (
    <div className="w-full  bg-slate-400 rounded-lg">
      {data?.map((e) => {
        return (
          <Form about="put" key={e.id} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex m-1">
              <h3 className="w-1/3 text-left text-xs mr-1">Name:</h3>
              <input
                className="w-1/3 h-4 mr-0.5 p-1 text-xs rounded-md"
                placeholder={e.name}
                {...register("name")}
              />
              <button type="submit">Wyślij</button>
              <input
                className="w-1/3 h-4 ml-0.5  p-1 text-xs rounded-md"
                placeholder={e?.lastName}
                {...register("lastName")}
              />
            </div>
            <div className="flex justify-between m-1">
              <h3 className="w-1/3 text-left text-xs mr-1">Twitter:</h3>
              <input
                className="w-3/4 h-4 ml-0.5  p-1 text-xs rounded-md"
                placeholder={e?.twitter}
                {...register("twitter")}
              />
            </div>
            <div className="flex justify-between m-1">
              <h3 className="w-1/3 text-left text-xs mr-1">phoneNumber:</h3>
              <input
                className="w-3/4 h-4 ml-0.5  p-1 text-xs rounded-md"
                placeholder={e?.phoneNumber}
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex justify-between m-1">
              <h3 className="w-1/3 text-left text-xs mr-1">Ava_url:</h3>
              <input
                className="w-3/4  h-4 ml-0.5  p-1 text-xs rounded-md"
                placeholder={e?.ava_url}
                {...register("ava_url")}
              />
            </div>
            <div className="flex justify-between m-1">
              <h3 className="w-1/3 text-left text-xs mr-1">Notes:</h3>
              <input
                className="w-3/4  h-7 ml-0.5  p-1 text-xs rounded-md"
                placeholder={e.note}
                {...register("note")}
              />
            </div>

            <div className="flex m-1">
              <button
                type="submit"
                className="w-10 h-4 sm:w-12 sm:h-5 bg-white rounded-md my-1 mr-2  text-xs "
              >
                Edit
              </button>

              <button
                className="w-10 h-4 sm:w-12 sm:h-5 bg-white rounded-md my-1  text-xs  "
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        );
      })}
    </div>
  );
};

export default Edit;
