    if (!library)
   var library = {};

library.json = {
   replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
      },
   prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine, library.json.replacer);
      }
   };

var account = { active: true, codes: [48348, 28923, 39080], city: "London" };
var planets = [{ name: 'Earth', order: 3, stats: { life: true, mass: 5.9736 * Math.pow(10, 24) } }, { name: 'Saturn', order: 6, stats: { life: null, mass: 568.46 * Math.pow(10, 24) } }];



function get(){
    var method = document.getElementById("method");
    endpoint = method.options[method.selectedIndex].value;

    var user = document.getElementById("user").value;

    var endpoint = document.getElementById("endpoints");
    endpoint = endpoint.options[endpoint.selectedIndex].value  + user;



    document.getElementById("url").innerHTML= "<b>Response for:</b>" +  endpoint ;

    $.ajax({
        url:endpoint,
        type:"GET",
        success:function(Response){
            // document.getElementById("code").innerHTML =JSON.stringify(Response);
            $('#code').html(library.json.prettyPrint(Response));
        },
        error:function(Error){
                        document.getElementById("code").innerHTML = Error;

        }
    });




}