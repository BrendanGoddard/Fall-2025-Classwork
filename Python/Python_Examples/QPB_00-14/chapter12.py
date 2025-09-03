# 12.2.2 The current working directory

import os
os.getcwd()
print(os.curdir)
print(os.listdir(os.curdir))

folder_name = 'c:\data'
os.chdir(folder_name)
print(os.getcwd())

#12.2.3 Accessing directories with pathlib

import pathlib
cur_path = pathlib.Path()
print(cur_path)
print(cur_path.cwd())
#PosixPath('/home/naomi')

#12.2.4 Manipulating pathnames

import os
print(os.path.join('bin', 'utils', 'disktools'))
#bin\utils\disktools

import os
print(os.path.join('bin', 'utils', 'disktools'))
#bin/utils/disktools

import os
print(os.path.join('mydir\\bin', 'utils\\disktools\\chkdisk'))
#mydir\bin\utils\disktools\chkdisk

path1 = os.path.join('mydir', 'bin'); 
path2 = os.path.join('utils', 'disktools', 'chkdisk')
print(os.path.join(path1, path2))
#mydir\bin\utils\disktools\chkdisk

import os
print(os.path.basename(os.path.join('some', 'directory', 'path.jpg')))
#'path.jpg'
print(os.path.dirname(os.path.join('some', 'directory', 'path.jpg')))
#'some\\directory'

print(os.path.splitext(os.path.join('some', 'directory', 'path.jpg')))
#('some/directory/path', '.jpg')

import os
print(os.path.expandvars('$HOME\\temp'))
#'C:\\Users\\administrator\\personal\\temp'

#12.2.5 Manipulating pathnames with pathlib

from pathlib import Path
cur_path = Path()
print(cur_path.joinpath('bin', 'utils', 'disktools'))
#bin\utils\disktools

print(cur_path / 'bin' / 'utils' / 'disktools')
#WindowsPath('bin/utils/disktools')

cur_path = Path()
print(cur_path.joinpath('bin', 'utils', 'disktools'))
#bin/utils/disktools

#a_path = WindowsPath('bin/utils/disktools')
#print(a_path.parts)
#('bin', 'utils', 'disktools')

a_path = Path('some', 'directory', 'path.jpg')
print(a_path.name)
#'path.jpg'

print(a_path.parent)
#some\directory

print(a_path.suffix)
#'.jpg'

#12.2.6 Useful constants and functions

import os
print(os.name)
#'nt'

import os
if os.name == 'posix':
    root_dir = "/"
elif os.name == 'nt':
    root_dir = "C:\\"
else:
    print("Don't understand this operating system!")

#12.3. Getting information about files

import os
print(os.path.exists('C:\\Work2\\myuser\\My Documents'))
#True

print(os.path.exists('C:\\Work2\\myuser\\My Documents\\Letter.docx'))
#True

print(os.path.exists('C:\\Work2\\myuser\\My Documents\\ljsljkflkjs'))
#False

print(os.path.isdir('C:\\Work2\\myuser\\My Documents'))
#True

print(os.path.isfile('C:\\Work2\\myuser\\My Documents'))
#False

print(os.path.isdir('C:\\Work2\\myuser\\My Documents\\Letter.docx'))
#False

print(os.path.isfile('C:\\Work2\\myuser\\My Documents\\Letter.docx'))
#True

print(os.path.isdir('C:\\data'))
#True

print(os.path.isfile('C:\\data\wiki300d1M.vec'))
#True

#12.3.1 Getting information about files with scandir

# with os.scandir(".") as my_dir:
#      for entry in my_dir:
#          print(entry.name, entry.is_file())
 
#pip-selfcheck.json True
#pyvenv.cfg True
#include False
#test.py True
#lib False
#lib64 False
#bin False

#12.4 More filesystem operations

#os.chdir(os.path.join('C:', 'my documents', 'tmp'))
#os.listdir(os.curdir)
#['book1.doc.tmp', 'a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp']

# import glob
# print(glob.glob("*"))
#['book1.doc.tmp', 'a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp']

# print(glob.glob("*bkp"))
#['registry.bkp']

# print(glob.glob("?.tmp"))
#['a.tmp', '1.tmp', '7.tmp', '9.tmp']

# print(glob.glob("[0-9].tmp"))
#['1.tmp', '7.tmp', '9.tmp']

# os.rename('registry.bkp', 'registry.bkp.old')
# os.listdir(os.curdir)
#['book1.doc.tmp', 'a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp.old']

# os.remove('book1.doc.tmp')
# os.listdir(os.curdir)
# ['a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp.old']

# os.makedirs('mydir')
# os.listdir(os.curdir)
#['mydir', 'a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp.old']

# os.path.isdir('mydir')
#True

# os.rmdir('mydir')
# os.listdir(os.curdir)
#['a.tmp', '1.tmp', '7.tmp', '9.tmp', 'registry.bkp.old']

#12.4.1 More filesystem operations with pathlib

# new_path = cur_path.joinpath('C:', 'my documents', 'tmp')
# list(new_path.iterdir())
#[WindowsPath('book1.doc.tmp'), WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp')]

# list(cur_path.glob("*"))
#[WindowsPath('book1.doc.tmp'), WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp')]

# list(cur_path.glob("*bkp"))
#[WindowsPath('registry.bkp')]

# list(cur_path.glob("?.tmp"))
#[WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp')]

# list(cur_path.glob("[0-9].tmp"))
#[WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp')]

# old_path = Path('registry.bkp')
# new_path = Path('registry.bkp.old')
# old_path.rename(new_path)
# list(cur_path.iterdir())
#[WindowsPath('book1.doc.tmp'), WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp.old')]

# new_path = Path('book1.doc.tmp')
# new_path.unlink()
# list(cur_path.iterdir())
#[WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp.old')]

# new_path = Path ('mydir')
# new_path.mkdir(parents=True)
# list(cur_path.iterdir())
#[WindowsPath('mydir'), WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp.old')]]

# new_path.is_dir('mydir')
#True

# new_path = Path('mydir')
# new_path.rmdir()
# list(cur_path.iterdir())
#[WindowsPath('a.tmp'), WindowsPath('1.tmp'), WindowsPath('7.tmp'), WindowsPath('9.tmp'), WindowsPath('registry.bkp.old']

#12.5 Processing all files in a directory tree

# import os
# for root, dirs, files in os.walk(os.curdir):
#     print("{0} has {1} files".format(root, len(files)))
#     if ".git" in dirs:
#         dirs.remove(".git")

