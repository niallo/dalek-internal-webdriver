///* jshint strict: false, unused: false */
///* global __SCRIPT */

// the last argument is the completion callback; everything else should be
// passed verbatim to the user-supplied function
var args = Array.prototype.slice.call(arguments, 0, -1);
var cb = arguments[arguments.length - 1];

var dalek = {
	store: args.shift(),
	test: [],
	assert: {},
	_assert: {
		ok: function (isOk, message) {
			this.test.push({ok: isOk, message: message});
		}
	},
	data: function (key, value) {
		if(value) {
			this.store[key] = value;
			return this;
		}
		return this.store[key] || null;
	}
};

dalek.assert.ok = function () {
	return dalek._assert.ok.apply(dalek, Array.prototype.slice.call(arguments));
};

// wrap the completion callback and pass this function to the user-supplied
// function as the last parameter
var finish = function(userRet) {
	cb({dalek: dalek.store, test: dalek.test, userRet: userRet});
};
args.push(finish);

(function(__USERARGUMENTS) {
	__SCRIPT;
}).apply(dalek, args);
