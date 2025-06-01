import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://remote-internship-api-production.up.railway.app/collection/${id}`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <section id="collection-info">
        <div className="row">
          <div className="collection-info__wrapper">
            <p className="collection-info__description">
              <Skeleton height="16px" width="650px" />
              <Skeleton height="16px" width="650px" />
              <Skeleton height="16px" width="400px" />
            </p>
           
            <div className="collection-info__details">
              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton height="16px" width="80px" />
                </span>
              </span>

              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton height="16px" width="80px" />
                </span>
              </span>

              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton height="16px" width="100px" />
                </span>
              </span>

              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton height="16px" width="60px" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">{data.description}</p>
          <div className="collection-info__details">
            <span className="collection-info__detail">
              Items
              <span className="collection-info__detail__data">
                {" "}
                {data.items?.length}
              </span>
            </span>
            ·
            <span className="collection-info__detail">
              Created
              <span className="collection-info__detail__data">
                {" "}
                {data.createdDate}
              </span>
            </span>
            ·
            <span className="collection-info__detail">
              Creator earnings
              <span className="collection-info__detail__data">
                {" "}
                {data.creatorEarnings}%
              </span>
            </span>
            ·
            <span className="collection-info__detail">
              Chain
              <span className="collection-info__detail__data">
                {" "}
                {data.chain}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
