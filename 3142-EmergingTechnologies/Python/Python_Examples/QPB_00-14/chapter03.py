# Numbers

x = 5 + 2 - 3 * 2    
print(x)
print(5 / 2)
print(5 // 2)
print(5 % 2)
print(2 ** 8)
print(1000000001 ** 3)

x = 4.3 ** 2.4
print(x)
print(3.5e30 * 2.77e45)   
print(1000000001.0 ** 3) 

#(3+2j) ** (2+3j)
#(0.6817665190890336-2.1207457766159625j)
#x = (3+2j) * (4+9j)
#x                               
#(-6+35j)
#x.real 
#-6.0
#x.imag 
#35.0

print(round(3.49))       
import math
print(math.ceil(3.49))  

#Booleans

x = False
print(x)
print(not x)
y = True * 2    
print(y)

#Lists

x = ["first", "second", "third", "fourth"]
print(x[0])                    
print(x[2])                   
print(x[-1])                
print(x[-2])              
print(x[1:-1])             
print(x[0:3])                    
print(x[-2:-1])                  
print(x[:3])                     
print(x[-2:])                    

x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
x[1] = "two"
x[8:9] = []
print(x)
x[5:7] = [6.0, 6.5, 7.0]          
print(x)
print(x[5:]) 

x = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(len(x))
print([-1, 0] + x)                     
#[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
x.reverse()                    
print(x)
#[9, 8, 7, 6, 5, 4, 3, 2, 1]

#Tuples

x = [1, 2, 3, 4]
print(tuple(x))
#(1, 2, 3, 4)

x = (1, 2, 3, 4)
print(list(x))
#[1, 2, 3, 4]

#Strings

x = "live and     let \t   \tlive"
print(x.split())
#['live', 'and', 'let', 'live']
print(x.replace("    let \t   \tlive", "enjoy life"))
#'live and enjoy life'
import re                         
regexpr = re.compile(r"[\t ]+")
print(regexpr.sub(" ", x))
#'live and let live'

e = 2.718
x = [1, "two", 3, 4.0, ["a", "b"], (5, 6)]
print("The constant e is:", e, "and the list x is:", x)
#The constant e is: 2.718 and the list x is: [1, 'two', 3, 4.0, ['a', 'b'], (5, 6)]

print("the value of %s is: %.2f" % ("e", e))    
#the value of e is: 2.72

#Dictionaries

x = {1: "one", 2: "two"}
x["first"] = "one"     
x[("Delorme", "Ryan", 1995)] = (1, 2, 3)   
print(list(x.keys()))
#['first', 2, 1, ('Delorme', 'Ryan', 1995)]
print(x[1])
#'one'
print(x.get(1, "not available"))
#'one'
print(x.get(4, "not available"))         
#'not available'

#Sets

x = set([1, 2, 3, 1, 3, 5])   
print(x)
#{1, 2, 3, 5}    
print(1 in x)                       
#True
print(4 in x)                
#False

#File Objects

f = open("myfile", "w")                      
result = f.write("First line with necessary newline character\n")
print(result)
#44
result = f.write("Second line to write to the file\n")
print(result)
#33
f.close()

f = open("myfile", "r")            
line1 = f.readline()
line2 = f.readline()
f.close()
print(line1, line2)
#First line with necessary newline character
#Second line to write to the file
import os                                   
print(os.getcwd())
#c:\My Documents\test
# note the bug in the book code for this environment
# need to have the double slash following c: as in c:\\
print(os.path.join("c:\\", "My Documents", "Images"))
os.chdir(os.path.join("c:\\", "My Documents", "Images"))    
filename = os.path.join("c:\\", "My Documents", "test", "myfile")                                  
print(filename)
#c:\My Documents\test\myfile
f = open(filename, "r")
print(f.readline())
#First line with necessary newline character
f.close()

#If-elif-else

x = 5
if x < 5:
    y = -1
    z = 5
elif x > 5:    
    y = 1      
    z = 11     
else:
    y = 0      
    z = 10     
print(x, y, z)

#While

u, v, x, y = 0, 0, 100, 30     
while x > y:            
    u = u + y           
    x = x - y            
    if x < y + 2:       
        v = v + x       
        x = 0           
    else:               
        v = v + y + 2   
        x = x - y - 2   
print(u, v)

#For

item_list = [3, "string1", 23, 14.0, "string2", 49, 64, 70]
for x in item_list:                         
    if not isinstance(x, int):
        continue                 
    if not x % 7:
        print("found an integer divisible by seven: %d" % x)
        break

#Functions

def funct1(x, y, z):          
    value = x + 2*y + z**2
    if value > 0:
        return x + 2*y + z**2    
    else:
        return 0 

u, v = 3, 4
print(funct1(u, v, 2))
#15
print(funct1(u, z=v, y=2))      
#23
def funct2(x, y=1, z=1):        
    return x + 2 * y + z ** 2

print(funct2(3, z=4))
#21
def funct3(x, y=1, z=1, *tup):     
    print((x, y, z) + tup)

print(funct3(2))
#(2, 1, 1)
print(funct3(1, 2, 3, 4, 5, 6, 7, 8, 9))
#(1, 2, 3, 4, 5, 6, 7, 8, 9)

def funct4(x, y=1, z=1, **kwargs):  #6
    print(x, y, z, kwargs)

funct4(1, 2, m=5, n=9, z=3)
#1 2 3 {'n': 9, 'm': 5}

#Exceptions

class EmptyFileError(Exception):
    pass
filenames = ["myfile1", "nonExistent", "emptyFile", "myfile2"]
for file in filenames:
    try:
        f = open(file,'r')
        line = f.readline()
        if line == "":
            f.close()
            raise EmptyFileError("%s: is empty" % (file))
    except IOError as error:
        print("%s: could not be opened: %s" % (file, error.strerror))
    except EmptyFileError as error:
        print(error)
    else:
        print("%s: %s" % (file, f.readline())) 
    finally:
        print("Done processing", file)

#Context handling using the with keyword

filename = "myfile.txt"
with open(filename, "r") as f:
    for line in f:
        print(f)

filename = "myfile.txt"
try:
    f = open(filename, "r")
    for line in f:
        print(f)
except Exception as e:
    raise e
finally:
    f.close()

#Object-oriented programming

import sh
c1 = sh.Circle()           
c2 = sh.Circle(5, 15, 20)
print(c1)
#Circle of radius 1 at coordinates (0, 0)
print(c2)                           
#Circle of radius 5 at coordinates (15, 20)
c2.area()
78.539749999999998
c2.move(5,6)                 
print(c2)
#Circle of radius 5 at coordinates (20, 26)

import turtle
x=turtle.Turtle()

def square(angle):
    x.forward(100)
    x.right(angle)
    x.forward(100)
    x.right(angle)
    x.forward(100)
    x.right(angle)
    x.forward(100)
    x.right(angle+10)

for i in range(36):
    square(90)