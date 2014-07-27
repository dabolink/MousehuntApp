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

function initialization(){

}

function calculateEssence(){
	var max = $("input[name='essence']:checked").val();
	var EssenceArray = [0,0,0,0,0,0,0,0,0]
	var EssenceNames = ["Aleth","Ber","Cynd","Dol","Est","Fel","Hix","Gur","Icur"]
	var i = 0;
	for (i = 0; i < EssenceArray.length; i++) {
		var string = "Essence" + i.toString();
		EssenceArray[i] = parseInt(document.getElementById(string).value);
	}
	for(i = 0; i < max; i++){
		EssenceArray[i+1] = EssenceArray[i+1] + Math.floor(EssenceArray[i]/3);
		EssenceArray[i] = EssenceArray[i]%3;
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
	div.innerHTML = string;

}