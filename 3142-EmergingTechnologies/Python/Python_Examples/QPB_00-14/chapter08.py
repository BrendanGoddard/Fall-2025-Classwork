# For loop

x = [1.0, 2.0, 3.0]
for n in x:
    print(1 / n)

# range function

x = [1, 3, -7, 4, 9, -5, 4]
for i in range(len(x)):
    if x[i] < 0:
        print("Found a negative number at index ", i)

print(list(range(3, 7)))
#[3, 4, 5, 6]

print(list(range(2, 10)))
#[2, 3, 4, 5, 6, 7, 8, 9]        

print(list(range(5, 3)))
#[]

print(list(range(0, 10, 2)))
#[0, 2, 4, 6, 8]

print(list(range(5, 0, -1)))
#[5, 4, 3, 2, 1]


# The for loop and tuple unpacking

somelist = [(1, 2), (3, 7), (9, 5)]
result = 0
for t in somelist:
    result = result + (t[0] * t[1])

somelist = [(1, 2), (3, 7), (9, 5)]
result = 0

for x, y in somelist:
    result = result + (x * y)

# enumerate function

x = [1, 3, -7, 4, 9, -5, 4]
for i, n in enumerate(x):
    if n < 0:
        print("Found a negative number at index ", i)

# zip function 

x = [1, 2, 3, 4]
y = ['a', 'b', 'c']
z = zip(x, y)
print(list(z))
#[(1, 'a'), (2, 'b'), (3, 'c')]

# List and dictionary comprehensions

x = [1, 2, 3, 4]
x_squared = []
for item in x:
    x_squared.append(item * item)

print(x_squared)
#[1, 4, 9, 16]

x = [1, 2, 3, 4]
x_squared = [item * item for item in x]
print(x_squared)
#[1, 4, 9, 16]

x = [1, 2, 3, 4]
x_squared = [item * item for item in x if item > 2]

print(x_squared)
#[9, 16]

x = [1, 2, 3, 4]
x_squared_dict = {item: item * item for item in x}
print(x_squared_dict)
#{1: 1, 2: 4, 3: 9, 4: 16}

# Generator Expressions

x = [1, 2, 3, 4]
x_squared = (item * item for item in x)
print(x_squared)
#<generator object <genexpr> at 0x102176708>
for square in x_squared:
    print(square,)

#1 4 9 16

# Statements, blocks, and indentation 

x = 1; y = 0; z = 0
if x > 0: y = 1; z = 10
else: y = -1

print(x, y, z)
#1 1 10

#  x = 1
#File "<stdin>", line 1
#    x = 1
#    ^
#   IndentationError: unexpected indent

x = 1
v = 1
if x == 1: 
   y = 2
   if v > 0:
      z = 2
      v = 0

x = 2

x = 1
#if x == 1:
#           y = 2
#        z = 2
#File "<stdin>", line 3
#       z = 2
#       ^
#    IndentationError: unindent does not match any outer indentation level

print('string1', 'string2', 'string3' \
   , 'string4', 'string5')
#string1 string2 string3 string4 string5

x = 100 + 200 + 300 \
   + 400 + 500
print(x)
#1500

v = [100, 300, 500, 700, 900,
   1100, 1300]
print(v)
#[100, 300, 500, 700, 900, 1100, 1300]

print(max(1000, 300, 500,
       800, 1200))
#1200

x = (100 + 200 + 300
         + 400 + 500)
print(x)
#1500

print("strings separated by whitespace "    \
   """are automatically"""  ' concatenated')
#'strings separated by whitespace are automatically concatenated'

x = 1
if x > 0:
       string1 = "this string broken by a backslash will end up \
               with the indentation tabs in it"

print(string1)
#'this string broken by a backslash will end up \t\t\twith
#     the indentation tabs in it'

if x > 0:
       string1 = "this can be easily avoided by splitting the " \
           "string in this way"
       
print(string1)
#'this can be easily avoided by splitting the string in this way'

# Comparison and Boolean operators

print([2] and [3, 4])
#[3, 4]
print([] and 5)
#[]
print([2] or [3, 4])
#[2]
print([] or 5)
#5

x = [0]
y = [x, 1]
print(x is y[0])
#True
x = [0]
print(x is y[0])
#False
print(x == y[0])
#True
