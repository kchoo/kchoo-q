function Deferred() {
	this.promise = new Promise(function (resolve, reject) {
		this.resolve = resolve;
		this.reject = reject;
	}.bind(this));
}

function defer() {
	return new Deferred();
}

function all(arr) {
	return Promise.all(arr);
}

function promisify(fn, context) {
	return function (...args) {
		const deferred = defer();

		debugger;

		args = args.filter(el => el !== undefined);

		fn.apply(
			context,
			args.concat(function (err, data) {
				if(err) {
					return deferred.reject(err);
				}

				deferred.resolve(data);
			})
		);

		return deferred.promise;
	};
}

module.exports = {
	defer,
	all,
	promisify,
	resolve: Promise.resolve.bind(Promise),
	reject: Promise.reject.bind(Promise)
};