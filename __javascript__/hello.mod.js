	(function () {
		var __name__ = '__main__';
		var chain = __init__ (__world__.itertools).chain;
		if (__envir__.executor_name == __envir__.transpiler_name) {
			var num =  __init__ (__world__.numscrypt);
		}
		var SimactBasic = __class__ ('SimactBasic', [object], {
			__module__: __name__,
			function_list: list (['function_1', 'name2', 'rank', 'add', 'dot']),
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
			get dot () {return __get__ (this, function (self, arg1, arg2) {
				print ('in function dot!');
				return __matmul__ (arg1, arg2);
			});},
			get function_2 () {return __get__ (this, function (self, arg1, arg2) {
				print (arg1 + arg2);
			});},
			get add () {return __get__ (this, function (self, arg1, arg2) {
				print (arg1 + arg2);
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
					}
					else {
						print (('ERROR function ' + function_name) + ' unknown! See help functions');
					}
					print ('result: ');
					print (result);
				}
				self.local_storage [left_string] = result;
				print (self.local_storage);
			});}
		});
		var simactBasic = SimactBasic ();
		__pragma__ ('<use>' +
			'itertools' +
			'numscrypt' +
		'</use>')
		__pragma__ ('<all>')
			__all__.SimactBasic = SimactBasic;
			__all__.__name__ = __name__;
			__all__.chain = chain;
			__all__.simactBasic = simactBasic;
		__pragma__ ('</all>')
	}) ();
