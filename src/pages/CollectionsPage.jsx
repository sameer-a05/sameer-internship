import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function CollectionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-internship-api-production.up.railway.app/collections"
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const moreNfts = ()=>(
    setVisibleCount((prev)=> prev + 6)
  )

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => (
                <div className="collection-column">
                  <figure className="collection__img">
                    <Skeleton height="220px" width="100%" />
                  </figure>
                  <div className="collection__info">
                    <h3 className="collection__name">
                      <Skeleton height="20" width="80px" />
                    </h3>
                    <div className="collection__stats">
                      <div className="collection__stat">
                        <span className="collection__stat__label">
                          <Skeleton height="20px" width="60px" />
                        </span>
                        <span className="collection__stat__data">
                          <Skeleton height="20px" width="60px" />
                        </span>
                      </div>
                      <div className="collection__stat">
                        <span className="collection__stat__label">
                          <Skeleton height="20px" width="60px" />
                        </span>
                        <span className="collection__stat__data">
                          <Skeleton height="20px" width="60px" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : data.slice(0, visibleCount).map((nft, index) => (
                <div className="collection-column">
                  <Link
                    to={`/collection/${nft.creatorId}`}
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
                          <span className="collection__stat__label">Floor</span>
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
                </div>
              ))}
        </div>
        { visibleCount < data.length && (
          <button className="collections-page__button"  onClick={moreNfts}>Load more</button>
        )}
      </div>
    </div>
  );
}
