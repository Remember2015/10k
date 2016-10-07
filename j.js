var q = function(x) {
	return document.querySelectorAll(x);
}
var rnd = function(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}
var shuffle = function(arr) {
	return arr.sort(function() {
		return Math.random() > 0.5 ? -1 : 1; 
	});
}
var bg = function() {
	var cs = [rnd(60,120),rnd(100,160),rnd(140,200)];
	cs = shuffle(cs);
	// cs.pop();
	return "rgb(" + cs.join(',') + ')';
}
var createEl = function(tag, csname, inner) {
	var el = document.createElement(tag);
	el.classList.add(csname);
	el.innerHTML = inner;
	return el;
}
var clon = function(node) {
	var ret = node.cloneNode(true);
	ret.setAttribute('id', Math.random());
	return ret;
}
var genIcons = function(icon, count, csname) {
	var con = createEl('div', csname, "");
	for (var i = 0; i < count; i++) {
		con.appendChild(clon(icon));
	}
	if (count % 1 > 0.1) {
		var half = clon(icon);
		half.style.width = 4 * (count % 1) + "rem";
		con.appendChild(half);	
	}
	return con;

}
var sections = q('section');
for (var i = 0; i < sections.length; i++) {
	sections[i].style.background = bg();
}
var charts = q('p.rept');
for (var i = 0; i < charts.length; i++) {
	var item = charts[i];
	var v = item.getAttribute('data-d');
	v = v.split(':');
	var a = parseFloat(v[0]);
	var b = parseFloat(v[1]);
	if (a < b) {
		b = (b/a).toFixed(2);
		a = 1;
	} else {
		a = (a/b).toFixed(2);
		b = 1;
	}
	var icon = item.getAttribute('data-icon');
	icon = q('#' + icon)[0];
	var left = genIcons(icon, a * 3, 'left');
	var right = genIcons(icon, b * 3, 'right');
	var middle = createEl('div', 'middle', a + ":" + b);
	var chel = item.parentNode.querySelector('div.chart');
	chel.appendChild(left);
	chel.appendChild(middle);
	chel.appendChild(right);
}
var clonArea = clon(q('#pet')[0]);
clonArea.setAttribute('width', "196px");
clonArea.setAttribute('height', "196px");
q('#logo')[0].appendChild(clonArea);

var current = 0;
var main = q('main')[0];
var isAnimating = false;
var navs = q('nav a');
var activeNav = function(ac) {
	for (var i = 0; i < navs.length; i++) {
		navs[i].classList.remove('active');
	}
	if (ac)
		ac.classList.add('active');
}
window.onscroll = function() {
	if (isAnimating) {
		document.body.scrollTop = window.innerHeight * current;
		return;
	};
	isAnimating = true;
	var angle = document.body.scrollTop / window.innerHeight;

	if (angle > current) {
		current = angle == parseInt(angle) ? angle : parseInt(angle) + 1;
	} else if (angle < current) {
		current = parseInt(angle);
	}
	if (current < 0) current = 0;
	if (current > 11) current = 11;

	main.style.transform = "translateY( -"+100*current+"vh )";
	main.parentNode.scrollTop = 0;
	document.body.scrollTop = window.innerHeight * current;

	activeNav(navs[current-1]);
	
	setTimeout(function() {
		isAnimating = false;
	}, 500);
};
if (window.location.hash) {
	if (q(window.location.hash)) {
		setTimeout(function() {
			document.body.scrollTop = main.parentNode.scrollTop;
			main.parentNode.scrollTop = 0;
		}, 100);
	}
}
for (var i = 0; i < navs.length; i++) {
	navs[i].onclick = function(e) {
		document.body.scrollTop = q(this.getAttribute('href'))[0].offsetTop;
	};
}