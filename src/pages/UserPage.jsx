import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://remote-internship-api-production.up.railway.app/user/${id}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const moreNFTs = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const sortedData = [...(data.items || [])].sort((a, b) => {
    if (sortOption === "high") return b.price - a.price;
    if (sortOption === "low") return a.price - b.price;
    return 0;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <>
        <header id="user-header">
          <Skeleton height="300px" width="100%" />
        </header>

        <section id="user-info">
          <div className="row">
            <div className="user-info__wrapper">
              <figure className="user-info__img__wrapper">
                <Skeleton height="100%" width="100%" borderRadius="50%" />
              </figure>
              <h1 className="user-info__name">
                <Skeleton height="24px" width="180px" />
              </h1>
              <div className="user-info__details">
                <span className="user-info__wallet__data">
                  <Skeleton height="14px" width="220px" />
                </span>
                <span className="user-info__year">
                  <Skeleton height="18px" width="100px" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="user-items">
          <div className="row user-items__row">
            <div className="user-items__header">
              <div className="user-items__header__left">
                <span className="user-items__header__text">
                  <Skeleton height="20px" width="120px" />
                </span>
              </div>
            </div>
            <div className="user-items__body">
              {new Array(12).fill(0).map((_, index) => (
                <div className="item-column" key={index}>
                  <figure className="item__img__wrapper">
                    <div className="item__img">
                      <Skeleton height="200px" width="100%" />
                    </div>
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton height="18px" width="80%" />
                    </span>
                    <span className="item__details__price">
                      <Skeleton height="18px" width="60%" />
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton height="14px" width="55px" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <header
        style={{
          backgroundImage: `url('${data.imageLink}')`,
        }}
        id="user-header"
      ></header>
      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              <img
                src={data.profilePicture}
                alt=""
                className="user-info__img"
              />
            </figure>
            <h1 className="user-info__name">{data.name}</h1>
            <div className="user-info__details">
              <span className="user-info__wallet">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="user-info__wallet__icon"
                />
                <span className="user-info__wallet__data">
                  {data.walletCode}
                </span>
              </span>
              <span className="user-info__year">
                <span className="user-info__year__data">
                  Joined {data.creationDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">
                {data.items?.length} items
              </span>
            </div>
            <select
              className="user-items__header__sort"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Default</option>
              <option value="high">Price high to low</option>
              <option value="low">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {sortedData.slice(0, visibleCount).map((nft, index) => (
              <div className="item-column" key={index}>
                <Link to={`/item/${nft.itemId}`} className="item">
                  <figure className="item__img__wrapper">
                    <img src={nft.imageLink} alt="" className="item__img" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">{nft.title}</span>
                    <span className="item__details__price">
                      {nft.price} ETH
                    </span>
                    <span className="item__details__last-sale">
                      Last sale: {nft.lastSale} ETH
                    </span>
                  </div>
                  <a className="item__see-more" href="#">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {visibleCount < data.items?.length && (
          <button className="collection-page__button" onClick={moreNFTs}>
            Load more
          </button>
        )}
      </section>
    </>
  );
}
