	(function () {
		var itertools = {};
		var math = {};
		var random = {};
		var __name__ = '__main__';
		__nest__ (random, '', __init__ (__world__.random));
		__nest__ (math, '', __init__ (__world__.math));
		__nest__ (itertools, '', __init__ (__world__.itertools));
		var xValues = (function () {
			var __accu0__ = [];
			for (var step = 0; step < 201; step++) {
				__accu0__.append (((2 * math.pi) * step) / 200);
			}
			return __accu0__;
		}) ();
		var fisty_values = (function () {
			var __accu0__ = [];
			var __iterable0__ = xValues;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var xValue = __iterable0__ [__index0__];
				__accu0__.append (math.sin (xValue) + 0.5 * math.sin (xValue * 3 + 0.25 * math.sin (xValue * 5)));
			}
			return __accu0__;
		}) ();
		var secondy_values = (function () {
			var __accu0__ = [];
			var __iterable0__ = xValues;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var xValue = __iterable0__ [__index0__];
				__accu0__.append ((xValue <= math.pi ? 1 : -(1)));
			}
			return __accu0__;
		}) ();
		var yValuesList = list ([fisty_values, secondy_values]);
		var kind = 'linear';
		Plotly.plot (kind, (function () {
			var __accu0__ = [];
			var __iterable0__ = yValuesList;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var yValues = __iterable0__ [__index0__];
				__accu0__.append (dict ({x: xValues, y: yValues}));
			}
			return __accu0__;
		}) (), dict ({title: 'my title', xaxis: dict ({title: 'U (t) [V]'}), yaxis: dict ({title: 't [s]'})}));
		__pragma__ ('<use>' +
			'itertools' +
			'math' +
			'random' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.fisty_values = fisty_values;
			__all__.kind = kind;
			__all__.secondy_values = secondy_values;
			__all__.xValues = xValues;
			__all__.yValuesList = yValuesList;
		__pragma__ ('</all>')
	}) ();
