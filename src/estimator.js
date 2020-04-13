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

const estimateSevereCases = ({ impact, severeImpact }) => {
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact
    .infectionsByRequestedTime * 0.15);
  return { impact, severeImpact };
};
const estimateBedSpaceAvailability = (data, impact, severeImpact) => {
  const time = () => {
    switch (data.periodType) {
      case 'months':
        return data.timeToElapse * 30;
      case 'weeks':
        return data.timeToElapse * 7;
      default:
        return data.timeToElapse;
    }
  };
  const reported = data.reportedCases * 10;
  const factor = 2 ** Math.trunc(time() / 3);
  const current = 50 * data.reportedCases;
  const severe = 0.15 * (factor * reported);
  const availableBeds = data.totalHospitalBeds - (0.65 * data.totalHospitalBeds);
  const requiredBeds = Math.trunc(availableBeds - (severe));
  impact.hospitalBedsByRequestedTime = requiredBeds;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(availableBeds - (0.15 * factor * current));
  return { impact, severeImpact };
};
const covid19ImpactEstimator = (data) => {
  const estimator = ({ impact, severeImpact }) => {
    // challenge 1
    estimateCurrentlyInfected({ data, impact, severeImpact });
    estimateProjectedInfections({ data, impact, severeImpact });
    // challenge 2
    estimateSevereCases({ data, impact, severeImpact });
    estimateBedSpaceAvailability({ data, impact, severeImpact });
    return { data, impact, severeImpact };
  };
  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

export default covid19ImpactEstimator;
