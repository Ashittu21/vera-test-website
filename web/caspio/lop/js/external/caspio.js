

function hide_submit_button(button_id){

$("#"+button_id).hide();

}

function show_case_search(case_search_id){

$("#"+case_search_id).show();

}


/*function show_add_case_type(case_type_id, norec_id){

if(!$("#"+norec_id).length>0){

  $("#"+case_type_id).show();
}

}*/

function show_add_case_type(case_type, norec_id){

if(!$("#"+norec_id).length>0){

  $("."+case_type).show();
}

}

/*function cancel_button(button_id, v_url){

  var v_but = "<input type='button' class='cb_but' id='cb_cancel' value='Cancel'>";
  $("#"+button_id).parent().append(v_but);
  $("#cb_cancel").click(function(){
    window.location.href=v_url;
  });
}*/


function empty_other(main_field_id,other_field_id){

var v_main_val = String($("#"+main_field_id).val()).toLowerCase();
if(v_main_val.indexOf('other')==-1){
  $("#"+other_field_id).val("");
}

}


findMultiSelectOption('InsertRecordSpecial_Pop');
findMultiSelectOption('InsertRecordOutreach');
findMultiSelectOption('InsertRecordRelief_Type');

function findMultiSelectOption(id){
var select = $('#'+id);
select.attr('multiple',true);
var option = $('#'+id+' option:selected');
if(option.length > 0){
var splited = option.val().split(', ');
if(splited.length > 1){
option.attr('selected', false).remove();
var value_map = {};
for(var i = 0; i < splited.length; i++){
value_map[splited[i]]=splited[i];
}
select.find('option').each(function(i, el){
if(el.value in value_map){
el.selected = true;
}
});
}
}
}

function empty_password(contain_pass_id){
  $("[id^="+contain_pass_id+"]").val("");
}

function f_reset(v_url){
  window.location.href=v_url+"?cbResetParam=1";
}

function f_reset_mult(v_url){
  window.location.href=v_url+"&cbResetParam=1";
}
