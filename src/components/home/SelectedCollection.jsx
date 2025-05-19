import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "../ui/Skeleton.css";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/selectedCollection"
        );
        setData(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      {loading ? (
        <div className="selected-collection">
          <Skeleton  width="100%" height="100%" />
        </div>
      ) : (
        <div className="selected-collection">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={data?.thumbnail}
            src={data?.videoLink}
            className="selected-collection__bg"
          />
          <div className="selected-collection__description">
            <img
              src={data?.logo}
              alt=""
              className="selected-collection__logo"
            />
            <h1 className="selected-collection__title">{data?.title}</h1>
            <Link
              to={`/user/${data?.creatorId}`}
              className="selected-collection__author"
            >
              By {data?.creator}
              <img
                src={VerifiedIcon}
                className="selected-collection__author__verified"
              />
            </Link>
            <div className="selected-collection__details">
              {data?.amountOfItems} items · {data?.floorPrice} ETH
            </div>
            <Link
              to={`/collection/${data?.collectionId}`}
              className="selected-collection__button"
            >
              <div className="green-pulse"></div>
              View Collection
            </Link>
          </div>
        </div>
      )}
      ;
    </header>
  );
}
