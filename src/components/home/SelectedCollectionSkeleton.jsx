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
</div>;
