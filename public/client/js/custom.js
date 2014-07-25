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
	//var max = document.getElementById("EssenceSelection").value;
	//alert(max);
	var EssenceArray = [0,0,0,0,0,0,0,0,0]
	for (var i = 0; i < EssenceArray.length; i++) {
		var string = "Essence" + i.toString();
		//alert(string);
		EssenceArray[i] = document.getElementById(string).value;
		//alert(EssenceArray[i]);
	};
}