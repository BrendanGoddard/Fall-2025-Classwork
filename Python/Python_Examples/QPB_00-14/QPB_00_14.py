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
funct1(u, v, 2)
#15
funct1(u, z=v, y=2)      
#23

def funct2(x, y=1, z=1):        
    return x + 2 * y + z ** 2

funct2(3, z=4)
#21

def funct3(x, y=1, z=1, *tup):     
    print((x, y, z) + tup)

funct3(2)
#(2, 1, 1)

funct3(1, 2, 3, 4, 5, 6, 7, 8, 9)
#(1, 2, 3, 4, 5, 6, 7, 8, 9)

def funct4(x, y=1, z=1, **kwargs):  #6
    print(x, y, z, kwargs)

funct4(1, 2, m=5, n=9, z=3)
#1 2 3 {'n': 9, 'm': 5}

#Exceptions

class EmptyFileError(Exception):
    pass
filenames = ["myfile1","nonExistent", "emptyFile", "myfile2"]
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

