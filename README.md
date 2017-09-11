# jQuery RESTful callbacks on Laravel standard routes.

Lightweight jQuery plugin which allows you to communicate easily with your Laravel 5.4 server-side.

## Install
Install the plugin via <code>npm install jquery-laravel-rest</code>. Then you just need to <code>require('jquery-laravel-rest');</code>.

## Examples

### Update a dataset via <code>update</code>-route on controller <code>my-module</code>:
<code>$.rest('update', my_data_object, success: (data) => void)</code>

Consider there is no id specified explicitly - it will automatically be attached to the route. The plugin expects you to have the id specified in <code>my_data_object</code>. The ID member can be specified as default value as we'll see later. Furthermore there is the base route required, i.e. when accessing a Laravel ResourceController for Users, then the url could be '~/users', for instance. The deeper parts (e.g. '/edit') will be added by the plugin.

The available REST-routes are: <code>index</code>, <code>create</code>, <code>store</code>, <code>show</code>, <code>edit</code>, <code>update</code> and <code>destroy</code>. The request URLs are set up as decribed in the <a href="https://laravel.com/docs/5.4/controllers#resource-controllers">Laravel-Docs (table)</a>.

### Set a default value:
<code>$.rest('default', { 'idField': 'my_id_member_on_each_object'});</code>

The following default-values can be specified:
* <code>idField</code>: The field name which holds the ID of each object (defaults to 'id').
* <code>url</code>: The default url (maybe helpful when having requests only belonging to a specific module/controller; defaults to '~/').
* <code>csrf_token</code>: Set the CSRF token Laravel expects most likely from you. Might be helpful to specify this within a script-tag in your header:<br/>
	<code>&lt;script&gt; $.rest('csrf_token', {{ csrf_token(); }}); &lt;/script&gt;</code>.<br/>
	Alternatively you can configure the $.ajax with the csrf_token as X-CSRF-TOKEN as described <a href="https://laravel.com/docs/5.4/csrf#csrf-x-csrf-token">here</a>.
* <code>before_request</code>: A callback function to call before each request. This callback takes no parameters and nothing is expected to be returned. It is not meant for preprocessing the data before request, but more for e.g. showing a loader.
* <code>after_request</code>: As <code>before_request</code>, e.g. for hide the loader.

Hope this helps someone ;)