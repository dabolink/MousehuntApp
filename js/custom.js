
/*******************************************************************************************************
	Constant Variables
 ******************************************************************************************************/
const NUMLOCATIONS = 50;
var destinations = [];
var res;
/*******************************************************************************************************
	Graph Variables
 ******************************************************************************************************/
// weight == cost of travel
function LocationNode(location, edges){
	this.location = location;
	this.edges = edges;
	this.weight = 0;
	this.leastNode = null;
	this.HasShoppe = false;
	this.getLeastNode = function(){
		return this.leastNode;
	}
	this.setLeastNode = function(leastNode){
		this.leastNode = leastNode;
	}
	this.getEdges = function(){
		return this.edges;
	}
	this.addNeighbour = function(node, weight){
		var edge = new TravelEdge(Graph,[this,node],weight);
		g.addEdge(edge);
		this.addEdge(edge);
		node.addEdge(edge);
	}
	this.getWeight = function(node){
		for (e in edges){
			if( (e.getNode1() == this && e.getNode2() == node) || (e.getNode1() == node && e.getNode2() == this)){
				return e.getWeight();
			}
		}
		return -1;
	}
	this.getLocation = function(){
		return this.location;
	}
	this.Stringy = function(){
		console.log(this.location + " " + this.weight);
	}
}


function TravelEdge(nodes, weight, disabled){
	this.nodes = nodes;
	this.weight = weight;
	this.disable = disabled;
	this.setNode1 = function(node){
		this.nodes[0] = node;
	}
	this.setNode2 = function(node){
		this.nodes[1] = node;
	}
	this.getNode1 = function(){
		return this.nodes[0];
	}
	this.getNode2 = function(){
		return this.nodes[1]
	}
	this.getWeight = function(){
		return this.weight;
	}
	this.setWeight = function(weight){
		this.weight = weight;
	}
	this.Stringy = function(){
		console.log(this.weight + " " + this.nodes[0].location + " " + this.nodes[1].location);
	}
	this.getNodes = function(){
		return this.nodes;
	}
	this.getDisabled = function(){
		return this.disable;
	}

}


var Graph = {
	size: 0,
	edgeNum: 0,
	nodes: [],
	edges: [],
	add: function(node){
		this.nodes.push(new LocationNode(node.getLocation(),node.getEdges));
		this.size++;
	},
	getSize: function(){
		return this.size;
	},
	addEdge: function(edge){
		this.edges.push(new TravelEdge(edge.getNodes(), edge.getWeight(), edge.getDisabled()));
		this.edgeNum++;
	},
	getNodes: function(){
		return this.nodes;
	},
	getEdges: function(){
		return this.edges;
	},
	shortestPath: function(start, finish){
		console.log("to be implemented");
	},
	getWeight: function(n1, n2){
		for(e in this.edges){
			if(e != null){
				if( (e.getNode1() == n1 && e.getNode2() == n2) || (e.getNode1() == n2 && e.getNode2() == n1)){
					return e.getWeight();
				}
			}
		}
		return 0;
	},
	Print: function(){
		console.log(this.nodes);
		console.log(this.edges);
		console.log(this.size);
		console.log(this.edgeNum);
		for(i=0;i<this.size;i++){
			console.log(this.nodes[i]);
			this.nodes[i].Stringy();
		}
		for(i=0;i<this.edgeNum;i++){
			console.log(this.edges[i]);
			this.edges[i].Stringy();
		}
	},
};

function initialization(){
	function nodeExists(location){
		
	}
	serverPost('getTowns',{},function(result){
			//console.log(result);
			window.res = result;
			var nodes = Graph.getNodes();		
			for(i=0;i<res.Towns.length;i++){
				//console.log(res.Towns[i].Location);
				var n1 = new LocationNode(res.Towns[i].Location,[]);
				Graph.add(n1);
				//console.log(res.Towns[i].Paths.length);
				for(j=0;j<res.Towns[i].Paths.length;j++){
					//console.log("here");
					var Loc = res.Towns[i].Paths[j].Destination;
					var cost = res.Towns[i].Paths[j].Cost;
					var n2 = null;
					for(k = 0; k<nodes.length;k++){
						if(nodes[k].getLocation() === Loc){
							n2 = nodes[k];
							console.log(nodes[k])
						}
					}
					if(n2 == null){
						n2 = new LocationNode(Loc,[]);
						Graph.add(n2);
					}
					else{
						console.log("do something")
					}
					var edge = new TravelEdge([n1,n2],cost,false);
					console.log(edge);
					Graph.addEdge(edge);
					//alert("cost" + result.Towns[i].Paths[j].Cost);
				}
			}
		//Graph.Print();
	});
}
/*******************************************************************************************************
 Global Variables
 ******************************************************************************************************/



