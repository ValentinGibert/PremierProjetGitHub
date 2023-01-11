// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });

function randomArticle() {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&generator=random&grnnamespace=0&callback=?", function(result)  {
       // button Choose For Me ready to be clicked again
       $("#random").attr("disabled", false);
       // hiding intro (empty state) before displaying the response from API
       cleanIntro();
       $.each(result.query.pages, function(key, page){
          $("#random-result-title").html('<a href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a>');
          $("#random-result").html(page.extract);
          return false; //to display 1st element and finish the loop
       });
       $(".random-result").slideDown(function () {
          arrowBack();
       });
    });
 }
 
 function searchArticle(query){
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + query + "&callback=?", function(result) {
       // button Choose For Me ready to be clicked again
       $("#query-button").attr("disabled", false);
       // hiding intro (empty state) before displaying the result from API
       cleanIntro();
       if (result.hasOwnProperty("query")) {
          $.each(result.query.pages, function(key, page){
             var extract = page.extract.length > 464 ? page.extract.substring(0,464) + "..." : page.extract;
             $("#article-list").append('<li><h2><a href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a></h2>' + '<p>' + extract + '</p>' + '</li>');
          });
       } else {
          hintChange(true);
       }
       arrowBack();
    });
 }
 
 function cleanIntro (){
    $(".intro").hide();
 }
 
 function hintChange (turnOn) {
    if (turnOn) {
      $("#no-query").removeClass("hidden");
      $("#random").addClass("look");
    } else {
      $("#no-query").addClass("hidden");
      $("#random").removeClass("look");
    }
 }
 
 // back-to-top link visibility set
 function arrowBack (){
    if (!$(".intro").is(":visible") && $("body").height() - $("footer").height() > $(window).height()){
       $("#back-to-top").removeClass("hidden");
    } else {
       $("#back-to-top").addClass("hidden");
    }
 }
 
 $(document).ready(function() {
    $("#random").on("click", function(e) {
       // random button unfocusing
       $(this).blur();
       // disable the button before getting the response from API
       $(this).attr("disabled", true);
       // hiding article-list
       $("#article-list").hide();
       // hiding no-query help text and removing yellow look background of random after random being chosen
       hintChange(false);
       randomArticle();
       e.preventDefault();
    });
    $("#query-button").on("click", function(e) {
       // cleaning after previous search
       $("#article-list").html(""); 
       // making article-list visible again
       $("#article-list").show();
       // cleaning random result if displayed
       $(".random-result").slideUp(function (){
          // when content slided up calling arrowBack() when query is empty back-to-top section
          arrowBack();
       });
       if ($("#query").val() === "") {
          // if input is empty let's display empty state help and clean intro image
          cleanIntro();
          hintChange(true);
          // if random hovered over #no-query span class removed else visible
          $("#random").hover(function() {
                $("#no-query span").removeClass("accent-hint");
             }, function() {
                $("#no-query span").addClass("accent-hint");
             });
       } else {
          // disable the button before getting the response from API
          $(this).attr("disabled", true);
          // passing input text
          searchArticle($("#query").val()); 
          hintChange(false);
       }
       e.preventDefault();
    });
    // back-to-top focus 
    $("#arrow-top").on("click", function() {
       $("#query").focus().select();
    });
 });
 