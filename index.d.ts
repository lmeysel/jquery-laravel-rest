/// <reference path="../jquery/jquery.d.ts"/>

interface RESTDataObject {
	url: string
}

interface JQuery {
	rest(route: string, info: RESTDataObject, success: (data) => void);
	// rest(route: 'create', info: RestDataObject, success: (data) => void);
	// rest(route: 'store', info: RestDataObject, success: (data) => void);
	// rest(route: 'show', info: RestDataObject, success: (data) => void);
	// rest(route: 'edit', info: RestDataObject, success: (data) => void);
	// rest(route: 'update', info: RestDataObject, success: (data) => void);
	// rest(route: 'destroy', info: RestDataObject, success: (data) => void);
}