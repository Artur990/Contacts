import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { delateContact } from "../contacts";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    await delateContact(params);
    console.log("destory");
    alert("Kontakt został usunięty");
    queryClient.invalidateQueries();
    return redirect("/");
  };
