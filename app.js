var news = [],
	lock_out = false,
	count = 0,
	loadHack = function () {
		var $column2 = $('div#column2');
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://news.ycombinator.com/rss", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				news = [];
				$(xhr.responseText).find("item").each(function()
				{
					var $this = $(this),
						linker = $this.children('description').html().toString().replace('<!--[CDATA[', '').replace('-->Comments]]', '').replace('<a href="', '').replace('&gt;', '');

					news.push({
						title: $this.children('title').text(),
						link: $('<span>').html(linker).text()
					});
				});

				var $divzor = $('<div class="hacker_news"></div>'),
					htmz = '<div class="hacker_news_header"><h3>Nacker Hews</h3><a id="hacker_news_reload" href="javascript:void(0);">Reload</a></div><div class="scrolly"><ul>';

				$.each(news, function (k, v) {
					htmz += '<li><a target="_blank" href="' + v.link + '">' + v.title + '</a></li>';
				});

				htmz += '</ul></div>';

				$divzor.append($(htmz));
				$column2.append($divzor);
			}
			lock_out = false;
		}
		xhr.send();
	};


$(document).ready(function () {
	dddooo = window.setInterval(function () {
		if ($('#column2').length > 0) {
			fire_me(loadHack);
		}
		count += 2500;
	}, 2500);

	$('body')
		.on({
			mouseenter: function () {
				$('#page-wrapper').addClass('lock_scrolly');
			},
			mouseleave: function () {
				$('#page-wrapper').removeClass('lock_scrolly');
			}
		}, '.hacker_news')
		.on({
			click: function () {
				var $column2 = $('div#column2');
				$column2.empty().html('<p class="hacker_news_loading">Loading...</p>');
				lock_out = false;
			}
		}, '#hacker_news_reload');
});

function fire_me(cb) {
	var $column2 = $('div#column2');
	if ($column2.find('.hacker_news').length < 1 && !lock_out) {
		lock_out = true;
		$column2.empty();

		if (typeof cb === 'function') {
			cb();
		}
	}
}