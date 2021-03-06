//ensure icon changes only apply to active tile (get parent element and apply changes in context)
window.onload = function () {
FastClick.attach(document.body);
$('.accessBook').css('font-size','2.2em');
var downloadIcon = "icon-download2",
			trashIcon = "icon-trash2",
			bookIcon = "icon-book";
//build library view and data
var libraryData = JSON.parse('{"bookTitle":"Compendium of Pharmaceuticals and Specialties 2014 (CPS) English", "imgurl":"../img/Tile_Background.png","author":"Editor-in-Chief Carol Repchinsky, BSP","otherTitle":"Other Title","isDownloaded":false ,"date":"11/04/2020","thumb":"img/CPhA_Book_Image.png"}');
var libraryView = $("#lib").html();
var libraryOutput = Mustache.render(libraryView, libraryData);
$(document.body).append(libraryOutput);
var backgroundImage = libraryData.imgurl;

$('.book').addClass('addImg');
var infoView = $('#moreInfo').html(),
	infoData;

//render and display more info modal on click (destroys itself when window is exited)
$('.info').on('click', function () {
	//infoData would need to fetched dynamically
	infoData = JSON.parse('{"heading":"More information","title":"Title","titleVal":"Compendium of Pharmaceuticals and Specialties 2014 (CPS)","thumb":"img/CPhA_Book_Image.png", "aboutBook":"about.html","aboutUs":"about.html","credits":"credits.html","author":"Author","authorVal":"Editor-in-Chief Carol Repchinsky, BSP","publisher":"Publisher","publisherVal":"Canadian Pharmacists Association" ,"date":"11/04/2020","isbn":"978-1-894402-70-5","subj":"Subject","subjVal":"","orgPub":"Originial Publication","language":"Language","languageVal":"English","desc":"Description","descVal":"The Compendium of Pharmaceuticals and Specialties (CPS) is Canada\'s source for drug information. It contains more than 2000 product monographs for drugs, vaccines and natural health products, including 200 new products for the Canadian market. This definitive resource also has 151 monographs written by the editorial staff of CPhA, based on the best available evidence and reviewed by expert physicians and pharmacists. Clinical tools, product images and directories of sources for drug and health care information are included. A comprehensive cross-referenced index of generic and brand names ensures you can easily find what you\'re looking for. The product monographs are prepared by the pharmaceutical manufacturers and approved by Health Canada."}');
	var	infoOutput = Mustache.render(infoView, infoData);
		
	//show grey background, append rendred more info view to modal window, show modal window
	$('.overlay').fadeIn(300);
	$('#infoModal').append(infoOutput);
	$('#infoModal').fadeIn(400);

	//remove list items with empty values passed in from 
	removeEmpty();

	//close modal window via touch outside of window or by pressing close icon
	$('#closeModal,.overlay').on('click', function(){
			$('#infoModal').fadeOut(300).children().remove();
			$('.overlay').fadeOut(200);
		});
	//Iframe show/hide
	$('.aboutLinks').children().on('click', function (ev) {
			$('#close').removeClass('hide');
			/*$('.infoList,.stickyLeft')*/
			$('.iframeCont').slideDown(500);
			$('.bookModalContainer').addClass('hide');
		});
			$('#close').on('click', function () {
			$('#close').addClass('hide');
			/*$('.infoList,.stickyLeft')*/$('.bookModalContainer').removeClass('hide');
			$('#aboutFrame').attr('src',' ');
			$('.iframeCont').slideUp(500);		
		});
	});
//adjust layout based on orientation
var mql = window.matchMedia("(orientation: portrait)");
//detect orientation and set view once page is loaded
if(mql.matches) {  
	$('.tiles').addClass("small-block-grid-2");
	$('#infoModal').css('height','900px');
} else {  
	$('.tiles').addClass("small-block-grid-3");
	$('#infoModal').css('height','700px');
}
//listen for orientation changes and adjust view accordingly
mql.addListener(function(m) {
	if(m.matches) {
		$('.tiles').removeClass("small-block-grid-3");
		$('.tiles').addClass("small-block-grid-2");
		$('#infoModal').css('height','800px');
	}else{
		$('.tiles').removeClass("small-block-grid-2");
		$('.tiles').addClass("small-block-grid-3");
		$('#infoModal').css('height','600px');
	}
});
//check if book is downloaded and update icons
if (libraryData.isDownloaded) {
	//show book icon and garbage icon
	$('.garbage').addClass(trashIcon);
	$('.accessBook').addClass(bookIcon);
}else{
	//show download icon
	$('.accessBook').addClass(downloadIcon);
};

//progress bar
	$('.accessBook').on('click', function () {
		//only excecute download if the icon class = donwloaded --> (data.isDownloaded = false)
		if ($('.accessBook').hasClass(downloadIcon)) {

				$('progress').removeClass('hide');
				$('.grayed').removeClass('hide');	
				var i = 0;
					do {
						setTimeout($('progress').attr('value',i),30000);
						i +=5;											 										 						  
					} while (i < $('progress').attr('max'));
					//hide
					$('.accessBook').removeClass(downloadIcon);
					$('.garbage').addClass(trashIcon);
					$('.accessBook').addClass(bookIcon);
					$('progress').addClass('hide');
					$('.grayed').addClass('hide');
				};

			
		});
};

	//dynamically remove list items with empty values
	function removeEmpty () {
			$(".val").each(function(){
		    	if (!$(this).text().trim().length) {
	        	$(this).parent($('li')).remove();
	    	}
		});
	};