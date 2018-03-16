import $ from 'jquery';
import Rest from '../dist/index.js';

if (Rest) {
	$('#test').text('Test successful.');
} else {
	$('#test').text('Test failed.');
}