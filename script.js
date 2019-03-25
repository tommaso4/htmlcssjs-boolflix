
function addTitle(title, title_en, lingua, voto){

  var data = {
    title: title,
    title_en: title_en,
    lingua: lingua,
    voto: voto
  }

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(data);
  var ul = $(".film");
  ul.append(li);
}

function ajaxDocument(title,title_en, lingua, voto){

  var outData = {

    api_key: "62277013b50bbe1a627030caccf89ea0",
    language: "it-IT",
    query: title
  }
  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success:function (data){

      var ress = data.results;    
      for (var i = 0; i < ress.length; i++) {

        var res = ress[i];
        title = res.title;
        title_en = res.original_title;
        lingua = res.original_language;
        voto = res.vote_average;
        addTitle(title,title_en, lingua, voto);
      }
    },
    error:function(){}
  })
}

function clearClick(){

  var ul = $(".film");
  ul.text(" ");
}


function init(){
  var btn = $("button");
  btn.click(function (){

    clearClick();
    var titolo = $("input").val();
    ajaxDocument(titolo);
  });
}

$(document).ready(init);
