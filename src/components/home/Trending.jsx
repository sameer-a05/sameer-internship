import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function Trending() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/trendingNFTs"
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading
                  ? new Array(5).fill(0).map((_, index) => (
                      <div className="trending-collection" key={index}>
                        <div className="trending-collection__rank">
                          {index + 1}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton width="100%" height="100%" />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton width="100px" height="16px" />
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <Skeleton width="60px" height="16px" />
                        </div>
                        <div className="trending-collection__volume">
                          <Skeleton width="80px" height="16px" />
                        </div>
                      </div>
                    ))
                  : data.slice(0, 5).map((nft, index) => (
                      <Link
                        to={`/collection/${nft.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {nft.rank}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={nft.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {nft.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                            alt=""
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Number(nft.floor).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {nft.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {!loading
                  ? data.slice(5, 10).map((nft, index) => (
                      <Link
                        to={`/collection/${nft.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {nft.rank}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            {loading ? (
                              <Skeleton width="100%" height="100%" />
                            ) : (
                              <img
                                src={nft.imageLink}
                                alt=""
                                className="trending-collection__img"
                              />
                            )}
                          </figure>
                          <div className="trending-collection__name">
                            {!loading ? (
                              nft.title
                            ) : (
                              <Skeleton width="100%" height="100%" />
                            )}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {!loading ? (
                              Number(nft.floor).toFixed(2)
                            ) : (
                              <Skeleton width="100%" height="100%" />
                            )}
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {!loading ? (
                              nft.totalVolume
                            ) : (
                              <Skeleton width="100%" height="100%" />
                            )}{" "}
                            ETH
                          </span>
                        </div>
                      </Link>
                    ))
                  : new Array(5).fill(0).map((_, index) => (
                      <div className="trending-collection" key={index}>
                        <div className="trending-collection__rank">
                          {index + 1}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton width="100%" height="100%" />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton width="100px" height="16px" />
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <Skeleton width="60px" height="16px" />
                        </div>
                        <div className="trending-collection__volume">
                          <Skeleton width="80px" height="16px" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
