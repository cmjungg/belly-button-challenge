// Variable for data
const sample_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Initializes the page with a default plot and started data
function init() {

    let selector = d3.select("#selDataset");
//Populates dropdown menu
    d3.json(sample_data).then(((data) => {
        let sampleNames = data.names;
        for (let i = 0; i < sampleNames.length; i++){
            selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
        };
//first sample data on dropdown menu
        let firstSample = sampleNames[0];
//plots with first sample data
        updatePlotly(firstSample);
        buildTabledata(firstSample);
     }));
     
    

    
}
//Build table function
function buildTabledata(sample) {
//reads data
    d3.json(sample_data).then(((data) => {
      let metadata = data.metadata;
      let output = metadata.filter(value => value.id == sample);
      let result = output[0];

      let PANEL = d3.select("#sample-metadata");
  
//clear panel
      PANEL.html("");
//outputs data using for loop
      for (x in result){
        PANEL.append("h6").text(`${x}: ${result[x]}`);
      };
  
    
    }));
  }
  
// Call updatePlotly() and buildTabledata() when a change takes place to the dropdown menu
//d3.selectAll("#selDataset").on("change", [updatePlotly,buildMetadata]);
function optionChanged(newValue) {
    updatePlotly(newValue);
    buildTabledata(newValue);
};

// Plots visualizations
function updatePlotly(sample) {
//calls data and input into variables
    d3.json(sample_data).then(((data) => {
        let data_samples = data.samples;
        let output = data_samples.filter(value => value.id == sample);
        let result = output[0];
        let otu_ids = result.otu_ids;
        let sample_values = result.sample_values;
        let otu_labels = result.otu_labels;
        

  
    // Initialize x and y arrays for both bar and bubble
   
    
        let traceBar = {
            y: otu_ids.slice(0, 10).toString(),
            x: sample_values.slice(0, 10),
            text: otu_labels.slice(0, 10),
            type: 'bar',
            orientation: 'h'
        };

        let traceBubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            
            }

        };
        
        let barData = [traceBar];
        let bubbleData = [traceBubble];
//setup the layout
        let layoutBar = {
            title: "Top 10 Bacterias",
            margin: { t: 30, l: 150 }
        };

        let layoutBubble = {
            title: "Bacteria Cultures",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}

        };

  
    //plots bar and bubble
    Plotly.newPlot("bar", barData, layoutBar);
    Plotly.newPlot("bubble", bubbleData, layoutBubble);
    }));
}
  
init();
  