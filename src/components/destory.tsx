import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import React from "react";
import { delateContact } from "../contacts";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    await delateContact(params);
    console.log(params);
    alert("heej");
    queryClient.invalidateQueries();
    return redirect("/");
  };
