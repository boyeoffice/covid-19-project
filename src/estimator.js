const estimateCurrentlyInfected = ({ data, impact, severeImpact }) => {
  impact.currentlyInfected = Math.trunc(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(data.reportedCases * 50);
  return { impact, severeImpact };
};

const estimateProjectedInfections = ({ data, impact, severeImpact }) => {
  const periodEstimator = (period, time) => {
    switch (period) {
      case 'months':
        return time * 30;
      case 'weeks':
        return time * 7;
      default:
        return time;
    }
  };
  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected
    * (2 ** (Math.trunc(periodEstimator(data.periodType, data.timeToElapse) / 3))));
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected
  * (2 ** (Math.trunc(periodEstimator(data.periodType, data.timeToElapse) / 3))));
  return { impact, severeImpact };
};

const covid19ImpactEstimator = (data) => {
  const estimator = ({ impact, severeImpact }) => {
    estimateCurrentlyInfected({ data, impact, severeImpact });
    estimateProjectedInfections({ data, impact, severeImpact });
    return { data, impact, severeImpact };
  };
  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

export default covid19ImpactEstimator;
