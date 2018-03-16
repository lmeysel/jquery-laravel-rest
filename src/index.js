import jQuery from 'jquery';

/**
 * Simple client-side API for fast RESTful implementation for lavarel 5.4 backend.
 * Call:
 *   - $.rest('<index|create|show|edit|store|update|destroy>, [Object], <URL>)
 *   - $.rest('default', [Object])
 * 
 * @copyright 2017 Ludwig Meysel
 * @license MIT
 */
const rest = (function ($) {
	var fixed = {
	};
	var defaults = {
		url: '/',
		idField: 'id',
		csrf_token: false,
		beforeRequest: false,
		afterRequest: false,
	};

	function r_bfr() {
		if (typeof (defaults.beforeRequest) == 'function')
			defaults.beforeRequest();
	}

	function r_aftr(obj, def, message) {
		if (typeof (defaults.afterRequest) == 'function')
			defaults.afterRequest();
	}

	function p(args) {
		if (!args)
			return defaults;
		return $.extend({}, defaults, args, fixed);
	}

	function e(sender) {
		var cont = $('<div>').appendTo($('body'))
			.css({ 'width': '100%', 'height': '100%', 'position': 'fixed', 'top': 0, 'left': 0, 'z-index': 99999, 'background-color': '#ffe6e6' });
		var text = $('<a>').appendTo(cont)
			.css({ 'color': 'red', 'font-size': '2em', 'cursor': 'pointer', position: 'absolute', 'right': '10px', 'top': '10px' })
			.html('<i class="fa fa-times"></i>&nbsp;<strong>Close</strong>')
			.click(function () { cont.remove(); });
		var iframe = $('<iframe>').appendTo(cont)
			.css({
				'position': 'absolute',
				'top': text.outerHeight() + 20 + 'px',
				width: '100%',
				'border': '1px solid #red',
				height: document.documentElement.clientHeight - text.outerHeight() - 20 + 'px'
			});
		var doc = iframe[0].contentDocument;
		doc.open();
		doc.writeln(sender.responseText);
		doc.close();
	}
	var rest = {
		/**
		 * Create: (GET ~/create, where ~ is replaced with url-parameter.)
		 * @param [d] The data
		 * @param [a] additional arguments
		 * @param [c] success-callback
		 */
		create: function (d, a, c) {
			r_bfr();
			$.ajax({
				method: 'GET',
				url: a.url + '/create',
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Index: (GET ~/)
		 */
		index: function (d, a, c) {
			$.ajax({
				method: 'GET',
				url: a.url,
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Store (POST ~/)
		 */
		store: function (d, a, c) {
			d['_method'] = 'POST';
			$.ajax({
				method: 'POST',
				url: a.url,
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Show (GET ~/{id}, where {id} will be replaced with the value specified in <i>d</i>'s <i>idField</i>)
		 */
		show: function (d, a, c) {
			$.ajax({
				method: 'GET',
				url: a.url + '/' + d[defaults['idField']],
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Edit (GET ~/{id}/edit)
		 */
		edit: function (d, a, c) {
			$.ajax({
				method: 'GET',
				url: a.url + '/' + d[defaults['idField']] + '/edit',
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Update (PUT ~/{id})
		 */
		update: function (d, a, c) {
			d['_method'] = 'PUT';
			$.ajax({
				method: 'POST',
				url: a.url + '/' + d[defaults['idField']],
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		},
		/**
		 * Delete (DELETE ~/{id})
		 */
		destroy: function (d, a, c) {
			d['_method'] = 'DELETE';
			$.ajax({
				method: 'POST',
				url: a.url + '/' + d[defaults['idField']],
				data: d,
				success: c,
				error: e
			})
				.always(r_aftr);
		}
	}

	return function () {
		var c = arguments[0];
		if (c == 'default') {
			$.extend(defaults, arguments[1]);
			return;
		}
		if (typeof (rest[c]) != 'function')
			throw new Error('Invalid REST command "' + c + '".');

		if (arguments.length > 1 && typeof (arguments[1]) != 'object')
			throw new Error('Invalid argument. Object expected');

		var a = false,
			cb = false;
		for (var i = 1; i < 3; i++)
			if (arguments[i]) {
				if (typeof (arguments[i]) == 'function')
					cb = arguments[i]
				else
					a = p(arguments[i]);
			}
		if (!a) a = defaults;
		if (a.url.lastIndexOf('/') == (a.url.length - 1))
			a.url = a.url.substring(0, a.url.length - 1);
		if (a.csrf_token)
			arguments[1] = $.extend({ '_token': a.csrf_token }, arguments[1])
		rest[c](arguments[1], a, cb);
	};
})(jQuery);

jQuery.rest = rest;
export default rest;