### Overview

Beginnings of a simple asset pipeline script for those who enjoy:

  * Seperation of code into files based on function, area, or "class"
  * The benefits of coffee script
  * Taking advantage of data attributes to play nicely with ajaxian sites

And those who do not want to rely on:

  * Node.js
  * Rails
  * Pylon
  * Django
  * etc
 
Working converted example from d3 can be found [here](http://fuag15.github.com/redundant_web_pipe/example/sunburst.html).  
And the main chunk of source can be found [here](http://github.com/fuag15/redundant_web_pipe/blob/master/src/sunburst/sunburst.js.coffee)

Do enjoy such things :)

**Please Note:** *The javascript source code used to derive the example in this project is not original. 
It was modified from the sunburst example from [here](https://github.com/mbostock/d3); 
The layout and logic flow of the code has been modified to fit my preffered javascript layout in general but much of the origonal logic flow is still unmodified.*

### Roadmap

Right now it has very basic functionality, plan to add sass support in the future, 
maybe haml but thats another beast for planning how to integrate them.

This example is flush with 1000 foldiers for something fairly simple those could definitely be reduced.

### Install

make will compile any script in src, place a debug version in debug and a release version in 
release or warn you of any compile errors. look at example for suggested folder hierarchy.

```bash

$ git clone https://github.com/fuag15/redundant_web_pipe.git
$ cd redundant_web_pipe
$ make install
$ make
$ make serve

```

then click [here](http://localhost:8888/sunburst.html)

### Dependencies Installed by Script

  * Coffeescript-Python - http://github.com/doloopwhile/Python-CoffeeScript
  * Slimit python native javascript minifier - http://github.com/rspivak/slimit/

```bash
$ pip install coffeescript
$ pip install slimit
``` 
