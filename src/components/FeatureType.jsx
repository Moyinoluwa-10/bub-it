const FeatureType = ({ Header, Content, Icon }) => {
  return (
    <div className="featureType">
      {Icon}
      <h5 className="mt-4">{Header}</h5>
      <p className="mt-3 mb-4">{Content}</p>
    </div>
  );
};

export default FeatureType;
