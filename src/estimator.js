const covid19ImpactEstimator = (data) => {
  const estimator = chain(estimateCurrentlyInfected);
  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

export default covid19ImpactEstimator;
