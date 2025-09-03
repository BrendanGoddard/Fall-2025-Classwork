# 15.1.1 Using a class instance as a structure or record \

class Circle:
    def __init__(self):
        self.radius = 1

my_circle = Circle()
my_circle.radius = 5
print(2 * 3.14 * my_circle.radius)
# 31.4

my_circle = Circle()
print(2 * 3.14 * my_circle.radius)
# 6.28
my_circle.radius = 5
print(2 * 3.14 * my_circle.radius)
# 31.400000000000002

# 15.3 Methods

class Circle:
    def __init__(self):
        self.radius = 1
    def area(self):
        return self.radius * self.radius * 3.14159

c = Circle() 
c.radius = 3
print(c.area())
# 28.27431

print(Circle.area(c))
# 28.27431

class Circle:
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return self.radius * self.radius * 3.14159

# 15.4 Class variables

class Circle:
    pi = 3.14159
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return self.radius * self.radius * Circle.pi

print(Circle.pi)
# 3.14159
Circle.pi = 4
print(Circle.pi)
# 4
Circle.pi = 3.14159
print(Circle.pi)
# 3.14159

c = Circle(3)
print(c.area())
#28.27431

print(Circle)
# <class '__main__.Circle'>
print(c.__class__)
# <class '__main__.Circle'>

print(c.__class__.pi)
# 3.14159

# 15.4.1 An oddity with class variables

class Circle:
    pi = 3.14159
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return self.radius * self.radius * Circle.pi

c1 = Circle(1)
c2 = Circle(2)
c1.pi = 3.14 # attaches new instance variable to c1
print(c1.pi)
# 3.14
print(c2.pi) # original class variable
# 3.14159
print(Circle.pi)
# 3.14159

# 15.5.1 Static methods

import circle
c1 = circle.Circle(1)
c2 = circle.Circle(2)
print(circle.Circle.total_area())
# 15.70795
c2.radius = 3
print(circle.Circle.total_area())
# 31.415899999999997

print(circle.__doc__)
# 'circle module: contains the Circle class.'
print(circle.Circle.__doc__)
# 'Circle class'
print(circle.Circle.area.__doc__)
# 'determine the area of the Circle'

# 15.5.2 Class methods

import circle_cm
c1 = circle_cm.Circle(1)
c2 = circle_cm.Circle(2)
print(circle_cm.Circle.total_area())
# 15.70795
c2.radius = 3
print(circle_cm.Circle.total_area())
# 31.415899999999997

# 15.5.6 Inheritance

class Square:
    def __init__(self, side=1):
        self.side = side

class Square:
    def __init__(self, side=1, x=0, y=0):
        self.side = side
        self.x = x
        self.y = y
class Circle:
    def __init__(self, radius=1, x=0, y=0):
        self.radius = radius
        self.x = x
        self.y = y

class Shape:
    def __init__(self, x, y):
        self.x = x
        self.y = y
class Square(Shape):
    def __init__(self, side=1, x=0, y=0):
        super().__init__(x, y)
        self.side = side
class Circle(Shape):
    def __init__(self, r=1, x=0, y=0):
        super().__init__(x, y)
        self.radius = r

class Shape:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, delta_x, delta_y):
        self.x = self.x + delta_x
        self.y = self.y + delta_y

class Circle(Shape):
    def __init__(self, r=1, x=0, y=0):
        super().__init__(x, y)
        self.radius = r

c = Circle(1)
c.move(3, 4)
print(c.x)
# 3
print(c.y)
# 4

# 15.7 Inheritance with class and instance variables

class P:
    z = "Hello"
    def set_p(self):
        self.x = "Class P"
    def print_p(self):
         print(self.x)
class C(P):
    def set_c(self):
        self.x = "Class C"
    def print_c(self):
        print(self.x)

c = C()
c.set_p()
c.print_p()
# Class P
c.print_c()
# Class P
c.set_c()
c.print_c()
# Class C
c.print_p()
# Class C

print(c.z)
print(C.z)
print(P.z)
# 'Hello'
# 'Hello'
# 'Hello'

