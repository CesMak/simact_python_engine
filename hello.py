# Imports:
from org.transcrypt.stubs.browser import *
from org.transcrypt.stubs.browser import __main__, __envir__, __pragma__
from itertools import chain

# Imports for Transcrypt, skipped runtime by CPython
if __envir__.executor_name == __envir__.transpiler_name:
	import numscrypt as num

# Imports for CPython, skipped compile time by Transcrypt
__pragma__ ('skip')
import numpy as num
__pragma__ ('noskip')


class SimactBasic():
    #global variables
    function_list = ['function_1','name2','rank','add','dot']
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
        return input_str

    def dot(self, arg1, arg2): #working try it with: A=dot([[1,2],[3,4]],[[1,1],[0,1]])
        print("in function dot!")
        __pragma__('opov')
        return arg1@arg2
        __pragma__('noopov')

    def function_2(self, arg1, arg2):
        print(arg1+arg2)

    def add(self, arg1, arg2):
        print(arg1+arg2)

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
            else:
                print("ERROR function "+function_name+" unknown! See help functions")

            print("result: ")
            print(result)


        self.local_storage[left_string]=result
        print(self.local_storage)

        #data.clear()  # Clears entire dictionary
simactBasic = SimactBasic()
