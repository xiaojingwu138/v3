const dataset = [
  { year: '2012', consumption: 79102.34 },
  { year: '2013', consumption: 80556.516},
  { year: '2014', consumption: 80725.086},
  { year: '2015', consumption: 79317.37},
  { year: '2016', consumption: 78613.54 },
  { year: '2017', consumption: 78289.01},
  { year: '2018', consumption: 80583.34},
  { year: '2019', consumption: 79489.016},
  { year: '2020' ,consumption: 73236.14},
  { year: '2021' ,consumption: 76988.75},
];

const margin = { top:30, right: 20, bottom: 100, left: 80 };
const width = 960 - margin.left ;
const height = 500 - margin.top;

const xScale = d3.scaleBand()
  .range([0, width])
  .round(true)
  .paddingInner(0.5); 

const yScale = d3.scaleLinear()
  .range([height, 0]);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(10);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.right})`);

const tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

xScale
  .domain(dataset.map(d => d.year));
yScale
  .domain([0, 100000]);

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);

svg.append('g')
  .attr('class', 'y axis')
  .call(yAxis)
  .append('text')
  .attr('transform', 'rotate(-90)')
  .attr('y', 6)
  .attr('dy', '.71em')
  .style('text-anchor', 'end')
  .text('Co2');

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("energy consumption per capita (kWh/person)");

svg.append("text")
.attr("y",  margin.bottom +400 )
.attr("x", margin.left +300 )
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "15px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Year");

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.left +350)
.attr("y", margin.top -30 )
.style("font-size", "20px")
.style("text-anchor", "middle")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Energy consumption per Person");
  

svg.selectAll('.bar').data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', d => xScale(d.year))
  .attr('width', xScale.bandwidth())
  .attr('y', d => yScale(d.consumption))
  .attr('height', d => height - yScale(d.consumption))
  .attr('fill','steelblue')
  .on('mouseover', (d) => {
    tooltip.transition().duration(200).style('opacity', 0.9);
    tooltip.html(`Energy Consumption Value: <span>${d.consumption}</span>`)
      .style('left', `${d3.event.layerX}px`)
      .style('top', `${(d3.event.layerY - 28)}px`);
  })
  .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));