C.z = "Bonjour"
print(c.z)
print(C.z)
print(P.z)
# 'Bonjour'
# 'Bonjour'
# 'Hello'

c.z = "Ciao"
print(c.z)
print(C.z)
print(P.z)
# 'Ciao'
# 'Bonjour'
# 'Hello'

# 15.8 Recap

class Shape:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, delta_x, delta_y):
        self.x = self.x + delta_x
        self.y = self.y + delta_y

class Circle(Shape):
    pi = 3.14159
    all_circles = []
    def __init__(self, r=1, x=0, y=0):
        super().__init__(x, y)
        self.radius = r
        __class__.all_circles.append(self)
    @classmethod
    def total_area(cls):
        area = 0
        for circle in cls.all_circles:
            area += cls.circle_area(circle.radius)
        return area
    @staticmethod
    def circle_area(radius):
        return Circle.pi * radius * radius

c1 = Circle()
print(c1.radius, c1.x, c1.y)
# (1, 0, 0)

c2 = Circle(2, 1, 1)
print(c2.radius, c2.x, c2.y)
# (2, 1, 1)

c2.move(2, 2)
print(c2.radius, c2.x, c2.y)
# (2, 3, 3)

print(Circle.all_circles)
# [<__main__.Circle object at 0x7fa88835e9e8>, <__main__.Circle object at 0x7fa88835eb00>]
# [c1, c2]
# [<__main__.Circle object at 0x7fa88835e9e8>, <__main__.Circle object
# at 0x7fa88835eb00>]

print(Circle.total_area())
# 15.70795
print(c2.total_area())
# 15.70795

print(Circle.circle_area(c1.radius))
# 3.14159
print(c1.circle_area(c1.radius))
#3.14159

# 15.9 Private variables and private methods

class Mine:
    def __init__(self):
        self.x = 2
        self.__y = 3
    def print_y(self):
        print(self.__y)

m = Mine()

print(m.x)
# 2

# print(m.__y)
# Traceback (innermost last):
#   File "<stdin>", line 1, in ?
# AttributeError: 'Mine' object has no attribute '__y'

m.print_y()
# 3

print(dir(m))
# ['_Mine__y', 'x', ...]

# 15.10 Using @property for more flexible instance variables

class Temperature:
    def __init__(self):
        self._temp_fahr = 0
    @property
    def temp(self):
        return (self._temp_fahr - 32) * 5 / 9
    @temp.setter    
    def temp(self, new_temp):
        self._temp_fahr = new_temp * 9 / 5 + 32

t = Temperature()
print(t._temp_fahr)
# 0
print(t.temp)
# -17.77777777777778  

t.temp = 34
print(t._temp_fahr)
# 93.2    

t.temp
34.0

# 15.11 Scoping rules and namespaces for class instances

import cs
c = cs.C()
c.m()
# Access local, global and built-in namespaces directly
# local namespace: ['lv', 'p', 'self']
# parameter: p
# local variable: lv
# global namespace: ['C', 'mf', '__builtins__', '__file__', '__package__', 'mv', 'SC', '__name__', '__doc__']
# module variable: mv
# module function (can be used like a class method in other languages): mf()
# Access instance, class, and superclass namespaces through 'self'
# Instance namespace: ['_C__pcv', '_C__piv', '_C__pm', '_SC__pscv', '_SC__psiv', '_SC__spm', '__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'cv', 'iv', 'm', 'm2', 'scv', 'siv', 'sm']
# instance variable: self.xi
# private instance variable: self.__piv
# superclass instance variable: self.siv (but use SC.siv for assignment)
# Class namespace: ['_C__pcv', '_C__pm', '_SC__pscv', '_SC__spm', '__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'cv', 'm', 'm2', 'scv', 'sm']
# class variable: self.cv (but use C.cv for assignment)
# method: self.m2()
# class private variable: self.__pcv (but use C.__pcv for assignment)
# private method: self.__pm()
# Superclass namespace: ['_SC__pscv', '_SC__spm', '__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'scv', 'sm']
# superclass method: self.sm()
# superclass class variable: self.scv
