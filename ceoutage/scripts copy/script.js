document.addEventListener("DOMContentLoaded", function(event) {    
	window.addEventListener("resize", repositionIntro);
	
	document.getElementById("start").addEventListener("click", function(event){
    	hideIntro(event);
	});
	
	
	const elemChart = document.querySelector("#chart");
	window.hovered = [];
	
	
	//Data
	
	var data = [{
	    name: "Tree",
	    value: 28,
	    content: "Falling limbs, broken/leaning trees",
	    icon: "Trees.svg",
	    color: "#68A346"
	}, {
	    name: "Weather",
	    value: 26,
	    content: "Storms that include wind, rain, lightning, snow and ice",
	    icon: "Weather.svg",
	    color: "#2F78BF"
	}, {
	    name: "Equipment",
	    value: 18,
	    content: "Wear and tear requiring repair or replacement",
	    icon: "Equipment-Failure.svg",
	    color: "#F2BE4C"
	}, {
	    name: "Other",
	    value: 12,
	    content: "Fire damage, accidents etc.",
	    icon: "Other.svg",
	    color: "#75B7E5"
	}, {
	    name: "Public",
	    value: 5,
	    content: "Car pole accidents",
	    icon: "Public-Damage.svg",
	    color: "#7DB498"
	}, {
	    name: "Wildlife",
	    value: 4,
	    content: "Accidental contact with lines and equipment",
	    icon: "Animal.svg",
	    color: "#C19B6E"
	}, {
	    name: "Vehicle",
	    value: 1,
	    content: "Long distance service interruption",
	    icon: "Vehicle.svg",
	    priority: 1,
	    color: "#7DB498"
	}, {
	    name: "Planned",
	    value: 3,
	    content: "Required to perform scheduled work safely",
	    icon: "Scheduled.svg",
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
	    .attr('height', '100%')
	    .attr('viewBox', '-30 -55 ' + (Math.min(width, height) + +50) + ' ' + (Math.min(width, height) + +50))
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
	    .on("mouseover", function(d) {
	        
			
	        if(elemChart.classList.contains("intro-disabled")){
	            //Update Image on Hover
	            var imgHref = this.querySelectorAll(".innerGG image")[0].getAttribute("href");
	            imgHrefComps = this.querySelectorAll(".innerGG image")[0].getAttribute("href").split(".");
	
	            if (imgHrefComps[0].indexOf("-Blue") < 0) {
	                resetHovered(); // Reset any previous hovered elements
	                imgHrefComps[0] = imgHrefComps[0].replace(/-Blue/g, '') + "-Blue"; // make sure "-Blue is not there -- seeing issue on quick hovering only in Edge so"
	
	                var g = d3.select(this)
	                    .style("cursor", "pointer")
	                    .append("g")
	                    .attr("class", "text-group");
	
	
	
	
	                imgHref = imgHrefComps.join(".");
	
	                this.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
	                this.querySelectorAll(".innerGG image")[0].setAttribute("width", "70");
	                this.querySelectorAll(".innerGG image")[0].setAttribute("height", "70");
	
	                this.querySelectorAll(".innerGG image")[0].setAttribute("x", +this.querySelectorAll(".innerGG image")[0].getAttribute("x") - +10);
	                this.querySelectorAll(".innerGG image")[0].setAttribute("y", +this.querySelectorAll(".innerGG image")[0].getAttribute("y") - +10);
	
	                this.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
	                var gs = g.append("svg").classed("with-content", true)
	                    .attr("width", 250)
	                    .attr("height", 250).attr("x", -125)
	                    .attr("y", -125);
	
	                var gRect = gs.append("rect").attr("id", "rectWrap").style("fill", "#ffffff").attr('stroke', '#ffffff').attr("x", 0)
	                    .attr("y", 0)
	                    .attr("width", width / 2)
	                    .attr("height", height / 2);
	
	                gs.append("text")
	                    .attr("x", width / 4)
	                    .attr("y", height / 4)
	                    .classed("name-text", true)
	                    .classed("wrap", true)
	                    .text(function(d, i) {
	                        return d.data.name;
	                    })
	                    .attr('text-anchor', 'middle')
	                    .attr('dy', '-2em');
	
	                gs.append("text")
	                    .attr("x", width / 4)
	                    .attr("y", height / 4)
	                    .classed("value-text", true)
	                    .classed("wrap", true)
	                    .text(function(d, i) {
	                        return d.data.value + "%";
	                    })
	                    .attr('text-anchor', 'middle')
	                    .attr('dy', '0em');
	
	                gs.append("text")
	                    .attr("x", 125)
	                    .attr("y", 140)
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
							var w = 20;
						}
						else{
							var w = 110;
						}
	                } 
	                else if (cw <= 400 && cw > 350){
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 30;
						}
						else{
							var w = 115;
						}
	                }
	                else if (cw <= 450 && cw > 400){
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 45;
						}
						else{
							var w = 140;
						}
	                }
	                else if (cw <= 500 && cw > 450){
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 60;
						}
						else{
							var w = 150;
						}
	                }
	                else if (cw <= 550 && cw > 500){
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 85;
						}
						else{
							var w = 165;
						}
	                }
	                else if (cw <= 595 && cw > 550){
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 125;
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
							var w = 195;
						}
	                }
	                else {
	                    
	                    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
							var w = 160;
						}
						else{
							var w = 215;
						}
	                }
	                
	                svg_textMultiline(w);
	                //to fix Z-index issue for arcs
	                d3.select(this).classed('hover', true);
	                this.parentNode.appendChild(this);
	                hovered.push(this);
	            }
		    }
	    })
	    .on("mouseout", function(d, i) {
			
	        if(elemChart.classList.contains("intro-disabled")){
	        	resetHovered();
	        }
	
	    })
	    .append('path')
	    .attr('d', arc)
	    .attr('fill', function(d, i) {
	        return d.data.color;
	    })
	    .on("mouseover", function(d) {
	        
			
	        if(elemChart.classList.contains("intro-disabled")){
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
	    .attr('transform', function(d) {
	        var c = arc.centroid(d);
	        var x = c[0];
	        var y = c[1];
	        var t = "translate(" + x + "," + y + ")";
	        return t;
	    }).append('image')
	    .attr('xlink:href', function(d, i) {
	        //return 'icons/' + d.data.icon;
	        return '/images/' + d.data.icon;
	    })
	    .attr('height', 50)
	    .attr('width', 50)
	    .attr('x', function(d) {
	        var c = arc.centroid(d);
	        if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
	            if (c[0] < 0) {
	                return c[0] / 2 - 25;
	            } else {
	                return 35;
	            }
	        } else {
	            if (c[0] < 0) {
	                return c[0] / 2 + 25;
	            } else {
	                return 45;
	            }
	        }
	
	    })
	    .attr('y', function(d) {
	        var c = arc.centroid(d);
	        if ((d.endAngle + d.startAngle) / 2 > Math.PI) {
	            if (c[1] < 0) {
	                return c[1] / 2 - 35;
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
	function resetHovered() {
	    while (hovered.length > 0) {
	        var elem = hovered.pop();
	        d3.select(elem)
	            .style("cursor", "none")
	            .select(".text-group").remove();
	
	        //to fix Z-index issue for arcs 
	        d3.select(elem).classed('hover', false);
	        // move back to origin
	        //var nextSibling = d3.select("#arc-"+(i+1)).node();
	        //this.parentNode.insertBefore(this, nextSibling);
	        //this.parentNode.removeChild(this);
	
	
	        //Update Image on Hover Out
	
	        var imgHref = elem.querySelectorAll(".innerGG image")[0].getAttribute("href");
	        imgHrefComps = elem.querySelectorAll(".innerGG image")[0].getAttribute("href").split(".");
	        //imgHref = imgHrefComps[0].substring(0, imgHrefComps[0].indexOf('-Blue')) + "." + imgHrefComps[1];
	        imgHref = imgHrefComps[0].replace(/-Blue/g, '') + "." + imgHrefComps[1];
	        elem.querySelectorAll(".innerGG image")[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgHref);
	        elem.querySelectorAll(".innerGG image")[0].setAttribute("width", "50");
	        elem.querySelectorAll(".innerGG image")[0].setAttribute("height", "50");
	        elem.querySelectorAll(".innerGG image")[0].setAttribute("x", +elem.querySelectorAll(".innerGG image")[0].getAttribute("x") + +10);
	        elem.querySelectorAll(".innerGG image")[0].setAttribute("y", +elem.querySelectorAll(".innerGG image")[0].getAttribute("y") + +10);
	    }
	}
	
	
	
	//functions
	
	// Hide Intro
	function hideIntro(event){
	    event.preventDefault();
	    var intro = document.getElementById("introduction").style.display = "none";
	    document.getElementById("chart").classList.add("intro-disabled");
	}
	
	
	
	function repositionIntro(){
		var intro = document.getElementById("introduction");
		var w = window.innerWidth;
		if(w < 638 && w >= 400){
			
			intro.style.width = w/2.3;
			intro.style.height = w/2.3;
			if(w > 399  && w <= 430){
				intro.style.top = "18%";
			}
			else if(w > 430 && w <= 450){
				intro.style.top = "20%";
			}
			else if(w > 450 && w <= 515){
				intro.style.top = "22%";
			}
			else if(w > 515 && w <= 565){
				intro.style.top = "26%";
			}
			else if(w > 550 && w <= 638){
				intro.style.top = "27%";
			}
		}
		else{
			if(w < 400){
				intro.style.width = 180;
				intro.style.height = 180;
				intro.style.top = "16.2%";
			}
			else{
				intro.style.width = 300;
				intro.style.height = 300;
				intro.style.top = "29%";
			}
		}	
	}

	
	// Wrap text in a rectangle.
	function svg_textMultiline(width) {
	
	    var x = 125;
	    var y = "1.5em";
	    var width = width;
	    var lineHeight = 10;
	
	
	
	    /* get the text */
	    var element = document.getElementById('content-text');
	    //console.log(element);
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