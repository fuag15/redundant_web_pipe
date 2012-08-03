## Dependencies

### Pre-Installled Dependencies

  * Coffeescript-Python - http://github.com/doloopwhile/Python-CoffeeScript
    $ pip install coffeescript
  * Slimit python native javascript minifier - http://github.com/rspivak/slimit/
    $ pip install slimit
    
### Required Dependencies (to be resolved by pip):
  * PyExecJS - http://pypi.python.org/pypi/PyExecJS

    $ pip install PyExecJS
  * PyV8 - http://code.google.com/p/pyv8/

    $ pip install PyV8

### How to Build

This will place a debug version in debug and a release version in 
release or warn you of any compile errors, look at example for 
suggested folder hierarchy.

```bash

$ git clone https://github.com/mvanveen/redundant_web_pipe.git

Cloning into 'redundant_web_pipe'...
remote: Counting objects: 93, done.
remote: Compressing objects: 100% (51/51), done.
remote: Total 93 (delta 27), reused 93 (delta 27)
Unpacking objects: 100% (93/93), done.

$ cd redundant_web_pipe
$ make

```

NOTE: The code in here in coffeescript was not written by me, I 
modified the sunburst example from [here](https://github.com/mbostock/d3), 
however I didn't get into modifying any of the structure just converted it over.

Autogen'd page can be found: http://fuag15.github.com/redundant_web_pipe/
Working converted example from d3 can be found: http://fuag15.github.com/redundant_web_pipe/example/sunburst.html

Begginings of a simple asset pipeline script for who enjoy:
  * Seperation of code into files based on function, area, or "class"
  * The benefits of coffee script
  * The benefits of 

And those who do not want to rely on:
  * Node.js
  * Rails
  * Pylon
  * Django
  * etc
  * . . .

Do enjoy such things :)

Right now it has very basic functionality, plan to add sass support in the future, maybe haml but thats another beast for planning how to integrate them. This example is flush with 1000 foldiers for something fairly simple those could definitely be reduced.
