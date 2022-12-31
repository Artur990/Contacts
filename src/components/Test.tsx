import React from "react";
import { Form, useSubmit } from "react-router-dom";

const Test = () => {
  let submit = useSubmit();
  console.log(submit);
  return (
    <>
      <Form
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <input type="text" name="q" id="q" />
        <button type="submit"></button>
        {/* <button onClick={}></button> */}
      </Form>
      <button></button>
    </>
  );
};

export default Test;
