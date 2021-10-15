/* eslint-disable no-param-reassign */
import { tsvParse } from 'd3-dsv';
import { timeParse } from 'd3-time-format';

const parseForPlotting = (parse) => (d) => {
  d.date = parse(d.date);
  d.open = +d.open;
  d.high = +d.high;
  d.low = +d.low;
  d.close = +d.close;
  d.volume = +d.volume;

  return d;
};

const parseDate = timeParse('%Y-%m-%d');

const parseData = (historicalRawData) => {
  let TSVData = 'date\topen\thigh\tlow\tclose\tvolume\tsplit\tdividend\tabsoluteChange\tpercentChange\n';
  historicalRawData.reverse().forEach((dayInfo) => {
    TSVData += `${dayInfo.date}\t${dayInfo.open}\t${dayInfo.high}\t${dayInfo.low}\t${dayInfo.close}\t${dayInfo.volume}\t\t\n`;
  });
  return tsvParse(TSVData, parseForPlotting(parseDate));
};

export default parseData;
