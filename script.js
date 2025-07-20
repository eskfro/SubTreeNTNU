const data = {
  nodes: [
    { id: "Matematikk 1" },
    { id: "Fysikk 1" },
    { id: "Programmering 1" },
    { id: "Lineær algebra" },
    { id: "Signalbehandling" },
    { id: "Reguleringsteknikk" },
  ],
  links: [
    { source: "Matematikk 1", target: "Lineær algebra" },
    { source: "Fysikk 1", target: "Signalbehandling" },
    { source: "Lineær algebra", target: "Signalbehandling" },
    { source: "Programmering 1", target: "Reguleringsteknikk" },
    { source: "Signalbehandling", target: "Reguleringsteknikk" },
  ]
};

const width = document.getElementById("graph").clientWidth;
const height = 800;

const svg = d3.select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3.forceSimulation(data.nodes)
  .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .selectAll("line")
  .data(data.links)
  .enter().append("line")
  .attr("stroke", "#999");

const node = svg.append("g")
  .selectAll("circle")
  .data(data.nodes)
  .enter().append("circle")
  .attr("r", 20)
  .attr("fill", "#69b3a2")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

const label = svg.append("g")
  .selectAll("text")
  .data(data.nodes)
  .enter().append("text")
  .text(d => d.id)
  .attr("text-anchor", "middle")
  .attr("dy", ".35em");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
