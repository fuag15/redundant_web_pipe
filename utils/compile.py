# -*- coding: utf-8 -*-
"""
    compile
    ~~~

    `compile` is a simple script to assist in compile web assets from nice lanuges into production form 
    without the use of large libraries or development environments
    
    :author: Michael Boone <fuag155555@gmail.com>
    :license: MIT.
"""
import coffeescript
import execjs
import os
import sys
import getopt
from slimit import minify


def get_filenames(path):
  """
  Generator that recurses sub directories and returns a tuple of the base path and an array of all file names within
  """
  for path, dirs, files in os.walk(path):
    yield (path, files)

def compile_coffeescript(filename):
  """
  Compiles the specified pathed filename into javascript and warns of errors gracefully
  """
  try:
    return coffeescript.compile_file(filename)
  except execjs.RuntimeError as e:
    print "{0}: {1}".format(filename, e.message)
    sys.exit(12)
  except execjs.RuntimeError as e:
    print "{0}: {1}".format(filename, e.message)
    print "Did you remember to leave an empty line at the end of a source file?"
    sys.exit(12)

def compile_foldier_tuple(file_info):
  """
  Feeds a tuple of (file path, [files in path]) to compile_coffeescript to be compiled
  """
  for file_name in file_info[1]:
    compile_coffeescript(file_info[0] + "/" + file_name)

def compile_all_the_files(path):
  """
  Runs through the specified path and compiles all files within from js to coffeescript
  """
  [compile_foldier_tuple(file_info) for file_info in get_filenames(path)]


def final_coffee_compile(filename):
  """
  Compiles the filename to debug/application.js and then minifies it to release/application.js
  """
  ccc = compile_coffeescript(filename)
  f = open('../debug/application.js', 'w')
  f.write(ccc)
  f.close()
  mccc = minify(ccc, mangle=True, mangle_toplevel=False)
  f = open('../release/application.js', 'w')
  f.write(mccc)
  f.close()
  
def main(argv):
  """
  Compiles code in ../src into coffeescript or if the -f flag is used instead it compiles only the specified 
  directory/filename and sets up production and debugging versions
  
  usage: [-f] -s <directory>
  
  where f is a flag for final and directory is an optional directory to use besides ../src
  """
  final_compile = False
  source = '../src'
  try:
    opts, args = getopt.getopt(argv, "hfs:")
  except getopt.GetoptError:
    print 'usage: compile.py [-f] -s <directory>'
  for opt, arg in opts:
    if opt == '-h':
      print 'usage: compile.py [-f] -s <directory>'
    elif opt == '-s':
      source = arg
    elif opt == '-f':
      final_compile = True
  if final_compile:
    final_coffee_compile(source)
  else:
    compile_all_the_files(source)

if __name__ == "__main__":
   main(sys.argv[1:])
