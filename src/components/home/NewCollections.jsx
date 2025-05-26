import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Skeleton from "../ui/Skeleton";

export default function NewCollections() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/newCollections"
        );
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error occured in fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={6}
              loop={true}
            >
              {loading
                ? new Array(9).fill(0).map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                      <div className="collection">
                        <figure className="collection__img">
                          <Skeleton width="100%" height="150px" />
                        </figure>
                        <div className="collection__info">
                          <h3 className="collection__name">
                            <Skeleton width="100px" height="16px" />
                          </h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton width="60px" height="14px" />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton width="80px" height="14px" />
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                <Skeleton width="60px" height="14px" />
                              </span>
                              <span className="collection__stat__data">
                                <Skeleton width="80px" height="14px" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                : data.map((nft, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/collection/${nft.collectionId}`}
                        key={index}
                        className="collection"
                      >
                        <img
                          src={nft.imageLink}
                          alt=""
                          className="collection__img"
                        />
                        <div className="collection__info">
                          <h3 className="collection__name">{nft.title}</h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Floor
                              </span>
                              <span className="collection__stat__data">
                                {Number(nft.floor).toFixed(2)} ETH
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Total Volume
                              </span>
                              <span className="collection__stat__data">
                                {nft.totalVolume} ETH
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
