import $ from 'jquery';
import '../src/index.js';

if ($.rest) {
	$('#test').text('Test successful.');
} else {
	$('#test').text('Test failed.');
}