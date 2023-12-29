var baseUrl = "http://api.login2explore.com:5577";
var imlPartUrl = "/api/iml";
var irlPartUrl = "/api/irl";
var schoolDbName="SCHOOL-db";
var schoolRelationName="SCHOOL-Rel";
var connToken="90931910|-31949299749991503|90960669";
$("#rollno").focus();

function savRecNo2LS(jsonobj){
    var lvData= JSON.parse(jsonobj.data);
    localStorage.setItem("recno",lvData.rec_no);
}
function getRollnoAsJsonobj(){
    var rollno=$("#rollno").val();
    var jsonStr={
        rollno:rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonobj){
    savRecNo2LS(jsonobj);
    var record = JSON.parse(jsonobj.data).record;
    $("#fullname").val(record.fullname);
    $("#className").val(record.className);
    $("#address").val(record.address);
   }
function resetForm(){
    $("#rollno").val("");
    $("#fullname").val("");
    $("#className").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#rollno").prop("disabled",false);
    $("#fullname").prop("disabled",true);
    $("#className").prop("disabled",true);
    $("#birthdate").prop("disabled",true);
    $("#address").prop("disabled",true);
    $("#rolllno").focus();
   }
   function validateData(){
    var rollno ,fullname ,className, birthdate , address;
rollno=$("#rollno").val();
fullname=$("#fullname").val();
className=$("#className").val();
birthdate=$("#birthdate").val();
address=$("#address").val();

if (rollno===""){
    alert("Roll no is missing");
    $("#rollno").focus();
    return"";
}
if (fullname===""){
    alert("Full name is missing");
    $("fullname").focus();
    return"";
}
if (className===""){
    alert("class name no is missing");
    $("className").focus();
    return"";
}
if (birthdate===""){
    alert("birth date no is missing");
    $("birthdate").focus();
    return"";
}
if (address===""){
    alert("address no is missing");
    $("address").focus();
    return"";
}
var jsonStrobj={
    'Roll-No':rollno,
    'Full-Name':fullname,
    'Class':className,
    'Birth-Date':birthdate,
    'Address':address,
};
return JSON.stringify(jsonStrobj);

   }
function getRollNo()
{
      var rollnoJsonObj=getRollnoAsJsonobj();
      var getRequest=createGET_BY_KEYRequest(connToken,schoolDbName,schoolRelationName,rollnoJsonObj);
      jQuery.ajaxSetup({async: false});
      var resJsonobj=executeCommandAtGivenBaseUrl(getRequest,baseUrl,irlPartUrl);
      jQuery.ajaxSetup({async: true});
 if(resJsonobj.status===400)
{
    $("#save").prop("disabled",false);
    $("#update").prop("disabled",false);
    $("#reset").prop("disabled",false);
    $("#rollno").focus();
}
 else if (resJsonobj.status===200){
    $("#rollno").prop("disabled",true);
    fillData(resJsonobj);
    $("#update").prop("disabled",false);
    $("#reset").prop("disabled",false);
    $("#rollno").focus();

}
}
function saveData()
{
    var jsonStrobj =validateData();
    if (jsonStrobj==="")
    {
        return "";
    }
    putRequest= createPUTRequest(connToken,jsonStrobj,schoolDbName,schoolRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonobj=executeCommandAtGivenBaseUrl(putRequest,baseUrl,imlPartUrl);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonobj);

   resetForm();
   $("#rollno").focus();

}
function updateData()
{
    $("#update").prop("disabled",true);
    jsonChg=validateData();

  var  updateRequest= createUPDATERecordRequest(connToken,jsonChg,schoolDbName,schoolRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonobj=executeCommandAtGivenBaseUrl(updateRequest,baseUrl,imlPartUrl);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonobj);
    resetForm();
    $("#rollno").focus();

}
