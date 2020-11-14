import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { Field, Form as FormikForm, Formik } from "formik";

import Layout from "../components/layout";
import { useUser } from "../lib/hooks";

const Signup = () => {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) Router.replace("/");
  }, [user]);

  const handleSubmit = async (values) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      // writing our user object to the state
      mutate(userObj);
    } else {
      // setErrorMsg(await res.text());
      setErrorMsg("Error Submitting Form");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-5">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            return (
              <FormikForm>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-64 mb-2 bg-blue-100 block"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-64 mb-2 bg-blue-100 block"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-64 mb-2 bg-blue-100 block"
                />
                {errorMsg && <p className="text-red-600">{errorMsg}</p>}
                <div>
                  <button type="submit">Submit</button>
                </div>
                <div>
                  <Link href="/signin">
                    <a>Go to Sign In</a>
                  </Link>
                </div>
              </FormikForm>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default Signup;
