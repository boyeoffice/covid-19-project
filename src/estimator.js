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
const estimateCurrentlyInfected = ({ data, impact, severeImpact }) => {
  impact.currentlyInfected = Math.trunc(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.trunc(data.reportedCases * 50);
  return { impact, severeImpact };
};

const estimateProjectedInfections = ({ data, impact, severeImpact }) => {
  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected
    * (2 ** (Math.trunc(periodEstimator(data.periodType, data.timeToElapse) / 3))));
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected
  * (2 ** (Math.trunc(periodEstimator(data.periodType, data.timeToElapse) / 3))));
  return { impact, severeImpact };
};

const estimateSevereCases = ({ impact, severeImpact }) => {
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  return { impact, severeImpact };
};
const estimateBedSpaceAvailability = ({ data, impact, severeImpact }) => {
  impact.hospitalBedsByRequestedTime = Math.trunc(
    (0.35 * data.totalHospitalBeds) - impact.severeCasesByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    (0.35 * data.totalHospitalBeds) - severeImpact.severeCasesByRequestedTime
  );
  return { impact, severeImpact };
};

const estimateCasesForICU = ({ impact, severeImpact }) => {
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );
  return { impact, severeImpact };
};
const estimateCasesForVentilators = ({ impact, severeImpact }) => {
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );
  return { impact, severeImpact };
};
const estimateDollarInFlight = ({ data, impact, severeImpact }) => {
  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime
      * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD)
      / Math.trunc(periodEstimator(data.periodType, data.timeToElapse)));
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD)
    / Math.trunc(periodEstimator(data.periodType, data.timeToElapse)));
  return { impact, severeImpact };
};

const covid19ImpactEstimator = (data) => {
  const estimator = ({ impact, severeImpact }) => {
    // challenge 1
    estimateCurrentlyInfected({ data, impact, severeImpact });
    estimateProjectedInfections({ data, impact, severeImpact });
    // challenge 2
    estimateSevereCases({ impact, severeImpact });
    estimateBedSpaceAvailability({ data, impact, severeImpact });
    // challenge 3
    estimateCasesForICU({ impact, severeImpact });
    estimateCasesForVentilators({ impact, severeImpact });
    estimateDollarInFlight({ data, impact, severeImpact });
    return { data, impact, severeImpact };
  };
  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

export default covid19ImpactEstimator;
