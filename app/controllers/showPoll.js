/*global $ */
$(document).ready(function(){
    var id = window.location.href.substring(window.location.href.length-24);
    var name;
    var content;
    var options;
    $.getJSON("/getPollData/"+id,function(data){
        name = data.name;
        content = data.content;
        options = data.options;
        console.log(data);
    
    /*global google */

        // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      options.forEach(function(data){
        $("#options").append('<button class="btn waves-effect waves-light col s2" type="submit" name="action">'+data+"</button>"  )
    });
    });
    
    
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'option');
        data.addColumn('number', 'votes');
        data.addRows(content);

        // Set chart options
        var options = {'title':name,
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
});