/*******************************************************************************************************
 Utility Functions
 ******************************************************************************************************/
//Functions that are used by other functions to perform a a basic task

//Post data to a server, or create an alert if there was an error.
//A function can be passed in if the server is expected to send a JSON response.
//Variables:
//	uri 		An indicator the server will read in as the action (See serverPost Methods in expresso.js)
//	data 		A valid JSON string. Use JSON.stringify({ data:value })
function serverPost(uri, keyPair, successFunction){

	$.ajax({
    url: '/' + uri, 
    type: 'POST', 
    contentType: 'application/json', 
    data: keyPair,
    success: function(result){
    	successFunction(result);
    },
	error: function(xhr){
		alert('There was a problem.\n' + xhr.responseText);
		if(xhr.status == 401){
			delete $.mobile.urlHistory.stack[0];
			$.mobile.changePage("#login");
		}
	}})
}

/*******************************************************************************************************
 Page Functions
 ******************************************************************************************************/

function calculateEssence(){
	var max = $("input[name='essence']:checked").val();
	var prisms = 0;
	var EssenceArray = [0,0,0,0,0,0,0,0,0];
	var EssenceNames = ["Aleth","Ber","Cynd","Dol","Est","Fel","Hix","Gur","Icur"]
	var i = 0;
	for (i = 0; i < EssenceArray.length; i++) {
		var string = "Essence" + i.toString();
		EssenceArray[i] = parseInt(document.getElementById(string).value);
	}
	for(i = 0; i < max; i++){
		EssenceArray[i+1] = EssenceArray[i+1] + Math.floor(EssenceArray[i]/3);
		prisms += Math.floor(EssenceArray[i]/3);
		EssenceArray[i] = EssenceArray[i]%3;
	}
	for(i = EssenceArray.length - 1; i > max; i--){
		EssenceArray[i-1] = EssenceArray[i] * 3;
		EssenceArray[i] = 0;
	}
	var div = document.getElementById('result');
	div.innerHTML = "";
	var string = "<table border='1' width=100%><tr><th colspan=9>Result</th></tr><tr>"
	for(i=0;i<EssenceNames.length;i++){
		string += "<td><center>"
		string += EssenceNames[i]
		string += "</center></td>";
	}
	string += "<tr></tr>";
	for(var i = 0; i< EssenceArray.length;i++){
		string += "<td>";
		string += "<center>"
		string += EssenceArray[i].toString();
		string += "</center>"
		string += "</td>";
	}
	string += "</tr>";
	string += "</table>";
	string += "<p><center> Uses "
	string += prisms.toString()
	string += " prisms, costing "
	string += (prisms * 500).toString();
	string += " gold</center>";
	div.innerHTML = string;
}

/*******************************************************************************************************
 Admin Functions
 ******************************************************************************************************/
function addTown(){
	var loc = document.getElementById("Location").value;
	//hasShoppe
	var HS = document.getElementById("HasShoppe").value;
	
	var HasShoppe = false;
	if(HS == "true"){
		HasShoppe = true;
	}

	var Paths = [];
	for(i = 0; i < destinations.length; i++){
		Paths.push({Destination: destinations[i][0],
					Cost: destinations[i][1],
		});
		console.log(Paths[i].Destination + " " + Paths[i].Cost)
	}
	console.log(Paths)
	serverPost('addTown',JSON.stringify({
		Name: loc,
		HasShoppe: HasShoppe,
		Paths: Paths
	}) ,function(result){
		if(result.message == 'true'){
			alert("town saved");
			destinations = [];
		}else{
			alert("town not saved");
		}
	});
}
function addDestination(){
	var Destination = document.getElementById("Destination").value;
	var Cost = document.getElementById("Cost").value;
	var DDiv = document.getElementById("DDiv");
	destinations.push([Destination,Cost]);
	console.log(destinations);
	DDiv.innerHTML += "<p>" + destinations[destinations.length-1] + "</p>";
}