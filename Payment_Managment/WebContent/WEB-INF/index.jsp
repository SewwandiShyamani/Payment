<%@page import = "com.Payment" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Details</title>
<link rel="stylesheet"href="Views/bootstrap.min.css">
<script src="Components/jquery-3.5.0.js"></script>
<script src="Components/main.js"></script>
</head>
<body>
	<div class="container">
 		<div class="row">
			<div class="col-8"> 
 	 	 	 
 	 	<h1 class="m-3">Payment Details</h1> 
 	 	 	 	 
 	 	<form id="formPayment" name="formPayment" method="post" action="index.jsp"> 
	     Payment Amount:  
         <input id="txtAmount" name="txtAmount" type="text"     
               class="form-control form-control-sm">  
         <br> Payment Purpose:  
         <input id="txtPurpose" name="txtPurpose" type="text"     
               class="form-control form-control-sm">  
         <br> Patient ID:  
         <input id="txtPatID" name="txtPatID" type="text"   
               class="form-control form-control-sm"> 
         
         <br>  
         <input id="btnSave" name="btnSave" type="button" value="Save"    
                  class="btn btn-primary"> 
         <input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value=""> 
</form> 
 
 	 	<div id="alertSuccess" class="alert alert-success">	</div>  	 	
 	 	<div id="alertError" class="alert alert-danger">	</div> 
 	 	 
 	<br>
 	<div id="divPaymentGride">
 	<%
 	Payment paymentObj = new Payment();
 		out.print(paymentObj.readPayments());
 	%> 
 	</div>
 	
 	</div> 
</div> 
 	 	 

 
</div> 
</body> 
</html> 
 	 	