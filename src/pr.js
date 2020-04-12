const homoSapiens = {
  kingdom: 'Animalia',
  classs: 'Mammalia',
  family: 'Hominidae',
  genus: 'Homo',
  species: 'H. sapiens'
};

function logSpeciesInfo({ species, kingdom, classs }) {
  // console.log(`The species ${species} belongs to the ${kingdom} kingdom and ${classs} class.` );
  return { species, kingdom, classs }
}

console.log(logSpeciesInfo(homoSapiens));

const data = {
  impact: {},
  severeImpact: 4
};

const test1 = ({ impact, severeImpact }) => {
  impact.currently = 59;
  return { impact, severeImpact };
};
console.log(test1(data));
