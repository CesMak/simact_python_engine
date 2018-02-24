	(function () {
		var __name__ = '__main__';
		var chain = __init__ (__world__.itertools).chain;
		var __name__ = __init__ (__world__.math).__name__;
		var acos = __init__ (__world__.math).acos;
		var acosh = __init__ (__world__.math).acosh;
		var asin = __init__ (__world__.math).asin;
		var asinh = __init__ (__world__.math).asinh;
		var atan = __init__ (__world__.math).atan;
		var atan2 = __init__ (__world__.math).atan2;
		var atanh = __init__ (__world__.math).atanh;
		var ceil = __init__ (__world__.math).ceil;
		var cos = __init__ (__world__.math).cos;
		var cosh = __init__ (__world__.math).cosh;
		var degrees = __init__ (__world__.math).degrees;
		var e = __init__ (__world__.math).e;
		var exp = __init__ (__world__.math).exp;
		var expm1 = __init__ (__world__.math).expm1;
		var floor = __init__ (__world__.math).floor;
		var hypot = __init__ (__world__.math).hypot;
		var inf = __init__ (__world__.math).inf;
		var isnan = __init__ (__world__.math).isnan;
		var log = __init__ (__world__.math).log;
		var log10 = __init__ (__world__.math).log10;
		var log1p = __init__ (__world__.math).log1p;
		var log2 = __init__ (__world__.math).log2;
		var nan = __init__ (__world__.math).nan;
		var pi = __init__ (__world__.math).pi;
		var pow = __init__ (__world__.math).pow;
		var radians = __init__ (__world__.math).radians;
		var sin = __init__ (__world__.math).sin;
		var sinh = __init__ (__world__.math).sinh;
		var sqrt = __init__ (__world__.math).sqrt;
		var tan = __init__ (__world__.math).tan;
		var tanh = __init__ (__world__.math).tanh;
		var trunc = __init__ (__world__.math).trunc;
		if (__envir__.executor_name == __envir__.transpiler_name) {
			var num =  __init__ (__world__.numscrypt);
		}
		var SimactBasic = __class__ ('SimactBasic', [object], {
			__module__: __name__,
			function_list: list (['plot', 'linspace', 'add', 'dot', 'func']),
			local_storage: dict ({}),
			get __init__ () {return __get__ (this, function (self) {
				// pass;
			});},
			get convert_format () {return __get__ (this, function (self, input_str) {
				print (input_str);
				if (__in__ ('[', input_str)) {
					var input_str = input_str.py_split ('],[');
					for (var i = 0; i < len (input_str); i++) {
						input_str [i] = input_str [i].py_replace ('[', '');
						input_str [i] = input_str [i].py_replace (']', '');
						input_str [i] = input_str [i].py_split (',');
					}
					return num.array (input_str, __kwargtrans__ ({dtype: float}));
				}
				if (input_str.isdigit ()) {
					return float (input_str);
				}
				if (__in__ ("'", input_str)) {
					var input_str = input_str.py_replace ("'", '');
				}
				return str (input_str);
			});},
			get fixed_length_string () {return __get__ (this, function (self, input_str, max_length) {
				var length = len (input_str);
				if (length > max_length) {
					return input_str.__getslice__ (0, max_length - 3, 1) + '...';
				}
				else {
					var tmp = max_length - length;
					var tt = '';
					for (var i = 0; i < tmp; i++) {
						var tt = tt + ' ';
					}
					return input_str + tt;
				}
			});},
			get print_local_storage () {return __get__ (this, function (self) {
				var output_text = ((self.fixed_length_string ('Variable', 12) + self.fixed_length_string ('Content', 18)) + '\t') + 'Dim';
				var __iterable0__ = self.local_storage.py_items (self);
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var __left0__ = __iterable0__ [__index0__];
					var key = __left0__ [0];
					var value = __left0__ [1];
					var dim = num.array (value).shape;
					var out_str = str (value);
					var out_str = out_str.py_replace ('\n', ' ');
					var out_str = out_str.py_replace (' ', '');
					var out_str = out_str.py_replace ('\t', '');
					var out_str = out_str.py_replace ('][', '],[');
					var output_text = ((((output_text + '\n') + self.fixed_length_string (str (key), 12)) + self.fixed_length_string (out_str, 18)) + '\t') + dim;
				}
				document.getElementById ('local_storage').value = output_text;
			});},
			get dot () {return __get__ (this, function (self, arg1, arg2) {
				return __matmul__ (arg1, arg2);
			});},
			get linspace () {return __get__ (this, function (self, start, end, disk) {
				var tmp = list ([]);
				for (var i = start; i < (end - start) / disk + 2; i++) {
					tmp [i - 1] = str (start + (i - 1) * disk);
				}
				return num.array (tmp, __kwargtrans__ ({dtype: float}));
			});},
			get func () {return __get__ (this, function (self, formula, x_vec) {
				var x_vec = x_vec.tolist ();
				var result = list ([]);
				for (var i = 0; i < len (x_vec); i++) {
					var tmp = formula.py_replace ('x', str (x_vec [i]));
					result [i] = eval (tmp);
				}
				return num.array (result, __kwargtrans__ ({dtype: float}));
			});},
			get plot () {return __get__ (this, function (self, y_values_in, x_values_in, title, xname, yname) {
				if (typeof x_values_in == 'undefined' || (x_values_in != null && x_values_in .hasOwnProperty ("__kwargtrans__"))) {;
					var x_values_in = self.linspace (-(5), 5, 0.1);
				};
				if (typeof title == 'undefined' || (title != null && title .hasOwnProperty ("__kwargtrans__"))) {;
					var title = 'Output_Plot';
				};
				if (typeof xname == 'undefined' || (xname != null && xname .hasOwnProperty ("__kwargtrans__"))) {;
					var xname = 'x';
				};
				if (typeof yname == 'undefined' || (yname != null && yname .hasOwnProperty ("__kwargtrans__"))) {;
					var yname = 'y';
				};
				if (__in__ ('stringable', str (py_typeof (y_values_in)))) {
					var title = 'y=' + str (y_values_in);
					var y_values_in = self.func (y_values_in, x_values_in);
				}
				var x_values = x_values_in.tolist ();
				var y_values = y_values_in.tolist ();
				var kind = 'linear';
				Plotly.newPlot (kind, list ([dict ({x: x_values, y: y_values})]), dict ({title: title, xaxis: dict ({title: xname}), yaxis: dict ({title: yname})}));
				return num.vstack (tuple ([x_values_in, y_values_in]));
			});},
			get add () {return __get__ (this, function (self, arg1, arg2) {
				return arg1 + arg2;
			});},
			get parse_input () {return __get__ (this, function (self) {
				var input_str = document.getElementById ('input').value;
				if (__in__ ('=', input_str)) {
					var input_str = input_str.py_replace (' ', '');
					var index_gleich = input_str.find ('=');
					var left_string = input_str.__getslice__ (0, index_gleich, 1);
					var right_string = input_str.__getslice__ (index_gleich + 1, null, 1);
					if (__in__ ('(', right_string)) {
						var function_name = right_string.__getslice__ (0, right_string.find ('('), 1);
						var tmp = right_string.__getslice__ (right_string.find ('(') + 1, len (right_string) - 1, 1);
						var tmp = tmp.py_replace (' ', '');
						if (__in__ (']],', tmp)) {
							var py_arguments = tmp.py_split (']],');
							py_arguments [0] = py_arguments [0] + ']]';
						}
						else {
							var py_arguments = tmp.py_split (',');
						}
						for (var i = 0; i < len (py_arguments); i++) {
							print (py_arguments [i]);
							if (__in__ (py_arguments [i], self.local_storage)) {
								print ('argument found in local storage!');
								py_arguments [i] = self.local_storage.py_get (py_arguments [i]);
								print (py_arguments [i]);
							}
							else {
								py_arguments [i] = self.convert_format (py_arguments [i]);
							}
							print (py_arguments [i]);
						}
					}
					if (__in__ (function_name, self.function_list)) {
						if (len (py_arguments) == 1) {
							var result = getattr (simactBasic, function_name) (py_arguments [0]);
						}
						if (len (py_arguments) == 2) {
							var result = getattr (simactBasic, function_name) (py_arguments [0], py_arguments [1]);
						}
						if (len (py_arguments) == 3) {
							var result = getattr (simactBasic, function_name) (py_arguments [0], py_arguments [1], py_arguments [2]);
						}
						if (len (py_arguments) == 4) {
							var result = getattr (simactBasic, function_name) (py_arguments [0], py_arguments [1], py_arguments [2], py_arguments [3]);
						}
						if (len (py_arguments) == 5) {
							var result = getattr (simactBasic, function_name) (py_arguments [0], py_arguments [1], py_arguments [2], py_arguments [3], py_arguments [4]);
						}
					}
					else {
						print (('ERROR function ' + function_name) + ' unknown! See help functions');
					}
					print ('result: ');
					print (result);
				}
				self.local_storage [left_string] = result;
				print (self.local_storage);
				self.print_local_storage ();
			});}
		});
		var simactBasic = SimactBasic ();
		__pragma__ ('<use>' +
			'itertools' +
			'math' +
			'numscrypt' +
		'</use>')
		__pragma__ ('<all>')
			__all__.SimactBasic = SimactBasic;
			__all__.__name__ = __name__;
			__all__.acos = acos;
			__all__.acosh = acosh;
			__all__.asin = asin;
			__all__.asinh = asinh;
			__all__.atan = atan;
			__all__.atan2 = atan2;
			__all__.atanh = atanh;
			__all__.ceil = ceil;
			__all__.chain = chain;
			__all__.cos = cos;
			__all__.cosh = cosh;
			__all__.degrees = degrees;
			__all__.e = e;
			__all__.exp = exp;
			__all__.expm1 = expm1;
			__all__.floor = floor;
			__all__.hypot = hypot;
			__all__.inf = inf;
			__all__.isnan = isnan;
			__all__.log = log;
			__all__.log10 = log10;
			__all__.log1p = log1p;
			__all__.log2 = log2;
			__all__.nan = nan;
			__all__.pi = pi;
			__all__.pow = pow;
			__all__.radians = radians;
			__all__.simactBasic = simactBasic;
			__all__.sin = sin;
			__all__.sinh = sinh;
			__all__.sqrt = sqrt;
			__all__.tan = tan;
			__all__.tanh = tanh;
			__all__.trunc = trunc;
		__pragma__ ('</all>')
	}) ();
