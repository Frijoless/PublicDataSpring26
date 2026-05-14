//TODO
//constants 
    const w = 700;
    const h = 700;
    const margin = 50;


d3.csv("student_dataset.csv").then(data =>{
console.log("data",data)

 data.forEach(d => { 
            d.sleep_hours = +d.sleep_hours;
            d.exam_score = +d.exam_score; 
        });


const maxX = d3.max(data, d => d.sleep_hours);
const maxY = d3.max(data, d => d.exam_score);

const minX = d3.min(data, d => d.sleep_hours)


//Setting the scale of the X and Y axis on the graph
const xScale = d3.scaleLinear()
                .domain([minX-1,maxX])
                .range([margin, w-margin]);

const yScale = d3.scaleLinear()
                .domain([0,maxY])
                .range([h-margin, margin])

    
//Axis Values
const xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(5);

const yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10);


                
//SVG             
            const svg = d3.select("body")
                        .append("svg")
                        .attr("width", w) 
                        .attr("height", h);



//Points
            svg.selectAll("circle") 
                .data(data) 
                .enter()
                .append("circle") 
                .attr("cx", d => xScale(d.sleep_hours)) 
                .attr("cy", d => yScale(d.exam_score)) 
                .attr("r", 6) 
                .attr("fill", "green"); 


//Displaying Graphic
svg.append("g")
    .attr("transform","translate(0," + (h-margin) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + margin + ",0)")
    .call(yAxis)
} );
