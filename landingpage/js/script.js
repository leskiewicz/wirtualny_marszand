window.addEventListener('DOMContentLoaded', (event) => {
	
	window.scrollTo(window.scrollX, window.scrollY - 1);
	window.scrollTo(window.scrollX, window.scrollY + 1);
	
	let milos = document.getElementById("milos");
	let milos2 = document.getElementById("milos2");
	milos.style.display = "none";
	milos2.style.display = "none";
	
	
	/*
	 window.addEventListener("resize", () => {

			let infoBoxes = document.querySelectorAll(".infoBox");
		
			let maximumSize = 0;
			
			for(var i = 0; i < infoBoxes.length; i++) {
				if(infoBoxes[i].offsetHeight > maximumSize) {
					maximumSize = infoBoxes[i].offsetHeight
				}
			}
			
			for(var i = 0; i < infoBoxes.length; i++) {
				infoBoxes[i].style.height = maximumSize + 'px';
			}
		
	 });
	*/
	
	var triggered = false;
	
	document.addEventListener('scroll', function(e) {
		var elementPosition = document.getElementById("advantages");
		var position = elementPosition.getBoundingClientRect();
		
		if(!triggered && position.top < window.innerHeight && position.bottom >= 0) {
			
			var elements = document.querySelectorAll(".infoBox")
			
			var classes = ["animate__animated animate__bounceIn", "animate__animated animate__bounceIn animate__delay-1s", "animate__animated animate__bounceIn animate__delay-2s"]
			
			for(var i = 0; i < elements.length; i++) {	
				sClass = classes[i].split(" ");
				for(var j = 0; j < sClass.length; j++) {
					elements[i].classList.add(sClass[j]);
				}
			}
			
			triggered = true;
		}
	
	});
	
	var downloadBtn = document.getElementById("downloadBtn");
	
	downloadBtn.addEventListener("mouseover", () => {	
		downloadBtn.classList.add("animate__animated");
		downloadBtn.classList.add("animate__tada");
	});
	
	downloadBtn.addEventListener("mouseout", () => {
		downloadBtn.classList.remove("animate__animated");
		downloadBtn.classList.remove("animate__tada");
	});
	
	
	var finish = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
	var elements = []
	var ricardo = false;
	
	function cmpArrays(arr1, arr2) {
		if(arr1.length != arr2.length) return false;
		
		for(let i = 0; i < arr1.length; i++) {
			if(arr1[i] != arr2[i]) return false;
		}
		
		return true;
	}
	
	function checkArrays(arr1, arr2) {
		let cnt = 0;
		for(let i = 0; i < arr1.length; i++) {
			if(arr1[i] == arr2[i])  {
				cnt += 1
			}
			if(cnt == arr1.length) return true;
		}
		return false;
	}
	
	
	function makeNewPosition(){
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
	}

	function animateDiv(){
		var newq = makeNewPosition();
		$('#ricardo').animate({ top: newq[0], left: newq[1] }, function(){
		  animateDiv();        
		});
		
	};

	window.addEventListener("keydown", (e) => {
	
		elements.push(e.keyCode)
		
		console.log(elements)
		
		if(!checkArrays(elements, finish)) {
			elements = []
		}
	
		if(!ricardo && cmpArrays(finish, elements)) {
			milos.style.display = "block"
			milos2.style.display = "block";
			ricardo = true;
		}
	});
});