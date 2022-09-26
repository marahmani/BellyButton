function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("https://raw.githubusercontent.com/marahmani/Samples_json/main/samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
   

  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("https://raw.githubusercontent.com/marahmani/Samples_json/main/samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");

      Object.entries(result).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

      });

      //PANEL.append("h6").text(result.location);
    });
  }


  // 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("https://raw.githubusercontent.com/marahmani/Samples_json/main/samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // 4. Create a variable that filters the samples for the object with the desired sample number.
  
      //  5. Create a variable that holds the first sample in the array.
  
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
  
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 

       var yticks = otu_ids.slice(0,10).map(x=>`OTU ${x}`).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      y: yticks,
      orientation: 'h'
    }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = { title: "Top 10 Bacteria Cultures found"
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
     } ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        showlegend: false,
          xaxis: {
          title: 'OTU ID'}
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    var metadata = data.metadata;
    var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var metaresult = metaArray[0];


    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metaresult.wfreq,
        title: { text: "<b> Belly Button Washing Frequency </b> <br> Scrubs per week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
        axis: { range: [null, 10] },
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }



      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 }
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
      
    });

    
  }
  