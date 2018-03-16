import $ from 'jquery';
import '../dist/index.js';

console.log($.rest);
if (typeof ($.rest) == 'function') {
	$('#test').text('Test successful.');
} else {
	$('#test').text('Test failed.');
}