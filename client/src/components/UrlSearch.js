import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { getWithExpiry } from "../hooks/localStorageWithExpiry";

import Input from "./input";
import Button from "./Button";

import "./Navbar.css";

export default function UrlSearch(props) {
  const [getUrl, setGetUrl] = useState({
    url: "",
  });
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  function handleData(e) {
    const { value } = e.target;

    setGetUrl(() => {
      return {
        url: value,
        userId: getWithExpiry("userId"),
      };
    });
  }

  // // This function will handle getting the recipe from a url
  async function handleGetRecipe(e) {
    e.preventDefault();

    props.handleClick();

    try {
      props.loaderCallback(true);
      const response = await axios.post(`/urlSearch`, getUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.success) {
        setError(response.data.data);

        //Reload window if already on private route
        if (location.pathname === "/private") {
          window.location.reload();
        } else {
          navigate("/private");
        }

        setTimeout(() => {
          setError("");
          setGetUrl({ url: "" });
          props.loaderCallback(false);
        }, 5000);
      }
    } catch (error) {
      props.loaderCallback(false);
      navigate("/private");
      setError(error.response.data.error);
      console.log(error.response.data.error);
      setTimeout(() => {
        setError("");
        setGetUrl({ url: "" });
      }, 5000);
    }
  }

  return (
    <div className="p-0 m-0 container">
      <form onSubmit={handleGetRecipe}>
        <Input
          wrapperClassName="d-sm-inline-block"
          name="url"
          type="text"
          className={error ? "error-message url-input" : "url-input"}
          value={error ? error : getUrl.url}
          onChange={(e) => handleData(e)}
          placeholder={error ? error : "Enter a URL to get the recipe"}
        />
        <Button
          buttonWrapper="d-none d-sm-inline-block"
          buttonStyle="btn-nav"
          className="ms-2"
          type="submit"
          buttonText="Get Recipe"
        />
      </form>
    </div>
  );
}
