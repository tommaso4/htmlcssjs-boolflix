
function addTitle(image, title, title_en, lingua, voto, storia){

  var data = {

    image: image,
    title: title,
    title_en: title_en,
    lingua: lingua,
    voto: voto,
    storia: storia
  }

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(data);
  var conteiner = $(".conteiner-films");
  conteiner.append(li);
}

function ajaxTv(title){

  var outData = {

    api_key: "62277013b50bbe1a627030caccf89ea0",
    language: "it-IT",
    query: title
  }

  $.ajax({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: outData,
    success:function (data){

      var ress = data.results;
      for (var i = 0; i < ress.length; i++) {

        var res = ress[i];
        var titleP = res.original_name;
        var title_en = res.name;
        var val = res.original_language;
        var vote = res.vote_average;
        var img = res.poster_path;
        var storia = res.overview;

        var image = addImage(img);
        var num = getNum(vote);
        var lingua = addBandiera(val);
        addTitle(image, titleP,title_en, lingua, voto, storia);
        var voto = addStar(num);
      }
    },
    error:function(){}
  });
}

function ajaxMovie(title){

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
        var titleP = res.title;
        var title_en = res.original_title;
        var val = res.original_language;
        var vote = res.vote_average;
        var img = res.poster_path;
        var storia = res.overview;
        console.log(storia);

        var image = addImage(img);
        var num = getNum(vote);
        var lingua = addBandiera(val);
        addTitle(image, titleP, title_en, lingua, voto, storia);
        var voto = addStar(num);
      }
    },
    error:function(){}
  })
}

function clearClick(){

  var ul = $(".film");
  ul.remove();

  var inputText = $("input");
  inputText.val(" ");
}

function getNum(voto){

  var number = voto / 2;
  var num = Math.ceil(number);

  return num;
}

function addStar(voto){

  var stellaPiena = "<i class='fas fa-star'></i>";
  var stellaVuota = "<i class='far fa-star'></i>";
  var star = $(".star").last();

  for (var i = 1; i <= 5; i++) {

  if (voto >= i) {
    star.append(stellaPiena);
    }else {
      star.append(stellaVuota)
    }
  }
}

function addBandiera(val){

  if (val==="en") {
    var lingua = "bandierainglese.jpg";
  }else if (val==="it") {
    var lingua = "bandieraitaliana.jpg";
  }else if (val==="es") {
    var lingua = "bandieraspagnola.jpg";
  }else {
    var lingua = "bandieraamericana.jpg";

  }
  return lingua;
}

function addImage(item){

  var stringa = "";
  if (!item) {
    stringa = "nopicture.gif";
  }else {
    var str = "https://image.tmdb.org/t/p/w342"
    stringa = str+item;
  }
  var div = "<div class=image><img src='"+stringa+"'></div>"

  return div;
}


function init(){

  var btn = $("button");
  btn.click(function (){

    var titolo = $("input").val();
    clearClick();
    ajaxTv(titolo);
    ajaxMovie(titolo);
  });

  var input = $("input");
  input.keydown(function(event){

    if (event.which == 13) {
      var titolo = $("input").val();
      clearClick();
      ajaxTv(titolo);
      ajaxMovie(titolo);
    }
  });
}

$(document).ready(init);
