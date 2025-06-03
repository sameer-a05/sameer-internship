import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RecommendedItems({ collectionId, currentItemId }) {
  if (!collectionId) {
    return (
      <div style={{ padding: "2rem 0" }}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          loop={true}
          slidesPerView={6}
        >
          {new Array(6).fill(0).map((_, index) => (
            <SwiperSlide key={`placeholder-${index}`}>
              <div className="item-column">
                <div className="item">
                  <figure
                    className="item__img__wrapper"
                    style={{ minHeight: "200px" }}
                  >
                    <Skeleton width="100%" height="200px" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton height="14px" width="80px" />
                    </span>
                    <span className="item__details__price">
                      <Skeleton height="14px" width="80px" />
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton height="14px" width="80px" />
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
        );
        setData(response.data.data.items);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [collectionId]);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <div className="recommended-items__body">
              {loading ? (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  loop={true}
                  slidesPerView={6}
                >
                  {new Array(7).fill(0).map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                      <div className="carousel-item-column">
                        <div className="item">
                          <figure
                            className="item__img__wrapper"
                            style={{ minHeight: "200px" }}
                          >
                            <Skeleton width="100%" height="200px" />
                          </figure>
                          <div className="item__details">
                            <span className="item__details__name">
                              <Skeleton height="14px" width="80px" />
                            </span>
                            <span className="item__details__price">
                              <Skeleton height="14px" width="80px" />
                            </span>
                            <span className="item__details__last-sale">
                              <Skeleton height="14px" width="80px" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  loop={true}
                  slidesPerView={6}
                >
                  {data
                    .filter((nft) => nft.itemId !== currentItemId)
                    .slice(0, 12)
                    .map((nft, index) => (
                      <SwiperSlide key={nft.itemId || index}>
                        <div className="carousel-item-column">
                          <Link to={`/item/${nft.itemId}`} className="item">
                            <figure className="item__img__wrapper">
                              <img
                                src={nft.imageLink}
                                alt=""
                                className="item__img"
                              />
                            </figure>
                            <div className="item__details">
                              <span className="item__details__name">
                                {nft.title}
                              </span>
                              <span className="item__details__price">
                                {nft.price} ETH
                              </span>
                              <span className="item__details__last-sale">
                                Last sale: {nft.lastSale} ETH
                              </span>
                            </div>
                            <div className="item__see-more">
                              <button className="item__see-more__button">
                                See More
                              </button>
                              <div className="item__see-more__icon">
                                <FontAwesomeIcon icon={faShoppingBag} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/${collectionId}`}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
