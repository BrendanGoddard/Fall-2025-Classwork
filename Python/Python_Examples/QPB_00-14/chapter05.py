# Lists like arrays

x = [2, "two", [1, 2, 3]]
print(len(x))
#3

# List indices

x = ["first", "second", "third", "fourth"]
print(x[0])
#'first'
print(x[2])
#'third'

a = x[-1]
print(a)
#'fourth'
print(x[-2])
#'third'

# Slices

x = ["first", "second", "third", "fourth"]    
print(x[1:-1])
#['second', 'third']
print(x[0:3])
#['first', 'second', 'third']
print(x[-2:-1])
#['third']

print(x[-1:2])
#[]

print(x[:3])
#['first', 'second', 'third']
print(x[2:])
#['third', 'fourth']

y = x[:]
y[0] = '1 st'
print(y)
#['1 st', 'second', 'third', 'fourth']
print(x)
#['first', 'second', 'third', 'fourth']

# Modifying Lists

x = [1, 2, 3, 4]
x[1] = "two"
print(x)
#[1, 'two', 3, 4]

x = [1, 2, 3, 4]
x[len(x):] = [5, 6, 7]                
print(x)
#[1, 2, 3, 4, 5, 6, 7]

x[:0] = [-1, 0]                       
print(x)
#[-1, 0, 1, 2, 3, 4, 5, 6, 7]

x[1:-1] = []                           
print(x)
#[-1, 7]

x = [1, 2, 3]
x.append("four")
print(x)
#[1, 2, 3, 'four']

x = [1, 2, 3, 4]
y = [5, 6, 7]
x.append(y)  
print(x)
#[1, 2, 3, 4, [5, 6, 7]]


x = [1, 2, 3, 4]
y = [5, 6, 7]
x.extend(y)  
print(x)
#[1, 2, 3, 4, 5, 6, 7]  

x = [1, 2, 3]
x.insert(2, "hello")
print(x)
#[1, 2, 'hello', 3]

x.insert(0, "start")
print(x)
#['start', 1, 2, 'hello', 3]

x = [1, 2, 3]
x.insert(-1, "hello")
print(x)
#[1, 2, 'hello', 3]

x = ['a', 2, 'c', 7, 9, 11]
del x[1]
print(x)
#['a', 'c', 7, 9, 11]

del x[:2]
print(x)
#[7, 9, 11]

x = [1, 2, 3, 4, 3, 5]
x.remove(3)
print(x)
#[1, 2, 4, 3, 5]

x.remove(3)
print(x)
#[1, 2, 4, 5]

#x.remove(3)
#Traceback (innermost last):
# File "<stdin>", line 1, in ?
#ValueError: list.remove(x): x not in list

x = [1, 3, 5, 6, 7]
x.reverse()
print(x)
#[7, 6, 5, 3, 1]

# Sorting Lists

x = [3, 8, 4, 0, 2, 1]
x.sort()
print(x)
#[0, 1, 2, 3, 4, 8]

x = [2, 4, 1, 3]
y = x[:]
y.sort()
print(y)
#[1, 2, 3, 4]
print(x)
#[2, 4, 1, 3]

x = ["Life", "Is", "Enchanting"]
x.sort()
print(x)
#['Enchanting', 'Is', 'Life']

x = [1, 2, 'hello', 3]
#x.sort()
#Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#TypeError: '<' not supported between instances of 'str' and 'int'

x = [[3, 5], [2, 9], [2, 3], [4, 1], [3, 2]]
x.sort()
print(x)
#[[2, 3], [2, 9], [3, 2], [3, 5], [4, 1]]

# Custom sorting

def compare_num_of_chars(string1):
    return len(string1)

word_list = ['Python', 'is', 'better', 'than', 'C']
word_list.sort()
print(word_list)
#['C', 'Python', 'better', 'is', 'than']
word_list = ['Python', 'is', 'better', 'than', 'C']
word_list.sort(key=compare_num_of_chars)
print(word_list)
#['C', 'is', 'than', 'Python', 'better']

# sorted() function

x = (4, 3, 1, 2)
y = sorted(x)
print(y)
#[1, 2, 3, 4] 
z = sorted(x, reverse=True)
print(z)
#[4, 3, 2, 1]

# in operator

print(3 in [1, 3, 4, 5])
#True
print(3 not in [1, 3, 4, 5])
#False
print(3 in ["one", "two", "three"])
#False
print(3 not in ["one", "two", "three"])
#True

# + operator

z = [1, 2, 3] + [4, 5]
print(z)
#[1, 2, 3, 4, 5]

# * operator

z = [None] * 4
print(z)
#[None, None, None, None]

z = [3, 1] * 2
print(z)
#[3, 1, 3, 1]

# min and max

