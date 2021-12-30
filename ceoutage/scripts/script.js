document.addEventListener("DOMContentLoaded", function(event) {   
    window.addEventListener("resize", repositionIntro);
   
    document.getElementById("start").addEventListener("click", function(event){
        hideIntro(event);
    });

   
    const elemChart = document.querySelector("#chart");
    window.hovered = [];
   
   
    //Data -- USE THIS TO UPDATE DATA OF THE DONUT CHART

   
    var data = [{
        name: "Tree",
        value: 38,
        content: "Falling limbs, broken/leaning trees",
        iconHover: "Trees-Blue.svg",
        icon: "Trees.svg",
        color: "#68A346"
    }, {
        name: "Weather",
        value: 12,
        content: "Storms that include wind, rain, lightning, snow and ice",
        icon: "Weather.svg",
        iconHover: "Weather-Blue.svg",
        color: "#2F78BF"
    }, {
        name: "Equipment",
        value: 18,
        content: "Wear and tear requiring repair or replacement",
        icon: "Equipment-Failure.svg",
        iconHover: "Equipment-Failure-Blue.svg",
        color: "#F2BE4C"
    }, {
        name: "Other",
        value: 14,
        content: "Fire damage, accidents etc.",
        icon: "Other.svg",
        iconHover: "Other-Blue.svg",
        color: "#75B7E5"
    }, {
        name: "Public",
        value: 1,
        content: "Car pole accidents",
        icon: "Vehicle.svg",
        iconHover: "Vehicle-Blue.svg",
        color: "#F2BE4C",
        offsetX: -7
    }, {
        name: "Wildlife",
        value: 7,
        content: "Accidental contact with lines and equipment",
        icon: "Animal.svg",
        iconHover: "Animal-Blue.svg",
        color: "#C19B6E"
    }, {
        name: "Vehicle",
        value: 1,
        content: "Long distance service interruption",
        icon: "Public-Damage.svg",
        iconHover: "Public-Damage-Blue.svg",
        priority: 1,
        color: "#7DB498",
        offsetX: 7
    }, {
        name: "Planned",
        value: 9,
        content: "Required to perform scheduled work safely",
        icon: "Scheduled.svg",
        iconHover: "Scheduled-Blue.svg",
        color: "#FBE455"
    }, ];
   
   
   
   
   
   
    var text = "";
    var width = 500;
    var height = 500;
    var thickness = 150;
    var duration = 750;
   
    var radius = Math.min(width, height) / 2;
   
    var svg = d3.select("#chart")
        .append('svg')
        .classed('pie', true)
        .attr('width', '100%')
        .attr('height', '110%')
        .attr('viewBox', '-40 -55 ' + (Math.min(width, height) + +50) + ' ' + (Math.min(width, height) + +50))
        .attr('preserveAspectRatio', 'xMinYMin');
   
    var g = svg.append('g')
        .classed('mainG', true)
        .attr('transform', 'translate(' + (Math.min(width, height) / 2) + ',' + (Math.min(width, height) / 2) + ')');
   
    var arc = d3.arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);
   
    var pie = d3.pie()
        .value(function(d) {
            return d.value;
        })
        .sort(function(x, y) {
            return d3.descending(x.value, y.value);
        });
   
   
    var path = g.selectAll('path')
        .data(pie(data))
        .enter()
        .append("g")
        .classed("innerG", true)
        .attr("id", function(d, i) {
            return "arc-" + i;
        })
        .classed("highP", function(d, i) {
            if (d.data.priority) {
                return d.data.priority;
            }
        }, true)
        .on("mouseover", function(d, i) {
           
            //if(elemChart.classList.contains("intro-disabled")){
	        if(hasClass(elemChart,"intro-disabled")){
                //Update Image on Hover
                var imgHref = this.querySelectorAll(".innerGG image")[0].getAttribute("href");
               
                imgHrefComps = this.querySelectorAll(".innerGG image")[0].getAttribute("href").split(".");
				
                //if (imgHrefComps[0].indexOf(d.data.iconHover) < 0 && !this.classList.contains("appended")) {
                if (imgHrefComps[0].indexOf(d.data.iconHover) < 0 && !hasClass(this, "appended")) {    
                  
                    if(navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1)){
                        resetHoveredIe(d); // Reset any previous hovered elements in Ie/edge happening when quickly move over arcs
                    }
                    //imgHrefComps[0] = imgHrefComps[0].replace(/-Blue/g, '') + "-Blue"; // make sure "-Blue is not there -- seeing issue on quick hovering only in Edge so"
   
                    var g = d3.select(this)
                        .style("cursor", "pointer")
                        .append("g")
                        .attr("class", "text-group");
   
                       
   
                    //imgHref = imgHrefComps.join(".");
                    imgHref = 'http://ce.hotsauceatl.com/images/' + d.data.iconHover;
                    this.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
                    this.querySelectorAll(".innerGG image")[0].setAttribute("width", "70");
                    this.querySelectorAll(".innerGG image")[0].setAttribute("height", "70");

                    this.querySelectorAll(".innerGG image")[0].setAttribute("x", +this.querySelectorAll(".innerGG image")[0].getAttribute("ox") - +10);
                   this.querySelectorAll(".innerGG image")[0].setAttribute("y", +this.querySelectorAll(".innerGG image")[0].getAttribute("oy") - +10);
         
   
                    this.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
                    var gs = g.append("svg").classed("with-content", true)
                        .attr("width", 300)
                        .attr("height", 300).attr("x", -150)
                        .attr("y", -150);
   
                    var gCirc = gs.append("circle").attr("id", "rectWrap").style("fill", "#ffffff").attr('stroke', '#ffffff').attr("cx", 150)
                        .attr("cy", 150)
                        .attr("r", (width / 4) + 25);
                        //.attr("height", height / 2);
   
                    gs.append("text")
                        .attr("x", (width / 4) + 25)
                        .attr("y", (height / 4) + 25)
                        .classed("name-text", true)
                        .classed("wrap", true)
                        .text(function(d, i) {
                            return d.data.name;
                        })
                        .attr('text-anchor', 'middle')
                        .attr('dy', '-2em');
   
                    gs.append("text")
                        .attr("x", (width / 4) + 25)
                        .attr("y", (height / 4) + 25)
                        .classed("value-text", true)
                        .classed("wrap", true)
                        .text(function(d, i) {
                            return d.data.value + "%";
                        })
                        .attr('text-anchor', 'middle')
                        .attr('dy', '0em');
   
                    gs.append("text")
                        .attr("x", (width / 4) + 25)
                        .attr("y", 165)
                        .classed("content-text", true)
                        .attr("id", "content-text")
                        .classed("wrap", true)
                        .text(function(d, i) {
                            return d.data.content;
                        })
                        .attr('text-anchor', 'middle')
                        .attr('dy', '2.5em');
   
   
                    // Wrap text inside .content-text
                    var chartContainer = document.getElementById("chart");
                    var chartContainerWidth = chartContainer.clientWidth;
                    var chartContainerHeight = chartContainer.clientHeight;
                    var cw = Math.min(chartContainerWidth, chartContainerHeight);
                   
                    if (cw <= 350) {
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 40;
                        }
                        else{
                            var w = 110;
                        }
                    }
                    else if (cw <= 400 && cw > 350){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 60;
                        }
                        else{
                            var w = 115;
                        }
                    }
                    else if (cw <= 450 && cw > 400){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 95;
                        }
                        else{
                            var w = 140;
                        }
                    }
                    else if (cw <= 500 && cw > 450){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 120;
                        }
                        else{
                            var w = 150;
                        }
                    }
                    else if (cw <= 550 && cw > 500){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 150;
                        }
                        else{
                            var w = 165;
                        }
                    }
                    else if (cw <= 595 && cw > 550){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 165;
                        }
                        else{
                            var w = 175;
                        }
                    }
   
                    else if (cw <= 604 && cw > 595){
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 130;
                        }
                        else{
                            var w = 180;
                        }
                    }
   
                    else if (cw <= 634 && cw > 605){
                       
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 140;
                        }
                        else{
                            var w = 205;
                        }
                    }
                    else {
                       
                        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                            var w = 210;
                        }
                        else{
                            var w = 270;
                        }
                    }
                    //console.log(w);
                    svg_textMultiline(w);
                    //to fix Z-index issue for arcs
                    d3.select(this).classed('hover', true);
                   
                    hovered.push(this);
                    //this.classList.add("appended");   // use since mouseover is being triggered twice when you append child in line below
                    addClass(this, "appended");
                    this.parentNode.appendChild(this);
                                          
                }
            }
        })
        .on("mouseout", function(d, i) {
           
            //if(elemChart.classList.contains("intro-disabled")){
            if(hasClass(elemChart, "intro-disabled")){
                 resetHovered(d);
            }
   
        })
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
            return d.data.color;
        })
        .on("mouseover", function(d) {
           
           
            //if(elemChart.classList.contains("intro-disabled")){
	        if(hasClass(elemChart,"intro-disabled")){
                d3.select(this)
                    .style("cursor", "pointer");
            }
            else{
                d3.select(this)
                    .style("cursor", "default");
            }
           
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("cursor", "none");
        })
        .each(function(d, i) {
            this._current = i;
        });
   
   
    g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(text);
   
    var innerG = svg.selectAll("g.innerG")
        .append("g").classed("innerGG", true)
        .attr('oicon', function(d){
            return d.data.icon;
        })
        .attr('oiconh', function(d){
            return d.data.iconHover;
        })
        .attr('transform', function(d) {
            var c = arc.centroid(d);
            var x = c[0];
            var y = c[1];
            var t = "translate(" + x + "," + y + ")";
            return t;
        }).append('image')
        .attr('xlink:href', function(d, i) {
            //return 'icons/' + d.data.icon;
            return 'http://ce.hotsauceatl.com/images/' + d.data.icon;
        })
        .attr('height', 50)
        .attr('width', 50)
        .attr('x', function(d) {
            var c = arc.centroid(d);
            if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
                if (c[0] < 0) {
                    if(d.index == 3){
                        // safari - weather icon hover cutoff fixes
                        return c[0] / 2 - 20;
                    }
                    else{
	                    if(typeof d.data.offsetX === "number"){
		                   
		                    return c[0] / 2 - 25 + d.data.offsetX;
	                    }
	                    else{
		                    return c[0] / 2 - 25;
	                    }
                           
                    }
                } else {
                    return 35;
                }
            } else {
                if (c[0] < 0) {
                    return c[0] / 2 + 25;
                } else {
                    return 30;
                }
            }
   
        })
        .attr('ox', function(d) {
            var c = arc.centroid(d);
            if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
                if (c[0] < 0) {
                    if(d.index == 3){
                        // safari - weather icon hover cutoff fixes
                        return c[0] / 2 - 20;
                    }
                    else{
                         if(typeof d.data.offsetX === "number"){
		                   
		                    return c[0] / 2 - 25 + d.data.offsetX;
	                    }
	                    else{
		                    return c[0] / 2 - 25;
	                    } 
                    }
                } else {
                    return 35;
                }
            } else {
                if (c[0] < 0) {
                    return c[0] / 2 + 25;
                } else {
                    return 30;
                }
            }
   
        })
        .attr('oy', function(d) {
            var c = arc.centroid(d);
            if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
                if (c[1] < 0) {
                    return c[1] / 2 - 36;
                } else {
                    return 45;
                }
            } else {
                if (c[1] < 0) {
                    return c[1] / 2 - 40;
                } else {
                    return 45;
                }
            }
   
        })
        .attr('y', function(d) {
            var c = arc.centroid(d);
            if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
                if (c[1] < 0) {
                    return c[1] / 2 - 36;
                } else {
                    return 45;
                }
            } else {
                if (c[1] < 0) {
                    return c[1] / 2 - 40;
                } else {
                    return 45;
                }
            }
   
        });   
   
    // Reset any elements on the stack
    function resetHovered(d) {
        while (hovered.length > 0 && document.querySelectorAll(".appended").length > 0) {
        //while (hovered.length > 0 && document.querySelectorAll(".innerG.hover").length > 0) { 
            var elem = hovered.pop();
            var elem = document.querySelector("#"+elem.id);
         
            d3.select("#"+elem.id)
                .style("cursor", "none")
                .selectAll(".text-group").remove();
          
            //to fix Z-index issue for arcs
            d3.select("#"+elem.id).classed('hover', false);
            // move back to origin
            //var nextSibling = d3.select("#arc-"+(i+1)).node();
            //this.parentNode.insertBefore(this, nextSibling);
            //this.parentNode.removeChild(this);
   
   
            //Update Image on Hover Out
   
            //var imgHref = elem.querySelectorAll(".innerGG image")[0].getAttribute("href");
           // imgHrefComps = imgHref.split(".");
            //imgHref = imgHrefComps[0].substring(0, imgHrefComps[0].indexOf('-Blue')) + "." + imgHrefComps[1];
            //imgHref = imgHrefComps[0].replace(/-Blue/g, '') + "." + imgHrefComps[1];
           
            imgHref = "http://ce.hotsauceatl.com/images/" + elem.querySelectorAll(".innerGG")[0].getAttribute("oicon");
            //imgHref = "/images/" + d.data.icon;
            elem.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
            elem.querySelectorAll(".innerGG image")[0].setAttribute("width", "50");
            elem.querySelectorAll(".innerGG image")[0].setAttribute("height", "50");
            elem.querySelectorAll(".innerGG image")[0].setAttribute("x", +elem.querySelectorAll(".innerGG image")[0].getAttribute("ox"));
            elem.querySelectorAll(".innerGG image")[0].setAttribute("y", +elem.querySelectorAll(".innerGG image")[0].getAttribute("oy"));
           
           
            var elemsWithAppended = document.querySelectorAll(".appended");

            [].forEach.call(elemsWithAppended, function(el) {
                //el.classList.remove("appended");
                removeClass(el,"appended");
            });
           
        }
    }
    // Reset any elements on the stack
    function resetHoveredIe(d) {
       		
         
           
            var hovedElems = document.querySelectorAll(".innerG.hover");
            [].forEach.call(hovedElems, function(elem) {
                //el.classList.remove("hover");
               
                var elem = document.querySelector("#"+elem.id);
                if(!!window.MSInputMethodContext && !!document.documentMode){
	                //ie11
	                
	                 var i,testGroups =  document.getElementsByClassName("text-group");
	                
				    for (i = testGroups.length; i--;) {         
				      testGroups[i].parentNode.removeChild(testGroups[i]);             
				    }
                }
                else{
	                
					d3.select("#"+elem.id)
					 .style("cursor", "none")
					 .selectAll(".text-group").remove();
                }
               
          
            //to fix Z-index issue for arcs
            d3.select("#"+elem.id).classed('hover', false);
            // move back to origin
            //var nextSibling = d3.select("#arc-"+(i+1)).node();
            //this.parentNode.insertBefore(this, nextSibling);
            //this.parentNode.removeChild(this);
			
   
            //Update Image on Hover Out
   
            //var imgHref = elem.querySelectorAll(".innerGG image")[0].getAttribute("href");
           // imgHrefComps = imgHref.split(".");
            //imgHref = imgHrefComps[0].substring(0, imgHrefComps[0].indexOf('-Blue')) + "." + imgHrefComps[1];
            //imgHref = imgHrefComps[0].replace(/-Blue/g, '') + "." + imgHrefComps[1];
           
            imgHref = "http://ce.hotsauceatl.com/images/" + elem.querySelectorAll(".innerGG")[0].getAttribute("oicon");
            elem.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
            elem.querySelectorAll(".innerGG image")[0].setAttribute("width", "50");
            elem.querySelectorAll(".innerGG image")[0].setAttribute("height", "50");
            elem.querySelectorAll(".innerGG image")[0].setAttribute("x", +elem.querySelectorAll(".innerGG image")[0].getAttribute("ox"));
            elem.querySelectorAll(".innerGG image")[0].setAttribute("y", +elem.querySelectorAll(".innerGG image")[0].getAttribute("oy"));
            });
           
               
           
       
    }
   
   
    //functions
    
    // since Classlist doesn't work well in IE11
    function hasClass( target, className ) {
    	return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
	}
    /**
	 * Method that adds a class to given element.
	 * @param  {Object} ele DOM element where class needs to be added
	 * @param  {Object} cls Classname which is to be added
	 * @return {null} nothing is returned.
	 */
	function addClass(ele, cls) {
	    if (ele.classList) {
	        ele.classList.add(cls);
	    } else if (!hasClass(ele, cls)) {
	        ele.setAttribute('class', ele.getAttribute('class') + ' ' + cls);
	    }
	}
	
	/**
	 * Method that does a check to ensure that class is removed from element.
	 * @param  {Object} ele DOM element where class needs to be removed
	 * @param  {Object} cls Classname which is to be removed
	 * @return {null} Null nothing is returned.
	 */
	function removeClass(ele, cls) {
	    if (ele.classList) {
	        ele.classList.remove(cls);
	    } else if (hasClass(ele, cls)) {
	        ele.setAttribute('class', ele.getAttribute('class').replace(cls, ' '));
	    }
	}
   
    // Hide Intro
    function hideIntro(event){
        event.preventDefault();
        var intro = document.getElementById("introduction").style.display = "none";
        //document.getElementById("chart").classList.add("intro-disabled");
        addClass(document.getElementById("chart"),"intro-disabled");
    }
   
   
   
    function repositionIntro(){
        window.intro = document.getElementById("introduction");
        var w = document.getElementById("chart").offsetWidth;
        
        if(w < 638 && w >= 400){
           
            window.intro.style.width = w/2.1 + "px";
            window.intro.style.height = w/2.1 + "px";
            
        }
        else{
            if(w < 400){
                window.intro.style.width = 200 + "px";
                window.intro.style.height = 200+ "px";
            }
            else{
                window.intro.style.width = 350 + "px";
                window.intro.style.height = 350 + "px";
            }
        }
        
        if(w == 650){
	        var chartHeight = document.getElementById("chart").offsetHeight;
	        if(chartHeight > 685){
		        chartHeight = 685;
	        }
	        window.intro.style.top = ((chartHeight - window.intro.offsetHeight)/2 + 12) + "px";
			window.intro.style.left = ((document.getElementById("chart").offsetWidth - window.intro.offsetWidth) /2 + 15) + "px";  
        }
        else if(w > 575 && w < 650){
	        var chartHeight = document.getElementById("chart").offsetHeight;
	        if(chartHeight > 685){
		        chartHeight = 685;
	        }
	        window.intro.style.top = ((chartHeight - window.intro.offsetHeight)/2 + 25) + "px";
			window.intro.style.left = ((document.getElementById("chart").offsetWidth - window.intro.offsetWidth) /2 + 15) + "px";  
        }
        else if(w > 500 && w < 575){
	         window.intro.style.top = ((document.getElementById("chart").offsetHeight - window.intro.offsetHeight)/2 + 22) + "px";
			 window.intro.style.left = ((document.getElementById("chart").offsetWidth - window.intro.offsetWidth) /2 + 15) + "px";  
        }
        else{
	         window.intro.style.top = ((document.getElementById("chart").offsetHeight - window.intro.offsetHeight)/2 + 17) + "px";
			 window.intro.style.left = ((document.getElementById("chart").offsetWidth - window.intro.offsetWidth) /2 + 11) + "px";  
        }
         
        
       // window.intro.style.top = ((document.getElementById("chart").offsetHeight - window.intro.offsetHeight)/2 + 17) + "px";
       // window.intro.style.left = ((document.getElementById("chart").offsetWidth - window.intro.offsetWidth) /2 + 11) + "px";   
            }
   
   
    function ieIntro(w, elem){
        // IE & EDGE
        if(navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1)){
	        
            elem.style.width = "270px";
            elem.style.height = "270px";
            if(w > 535 && w <= 635){
                elem.style.top = "135px";
                elem.style.left = "135px";
            }
            else if(w > 525 && w <= 545){
                elem.style.top = "22%";
                elem.style.left = "28%";
            }
            else if(w > 500 && w <= 524){
                elem.style.top = "21%";
                elem.style.left = "28%";
            }
            else if(w > 450 && w <= 500){
                elem.style.top = "20%";
                elem.style.left = "28%";
            }
            else if(w > 430 && w <= 450){
                elem.style.top = "18%";
                elem.style.left = "27%";
            }
            else if(w > 399  && w <= 430){
                elem.style.top = "17%";
                elem.style.left = "27%";
            }
            else{
               
                //var chartContainer = document.getElementById("chart");
                //var chartContainerWidth = chartContainer.clientWidth;
                //var chartContainerHeight = chartContainer.clientHeight;
                   
                //elem.style.top = "210px";
                //elem.style.left = "190px";
                elem.style.top = (document.getElementById("chart").offsetHeight - elem.style.height)/2;
                elem.style.left = (w - elem.style.width) /2;
            }
            
            elem.style.top = (document.getElementById("chart").offsetHeight - elem.style.height)/2;
            elem.style.left = (w - elem.style.width) /2;
        }
    }
   
    // Wrap text in a rectangle.
    function svg_textMultiline(width) {
   
        var x = 155;
        var y = "1.5em";
        var width = width;
        var lineHeight = 10;
   
   
   
        /* get the text */
        var element = document.getElementById('content-text');
        var text = element.innerHTML;
        //var text = new XMLSerializer().serializeToString(element);
        if (typeof text !== "undefined") {
   
            /* split the words into array */
            var words = text.split(' ');
            var line = '';
   
            /* Make a tspan for testing */
            element.innerHTML = '<tspan id="processing">busy</tspan >';
   
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var testElem = document.getElementById('processing');
                testElem.innerHTML = testLine;
                /* Messure textElement */
                var metrics = testElem.getBoundingClientRect();
                testWidth = metrics.width;
   
                if (testWidth > width && n > 0) {
                    element.innerHTML += '<tspan x="' + x + '" dy="' + y + '">' + line + '</tspan>';
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
   
            element.innerHTML += '<tspan x="' + x + '" dy="' + y + '">' + line + '</tspan>';
            //document.getElementById("processing").remove();
            var testElem = document.getElementById('processing');
            testElem.parentNode.removeChild(testElem);
        }
   
   
    }
    repositionIntro();
});
