import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [timeleft, setTimeLeft] = useState("");
  const [collectionId, setCollectionId] = useState(null)

  useEffect(() => {
    if (!data.expiryDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = data.expiryDate - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [data.expiryDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://remote-internship-api-production.up.railway.app/item/${id}`
        );
        setData(response.data.data);
        setTimeout(() => {
          setLoading(false)
        }, 100);
        setCollectionId(response.data.data.collectionId)
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(loading){
    return(
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <div className="item-page__img__icon">
                    <Skeleton height="14px" width="50px"/>
                  </div>
                <div className="item-page__img__likes">
                  <Skeleton height="14px" width="50px"/>
                  <span className="item-page__img__likes__text">
                    <Skeleton height="14px" width="50px"/>
                  </span>
                </div>
                </div>
                <figure className="item-page__img">
                  <Skeleton height="100%" width="100%"/>
                </figure>
              </figure>
            </div>
            <div className="item-page__right">
              <div className="item-page__collection">
                <Skeleton height="14px" width="90px"/>
              </div>
              <div className="item-page__name">
                <Skeleton height="30px" width="90px"/>
              </div>
              <div className="item-page__owner">
                <Skeleton height="14px" width="250px"/>
              </div>
              <div className="item-page__details">
                <div className="item-page__detail">
                  <span className="item-page__detail__text">
                    <Skeleton height="14px" width="90px"/>
                  </span>
                </div>
                <div className="item-page__detail">
                  <span className="item-page__detail__text">
                    <Skeleton height="14px" width="90px"/>
                  </span>
                </div>
                <div className="item-page__detail">
                  <span className="item-page__detail__text">
                    <Skeleton height="14px" width="90px"/>
                  </span>
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  <Skeleton height="14px" width="250px"/>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">
                    <Skeleton height="14px" width="70px"/>
                  </span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">
                      <Skeleton height="14px" width="150px"/>
                    </span>
                    <span className="item-page__sale__price__dollars">
                      <Skeleton height="14px" width="150px"/>
                    </span>
                  </div>
                  <div className="item-page__sale__buttons">
                    <Skeleton height="34px" width="750px"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
    
  

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  <div className="item-page__img__likes">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="item-page__img__icon"
                    />
                    <span className="item-page__img__likes__text">
                      {data.favorites}
                    </span>
                  </div>
                </div>
                <img src={data.imageLink} alt="" className="item-page__img" />
              </figure>
            </div>
            <div className="item-page__right">
              <Link
                to={`/collection/${data.collectionId}`}
                className="item-page__collection light-blue"
              >
                {data.collection}
              </Link>
              <h1 className="item-page__name">{data.title}</h1>
              <span className="item-page__owner">
                Owned by{" "}
                <Link
                  to={`/user/${data.ownerId}`}
                  className="light-blue item-page__owner__link"
                >
                  {data.owner}
                </Link>
              </span>
              <div className="item-page__details">
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">
                    {data.views} views
                  </span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">
                    {data.favorites} favorites
                  </span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faShapes}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">
                    {data.category}
                  </span>
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  <div className="green-pulse"></div>
                  <span>Sale ends in {timeleft}</span>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">
                      {data.ethPrice} ETH
                    </span>
                    <span className="item-page__sale__price__dollars">
                      {data.usdPrice}
                    </span>
                  </div>
                  <div className="item-page__sale__buttons">
                    <div className="item-page__sale__buy">
                      <button className="item-page__sale__buy__button disabled">
                        Buy now
                      </button>
                      <button className="item-page__sale__buy__icon disabled">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </button>
                    </div>
                    <button className="item-page__sale__offer disabled">
                      <FontAwesomeIcon icon={faTag} />
                      Make offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendedItems collectionId={collectionId} currentItemId={id} />
    </>
  );
}