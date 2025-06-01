import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${id}`
        );
        setData(response.data.data.items);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  const moreNfts = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOption === "high") return b.price - a.price;
    if (sortOption === "low") return a.price - b.price;
    return 0;
  });

  if (loading) {
    return (
      <section id="collection-items">
        <div className="row collection-items__row">
          <div className="collection-items__header">
            <div className="collection-items__header__left">
              <span className="collection-items__header__live">
                <Skeleton height="14px" width="50px" />
              </span>
              <span className="collection-items__header__results">
                <Skeleton height="14px" width="50px" />
              </span>
            </div>
            <div className="collection-items__header__sort">
              <Skeleton height="60px" width="600px" />
            </div>
          </div>
          <div className="collection-items__body">
            {new Array(12).fill(0).map((_, index) => (
              <div className="item-column" key={index}>
                <figure className="item__img__wrapper">
                  <Skeleton height="340px" width="600px" />
                </figure>
                <div className="item__details">
                  <span className="item__details__name">
                    <Skeleton height="14px" width="100px" />
                  </span>
                  <span className="item__details__price">
                    <Skeleton height="14px" width="50px" />
                  </span>
                  <span className="item__details__last-sale">
                    <Skeleton height="14px" width="120px" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {data.length} results
            </span>
          </div>

          <select
            className="collection-items__header__sort"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="" default>
              Default
            </option>
            <option value="high">Price high to low</option>
            <option value="low">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {sortedData.slice(0, visibleCount).map((item, index) => (
            <div className="item-column">
              <Link to={`/item/${item.itemId}`} key={index} className="item">
                <figure className="item__img__wrapper">
                  <img src={item.imageLink} alt="" className="item__img" />
                </figure>
                <div className="item__details">
                  <span className="item__details__name">{item.title}</span>
                  <span className="item__details__price">{item.price} ETH</span>
                  <span className="item__details__last-sale">
                    Last sale: {item.lastSale} ETH
                  </span>
                </div>
                <div className="item__see-more">
                  <button className="item__see-more__button">See More</button>
                  <div className="item__see-more__icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {visibleCount < data.length && (
        <button className="collection-page__button" onClick={moreNfts}>
          Load more
        </button>
      )}
    </section>
  );
}
