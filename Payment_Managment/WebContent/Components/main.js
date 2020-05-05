$(document).ready(function() 
{ 	
	
 	    $("#alertSuccess").hide();	
 	    $("#alertError").hide(); 
}); 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) { 
 	// Clear status msges------------- 
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 
 	// Form validation----------------  	
 	var status = validateItemForm(); 
 
 	// If not valid-------------------  	
 	if (status != true) 
 	{ 
 	 	$("#alertError").text(status); 
 	 	$("#alertError").show(); 
 	 	return; 
 	} 
 
 // If valid----------------------  
 	//var payment = getPaymentCard($("#txtPatID ").val().trim(),    
 	 	 	 	 //$("#txtAmount ").val().trim(),  
 	 	 	 	 	//$("#txtPurpose ").val().trim()); 
 	//$("#colPayment").append(payment); 
 	 
 	//$("#alertSuccess").text("Saved successfully."); 
 	//$("#alertSuccess").show(); 
 	 
 	//$("#formPayment")[0].reset(); 
 	
 	var type = ($("#hidPaymentIDSave").val() == "") ? "POST": "PUT";

 	$.ajax(
 	{ 
 	url : "PaymentAPI", 
 	type : type,
 	 data : $("#formPayment").serialize(), 
 	dataType : "text",
 	 complete : function(response, status)
 	 { 
 		onPaymentSaveComplete(response.responseText, status); 
 	} 
 	});
});

function onPaymentSaveComplete(response, status)
{ 
	if (status == "success") 
{ 
var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success") 
{ 
$("#alertSuccess").text("Successfully saved."); 
$("#alertSuccess").show(); 
$("#divPaymentGrid").html(resultSet.data); 
} 
else if (resultSet.status.trim() == "error")
 { 
$("#alertError").text(resultSet.data); 
$("#alertError").show(); 
}
 } 
else if (status == "error") 
{ 
$("#alertError").text("Error while saving.");
$("#alertError").show(); 
} 
else
{ 
$("#alertError").text("Unknown error while saving..");
 $("#alertError").show(); 
} 
$("#hidPaymentIDSave").val("");
 $("#formPayment")[0].reset(); 
}



// UPDATE

$(document).on("click", ".btnUpdate", function(event) 
{  
	$("#hidPaymentIDSave").val($(this).closest("tr").find('#hidPaymentIDUpdate').val()); 
	$("#paymentAmount").val($(this).closest("tr").find('td:eq(0)').text());
	$("#paymentPurpose").val($(this).closest("tr").find('td:eq(1)').text()); 
	$("#patientID").val($(this).closest("tr").find('td:eq(2)').text()); 

});
 
// REMOVE========================================== 

$(document).on("click", ".btnRemove", function(event)
		{ 
		$.ajax( 
		{ 
		url : "PaymentAPI", 
		type : "DELETE",
		 data : "paymentID=" + $(this).data("id"),
		dataType : "text", 
		complete : function(response, status)
		 { 
		onPaymentDeleteComplete(response.responseText, status); 
		} 
		});
		 });

function onPaymentDeleteComplete(response, status)
{ 
if (status == "success")
 {
 var resultSet = JSON.parse(response); 
if (resultSet.status.trim() == "success") 
{ 
$("#alertSuccess").text("Successfully deleted."); 
$("#alertSuccess").show(); 
$("#divPaymentGrid").html(resultSet.data); 
} 
else if (resultSet.status.trim() == "error")
 { 
$("#alertError").text(resultSet.data);
 $("#alertError").show();
 } 
} 
else if (status == "error") 
{ $("#alertError").text("Error while deleting."); 
$("#alertError").show(); 
} 
else{ 
$("#alertError").text("Unknown error while deleting.."); 
$("#alertError").show(); 
} 
}

//CLIENT-MODEL=================================================================

//CLIENT-MODEL================================================================ 
function validateItemForm()
{  


// PRICE------------------------------- 
if ($("#paymentAmount").val().trim() == "") 
{  
 return "Insert Payment Amount.";  
} 

// is numerical value 
var tmpPrice = $("#paymentAmount").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
{  
return "Insert a numerical value for Item Price."; 
} 

// convert to decimal price 
$("#paymentAmount").val(parseFloat(tmpPrice).toFixed(0)); 

// DESCRIPTION------------------------  
if ($("#paymentPurpose").val().trim() == "") 
{  
return "Insert Payment Description."; 
} 
//PATIENT ID------------------------  
if ($("#patientID").val().trim() == "") 
{  
return "Insert Patient ID."; 
} 

return true; 
}