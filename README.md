#info

The shows dropdown menu. It takes list of points, links, if it's static menu point or action, if it's dynamic. Simple and robust widget.

#initialize

userMenu.init({
	// button
	el: "@userMenu",
	// drop down list
	options: [
		{ text: 'Logout', link: '/Authentication/LogOff' },
		{ text: 'test', action: function () { alert(123); } }
	]
});
