#https://transcrypt.org/examples#plotly_demo
# Imports:
from org.transcrypt.stubs.browser import *
from org.transcrypt.stubs.browser import __main__, __envir__, __pragma__
from itertools import chain
from math import *

# Imports for Transcrypt, skipped runtime by CPython
if __envir__.executor_name == __envir__.transpiler_name:
	import numscrypt as num

# Imports for CPython, skipped compile time by Transcrypt
__pragma__ ('skip')
import numpy as num  # -> list of functions: https://transcrypt.org/numscrypt/docs/html/supported_constructs.html
__pragma__ ('noskip')


class SimactBasic():
    #global variables
    function_list = ['plot','linspace','add','dot','func']
    local_storage = {}

    def __init__(self):
        pass

    def convert_format(self, input_str):
        # interpret as nd Matrix array!
        print(input_str)
        if "[" in input_str:
            input_str = input_str.split("],[")
            for i in range(len(input_str)):
                input_str[i] = input_str[i].replace("[", "")
                input_str[i] = input_str[i].replace("]", "")
                input_str[i] = input_str[i].split(",")
            return(num.array(input_str,dtype=float))
        if input_str.isdigit():
            return float(input_str)
        if "'" in input_str:
            input_str=input_str.replace("'","")
        return str(input_str)

    def fixed_length_string(self,input_str,max_length):
        length = len(input_str)
        if(length>max_length):
            return input_str[:max_length-3]+"..."
        else:
            tmp = max_length-length
            tt=""
            for i in range(tmp):
                tt=tt+" "
            return input_str+tt

    def print_local_storage(self):
        output_text =self.fixed_length_string("Variable",12)+self.fixed_length_string("Content",18)+"\t"+"Dim"
        for key, value in self.local_storage.items(self):
            dim=((num.array(value).shape))
            out_str = str(value)
            out_str =out_str.replace("\n"," ")
            out_str = out_str.replace(" ","")
            out_str = out_str.replace("\t", "")
            out_str = out_str.replace("][", "],[")
            output_text=output_text+"\n"+self.fixed_length_string(str(key),12)+self.fixed_length_string(out_str,18)+"\t"+ dim
        document.getElementById('local_storage').value=(output_text)

    def dot(self, arg1, arg2): #working try it with: A=dot([[1,2],[3,4]],[[1,1],[0,1]])
        __pragma__('opov')
        return arg1@arg2
        __pragma__('noopov')

    def linspace(self, start, end, disk): #x=linspace(1,2,0.1)
        # start, end, disk float or real numbers!
        tmp = []
        for i in range(start,(end-start)/disk+2):
            tmp[i-1]=str(start+(i-1)*disk)
        return (num.array(tmp, dtype=float))

    def func(self, formula, x_vec): #x=linspace(0,10,0.1) -> y=func(2*x+sin(x),x)
        x_vec=x_vec.tolist()
        result = []
        for i in range(len(x_vec)):
            tmp = formula.replace('x',str(x_vec[i]))
            result[i]=eval(tmp)
        return num.array(result,dtype=float)

    def plot(self, y_values_in, x_values_in=self.linspace(-5,5,0.1), title="Output_Plot", xname="x", yname="y"):
        # x values, y_values should come in as ndarray -> convert them to list as plotly works with lists!
        __pragma__('jskeys')  # For convenience, allow JS style unquoted string literals as dictionary keys
        if "stringable" in str(type(y_values_in)):
            title="y="+str(y_values_in)
            y_values_in=self.func(y_values_in, x_values_in)
        x_values = x_values_in.tolist()
        y_values = y_values_in.tolist()
        kind = 'linear'
        Plotly.newPlot(
            kind,
                [
            {
                x: x_values,
                y: y_values,
            }
            #for yValues in y_values_list
                ],
                    {
                    title: title,
                    xaxis: {title: xname},
                    yaxis: {title: yname}
                    }
        )
        __pragma__('nojskeys')
        return num.vstack((x_values_in, y_values_in))

    def add(self, arg1, arg2):
        return(arg1+arg2)

    def parse_input(self):
        input_str = document.getElementById('input').value
        #print(input_str)

        # ist es eine Zuweisung? e.g: A=rank(B), A=[[1,0],[0,1]]
        if "=" in input_str:
            input_str = input_str.replace(" ","")
            index_gleich = input_str.find('=')
            left_string = input_str[:index_gleich]
            right_string = input_str[(index_gleich+1):]
            if "(" in right_string:
                function_name = right_string[:right_string.find("(")]
                tmp = right_string[right_string.find("(")+1:len(right_string)-1]
                tmp = tmp.replace(" ","")
                if "]]," in tmp:
                    arguments=tmp.split("]],")
                    arguments[0]=arguments[0]+"]]"
                else:
                    arguments = tmp.split(',')

                for i in range(len(arguments)):
                    print(arguments[i])
                    # replace arguments with local storage!
                    if arguments[i] in self.local_storage:
                        print("argument found in local storage!")
                        arguments[i]=self.local_storage.get(arguments[i])
                        print(arguments[i])
                    else:
                        arguments[i]=self.convert_format(arguments[i])
                    print(arguments[i])

            if function_name in self.function_list:
                #execute the function:
                if len(arguments) == 1:
                    result = getattr(simactBasic, function_name)(arguments[0])
                if len(arguments) == 2:
                    result = getattr(simactBasic, function_name)(arguments[0], arguments[1])
                if len(arguments) == 3:
                    result = getattr(simactBasic, function_name)(arguments[0], arguments[1], arguments[2])
                if len(arguments) == 4:
                    result = getattr(simactBasic, function_name)(arguments[0], arguments[1], arguments[2], arguments[3])
                if len(arguments) == 5:
                    result = getattr(simactBasic, function_name)(arguments[0], arguments[1], arguments[2],arguments[3], arguments[4])
            else:
                print("ERROR function "+function_name+" unknown! See help functions")

            print("result: ")
            print(result)


        self.local_storage[left_string]=result
        print(self.local_storage)

        self.print_local_storage()

        #data.clear()  # Clears entire dictionary
simactBasic = SimactBasic()
