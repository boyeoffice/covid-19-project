// challenge 1
const currentlyInfected = ({ data, impact, severeImpact }) => {
  impact.currentlyInfected = (data.reportedCases * 1) * 10;
  severeImpact.currentlyInfected = (data.reportedCases * 1) * 50;
  return { impact, severeImpact };
};

exports.estimator = async (req, res) => {
  try {
    const result = await estimateCalculator(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
};
