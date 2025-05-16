import React, { useEffect, useState } from "react";
import SelectedItemVideo from "../../assets/selected-collection.mp4";
import SelectedItemThumbnail from "../../assets/selected-collection-thumbnail.jpg";
import SelectedItemLogo from "../../assets/selected-collection-logo.avif";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SelectedCollection() {
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/selectedCollection"
        );
        setData(response.data);
        setLoading(false)
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={SelectedItemThumbnail}
          src={SelectedItemVideo}
          className="selected-collection__bg"
        />

        {!loading ? (
          <div className="selected-collection__description">
            <img
              src={data?.data?.logo}
              alt=""
              className="selected-collection__logo"
            />
            <h1 className="selected-collection__title">{data?.data?.title}</h1>
            <Link
              to={`/user/${data?.data?.creatorId}`}
              className="selected-collection__author"
            >
              By {data?.data?.creator}
              <img
                src={VerifiedIcon}
                className="selected-collection__author__verified"
              />
            </Link>
            <div className="selected-collection__details">
              {data?.data?.amountOfItems} items · {data?.data?.floorPrice} ETH
            </div>
            <Link
              to={`/collection/${data?.data?.collectionId}`}
              className="selected-collection__button"
            >
              <div className="green-pulse"></div>
              View Collection
            </Link>
          </div>
        ) : (
          <div className="selected-collection__description-skeleton"></div>
        )}
      </div>
      ;
    </header>
  );
}