print(min([3, 7, 0, -2, 11]))
#-2
#print(max([4, "Hello", [1, 2]]))
#Traceback (most recent call last):
#  File "<pyshell#58>", line 1, in <module>
#    max([4, "Hello",[1, 2]])
#TypeError: '>' not supported between instances of 'str' and 'int'

# search with index()

x = [1, 3, "five", 7, -2]
print(x.index(7))
#3
#x.index(5)
#Traceback (innermost last):
# File "<stdin>", line 1, in ?
#ValueError: 5 is not in list

# matches with count

x = [1, 2, 2, 3, 5, 2, 5]
print(x.count(2))
#3
print(x.count(5))
#2
print(x.count(4))
#0

# Nested lists and deep copies

m = [[0, 1, 2], [10, 11, 12], [20, 21, 22]]
print(m[0])
#[0, 1, 2]
print(m[0][1])
#1
print(m[2])
#[20, 21, 22]
print(m[2][2])
#22

nested = [0]
original = [nested, 1]
print(original)
#[[0], 1]

nested[0] = 'zero'
print(original)
#[['zero'], 1]
original[0][0] = 0
print(nested)
#[0]
print(original)
#[[0], 1]

nested = [2]
print(original)
#[[0], 1]

original = [[0], 1]
shallow = original[:]
print(shallow)
import copy
deep = copy.deepcopy(original)

shallow[1] = 2
print(shallow)
#[[0], 2]
print(original)
#[[0], 1]
shallow[0][0] = 'zero'
print(original)
#[['zero'], 1]

deep[0][0] = 5
print(deep)
#[[5], 1]
print(original)
#[['zero'], 1]

# Tuple basics

x = ('a', 'b', 'c')   
print(x[2])
#'c'
print(x[1:])
#('b', 'c')
print(len(x))
#3
print(max(x))
#'c'
print(min(x))
#'a'
print(5 in x)
#False
print(5 not in x)
#True

#x[2] = 'd'
#Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#TypeError: 'tuple' object does not support item assignment

print(x + x)
#('a', 'b', 'c', 'a', 'b', 'c')
print(2 * x)
#('a', 'b', 'c', 'a', 'b', 'c')

print(x[:])
#('a', 'b', 'c')
print(x * 1)
#('a', 'b', 'c')
print(x + ())
#('a', 'b', 'c')

# One-element tuples

x = 3
y = 4
print((x + y))   # This adds x and y.
#7
print((x + y,))  # Including a comma indicates the parentheses denote a tuple.
#(7,)
print(())        # To create an empty tuple, use an empty pair of parentheses.
()

# Tuple packing

(one, two, three, four) =  (1, 2, 3, 4)
print(one)
#1
print(two)
#2

one, two, three, four = 1, 2, 3, 4

x = (1, 2, 3, 4)
a, b, *c = x
print(a, b, c)
#(1, 2, [3, 4])
a, *b, c = x
print(a, b, c)
#(1, [2, 3], 4)
*a, b, c = x
print(a, b, c)
#([1, 2], 3, 4)
a, b, c, d, *e = x
print(a, b, c, d, e)
#(1, 2, 3, 4, [])

[a, b] = [1, 2]
[c, d] = 3, 4
[e, f] = (5, 6)
(g, h) = 7, 8
i, j = [9, 10]
k, l = (11, 12)
print(a)
#1
print([b, c, d])
#[2, 3, 4]
print((e, f, g))
#(5, 6, 7)
print(h, i, j, k, l)
#(8, 9, 10, 11, 12)

# Lists and Tuples

print(list((1, 2, 3, 4)))
#[1, 2, 3, 4]
print(tuple([1, 2, 3, 4]))
#(1, 2, 3, 4)

print(list("Hello"))
#['H', 'e', 'l', 'l', 'o']

# Set operations

x = set([1, 2, 3, 1, 3, 5])     
print(x)
#{1, 2, 3, 5}                       
x.add(6)      
print(x)
#{1, 2, 3, 5, 6}

x.remove(5)               
print(x)
#{1, 2, 3, 6}   
print(1 in x)       
#True
print(4 in x)
#False

y = set([1, 7, 8, 9])
print(x | y)                 
#{1, 2, 3, 6, 7, 8, 9}
print(x & y)                  
#{1}
print(x ^ y)              
#{2, 3, 6, 7, 8, 9}

# Frozensets

x = set([1, 2, 3, 1, 3, 5]) 
z = frozenset(x)
print(z)
frozenset({1, 2, 3, 5})

#z.add(6)
#Traceback (most recent call last):
#  File "<pyshell#79>", line 1, in <module>
#    z.add(6)
#AttributeError: 'frozenset' object has no attribute 'add'
x.add(z)
print(x)
#{1, 2, 3, 5, frozenset({1, 2, 3, 5})}


