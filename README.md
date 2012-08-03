Beginnings of a simple asset pipeline script for those who enjoy:

  * Seperation of code into files based on function, area, or "class"
  * The benefits of coffee script

And those who do not want to rely on:

  * Node.js
  * Rails
  * Pylon
  * Django
  * etc
 
**Please Note:** *The coffeescript source code in this project is not original. 
It was modified the sunburst example from [here](https://github.com/mbostock/d3); 
however, the original author didn't get into modifying any of the structure 
and just converted it over.  Working converted example from d3 can be found [here](http://fuag15.github.com/redundant_web_pipe/example/sunburst.html).  Do enjoy such things :)*

### Roadmap

Right now it has very basic functionality, plan to add sass support in the future, 
maybe haml but thats another beast for planning how to integrate them.

This example is flush with 1000 foldiers for something fairly simple those could definitely be reduced.

### Install

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
$ make install

```

### Dependencies Installed by Script

  * Coffeescript-Python - http://github.com/doloopwhile/Python-CoffeeScript
  * Slimit python native javascript minifier - http://github.com/rspivak/slimit/

```bash
$ pip install coffeescript
$ pip install slimit
``` 
