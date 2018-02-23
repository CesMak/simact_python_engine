	(function () {
		var math = {};
		var __name__ = '__main__';
		var chain = __init__ (__world__.itertools).chain;
		__nest__ (math, '', __init__ (__world__.math));
		if (__envir__.executor_name == __envir__.transpiler_name) {
			var num =  __init__ (__world__.numscrypt);
		}
		var SimactBasic = __class__ ('SimactBasic', [object], {
			__module__: __name__,
			function_list: list (['plot', 'linspace', 'add', 'dot']),
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
				return input_str;
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
			get plot () {return __get__ (this, function (self, x_values_in, y_values_in, title, xname, yname) {
				if (typeof title == 'undefined' || (title != null && title .hasOwnProperty ("__kwargtrans__"))) {;
					var title = 'Output_Plot';
				};
				if (typeof xname == 'undefined' || (xname != null && xname .hasOwnProperty ("__kwargtrans__"))) {;
					var xname = 'x';
				};
				if (typeof yname == 'undefined' || (yname != null && yname .hasOwnProperty ("__kwargtrans__"))) {;
					var yname = 'y';
				};
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
			__all__.chain = chain;
			__all__.simactBasic = simactBasic;
		__pragma__ ('</all>')
	}) ();
