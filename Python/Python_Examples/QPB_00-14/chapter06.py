# Strings
# chapter 6

x = "Hello"
print(x[0])
#'H'

print(x[-1])
#'o'

print(x[1:])
#'ello'

x = "Goodbye\n"
x = x[:-1]
print(x)
#'Goodbye'

print(len("Goodbye"))
#7

# Basic String operations

x = "Hello " + "World"
print(x)
#'Hello World'

print(8 * "x")
#'xxxxxxxx'

# Numeric and Unicode escapes

print('m')
#'m'

print('\155')
#'m'

print('\x6D')
#'m'

print('\n')
#'\n'

print('\012')
#'\n'

print('\x0A')
#'\n'

unicode_a = '\N{LATIN SMALL LETTER A}'      
print(unicode_a)
#'a'                                            

unicode_a_with_acute = '\N{LATIN SMALL LETTER A WITH ACUTE}'      
print(unicode_a_with_acute)
#'á'

print("\u00E1")                                   
#'á'

# Printing vs evaluating

print('a\n\tb')
#a
#    b

print("abc\n")
#abc

print("abc\n", end="")           
#abc

# split and join string methods

print(" ".join(["join", "puts", "spaces", "between", "elements"]))
#'join puts spaces between elements'

print("::".join(["Separated", "with", "colons"]))
#'Separated::with::colons'

print("".join(["Separated", "by", "nothing"]))
#'Separatedbynothing'

x = "You\t\t can have tabs\t\n \t and newlines \n\n mixed in"
print(x.split())
#['You', 'can', 'have', 'tabs', 'and', 'newlines', 'mixed', 'in']

x = "Mississippi"
print(x.split("ss"))
#['Mi', 'i', 'ippi']

x = 'a b c d'
print(x.split(' ', 1))
#['a', 'b c d']

print(x.split(' ', 2))
#['a', 'b', 'c d']

print(x.split(' ', 9))
#['a', 'b', 'c', 'd']

# Converting strings to numbers

print(float('123.456'))
#123.456

print(float('123.056'))

#print(float('xxyy')) 
#Traceback (innermost last):
# File "<stdin>", line 1, in ?
#ValueError: could not convert string to float: 'xxyy'

print(int('3333'))
#3333

#print(int('123.456'))                       
#Traceback (innermost last):
# File "<stdin>", line 1, in ?
#ValueError: invalid literal for int() with base 10: '123.456'

print(int('10000', 8))                   
#4096

print(int('101', 2))
#5

print(int('ff', 16))
#255

#print(int('123456', 6))              
#Traceback (innermost last):
# File "<stdin>", line 1, in ?
#ValueError: invalid literal for int() with base 6: '123456'

# Extra whitespace

x = "  Hello,    World\t\t "
print(x.strip())
#'Hello,    World'

print(x.lstrip())
#'Hello,    World\t\t '

print(x.rstrip())
#'  Hello,    World'

import string
print(string.whitespace)
#' \t\n\r\x0b\x0c'
#" \t\n\r\v\f"
#' \t\n\r\x0b\x0c'

x = "www.python.org"
print(x.strip("w"))
#'.python.org'

print(x.strip("gor"))
#'www.python.'

print(x.strip(".gorw"))
#'python'

# String searching

x = "Mississippi"
print(x.find("ss"))
#2

print(x.find("zz"))
#-1

x = "Mississippi"
print(x.find("ss", 3))
#5

print(x.find("ss", 0, 3))
#-1

x = "Mississippi"
print(x.rfind("ss"))
#5

x = "Mississippi"
print(x.count("ss"))
#2

x = "Mississippi"
print(x.startswith("Miss"))
#True

print(x.startswith("Mist"))
#False

print(x.endswith("pi"))
#True

print(x.endswith("p"))
#False

print(x.endswith(("i", "u")))
#True

# Modifying strings

x = "Mississippi"
print(x.replace("ss", "+++"))
#'Mi+++i+++ippi'

x = "~x ^ (y % z)"
table = x.maketrans("~^()", "!&[]")
print(x.translate(table))
#'!x & [y % z]'

# Modifying strings with list manipulations

text = "Hello, World"
wordList = list(text)
wordList[6:] = []
wordList.reverse()
text = "".join(wordList)      
print(text)
#,olleH

# Userful methods

x = "123"
print(x.isdigit())
#True

print(x.isalpha())
#False

x = "M"
print(x.islower())
#False

print(x.isupper())
#True

# Objects to strings

print(repr([1, 2, 3]))
#'[1, 2, 3]'

x = [1]
x.append(2)
x.append([3, 4])
print('the list x is ' + repr(x))
#'the list x is [1, 2, [3, 4]]'

# format method

print("{0} is the {1} of {2}".format("Ambrosia", "food", "the gods"))
#'Ambrosia is the food of the gods'

print("{{Ambrosia}} is the {0} of {1}".format("food", "the gods"))
#'{Ambrosia} is the food of the gods'

# format method, named params

print("{food} is the food of {user}".format(food="Ambrosia", user="the gods"))
#'Ambrosia is the food of the gods'

print("{0} is the food of {user[1]}".format("Ambrosia", user=["men", "the gods", "others"])) 
#'Ambrosia is the food of the gods'

# format specifiers

print("{0:10} is the food of gods".format("Ambrosia"))
#'Ambrosia   is the food of gods'

print("{0:{1}} is the food of gods".format("Ambrosia", 10))
#'Ambrosia   is the food of gods'

print("{food:{width}} is the food of gods".format(food="Ambrosia", width=10))
#'Ambrosia   is the food of gods'

print("{0:>10} is the food of gods".format("Ambrosia"))
#'  Ambrosia is the food of gods'

print("{0:&>10} is the food of gods".format("Ambrosia"))
#'&&Ambrosia is the food of gods'

# Formatting strings with %

print("%s is the %s of %s" % ("Ambrosia", "food", "the gods"))
#'Ambrosia is the food of the gods'

print("%s is the %s of %s" % ("Nectar", "drink", "gods"))
#'Nectar is the drink of gods'

print("%s is the %s of the %s" % ("Brussels Sprouts", "food", "foolish"))
#'Brussels Sprouts is the food of the foolish'

x = [1, 2, "three"]
print("The %s contains: %s" % ("list", x))
#"The list contains: [1, 2, 'three']"

# Formatting sequences

print("Pi is <%-6.2f>" % 3.14159) # use of the formatting sequence: %–6.2f
#'Pi is <3.14  >'

# Named params and Formatting sequences

num_dict = {'e': 2.718, 'pi': 3.14159}
print("%(pi).2f - %(pi).4f - %(e).2f" % num_dict)
#3.14 - 3.1416 - 2.72

#String interpolation

value = 42
message = f"The answer is {value}"
print(message)
#The answer is 42

pi = 3.1415
print(f"pi is {pi:{10}.{2}}")
#pi is        3.1

# Bytes

unicode_a_with_acute = '\N{LATIN SMALL LETTER A WITH ACUTE}'
print(unicode_a_with_acute)
#'á'

xb = unicode_a_with_acute.encode()
print(xb)
#b'\xc3\xa1'

#xb += 'A'
#Traceback (most recent call last):
#  File "<pyshell#35>", line 1, in <module>
#    xb += 'A'
#TypeError: can't concat str to bytes

print(xb.decode())
#'á'


