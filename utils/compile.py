import coffeescript
import execjs
import os
import sys
import getopt
from slimit import minify


def get_filenames(path):
  for path, dirs, files in os.walk(path):
    yield (path, files)

def compile_coffeescript(filename):
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
  for file_name in file_info[1]:
    compile_coffeescript(file_info[0] + "/" + file_name)

def compile_all_the_files(path):
  [compile_foldier_tuple(file_info) for file_info in get_filenames(path)]


def final_coffee_compile(filename):
  ccc = compile_coffeescript(filename)
  f = open('../debug/application.js', 'w')
  f.write(ccc)
  f.close()
  mccc = minify(ccc, mangle=True, mangle_toplevel=True)
  f = open('../release/application.js', 'w')
  f.write(mccc)
  f.close()
  
def main(argv):
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