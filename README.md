# Layers.js
Layers.js

![screenshot](screenshot.png)

## Demo
[LIVE DEMO](https://hlhielkema.github.io/layers.js/)

## How to use

### Basics

#### HTML
Include the *stylesheet*, *script* and a *container `<div>`* for the layers:
``` html
<head>
    ...
    <link rel="stylesheet" href="lib/layers.css" />    
    ...
</head>
<body>
    ...
    <div class="layers-container animate-fade-up"></div>
    ...
    <script src="lib/layers.js"></script> 
    ...
</body>
```

#### JavaScript
Initialize layers.js from your own JavaScript using the code below. The other examples below assume that this code has already been added.
``` js
var layersJs = new LayersJs('.layers-container');
```

### Add an ``<img>`` layer
Adding an image layer is simple. Just call the `addImageLayer` function with an **unqiue layer id** and the **path to the image file**:

``` js
layersJs.addImageLayer('a', 'img/layer_a.svg');
```

### Create a simple `<div>` layer

``` js
layersJs.addDivLayers('b', {
    top: '64px',
    shape: {
        decorate: shape => shape.innerText = 'B',
        background: '#242f65',
        borderBackground: '#17264e'
    }
});
```

### Create a more advanced `<div>` layer

``` js
layersJs.addDivLayers('a', {    
    shape: [
        {
            class: 'quarter',
            decorate: shape => shape.innerText = 'A', 
            color: '#999',
            background: '#2b2c34',
            borderBackground: '#000' 
        },
        {
            class: 'quarter',
            decorate: shape => shape.innerHTML = '👽',            
            background: '#009688',
            borderBackground: '#035049' 
        },
        {
            class: 'half',
            decorate: shape => shape.innerText = 'Layers.js',            
            background: '#009688',
            borderBackground: '#035049' 
        }
    ]
});
```

### Layer visible/invisible state groups
Each layer can either be visible or invisible. State groups can be used to control the visible state of each layer. Each state group defines which layers should be visible(true) or invisible(false).

The example below shows how to define the state groups. This example defines the state groups `a`, `b`, `c`, `d` and `e`. Each of the groups has an unique combination of visible and invisible layers. E.g. state group `c` will show the layers `c` and `d` but will hide the layers `a` and `b`. These layer names refer to their id as defined in the functions: `addImageLayer([id], ...)` and `addDivLayers([id], ...)`.


``` js
layersJs.updateStateGroups({
    a: {
        a: true,
        b: true,
        c: true,
        d: true,
    },
    b: {
        a: false,
        b: true,
        c: true,
        d: true,
    },
    c: {
        a: false,
        b: false,
        c: true,
        d: true,
    },
    d: {
        a: false,
        b: false,
        c: false,
        d: true,
    },
    e: {
        a: true,
        b: false,
        c: true,
        d: true,
    },
});
```

Switch to a state group using the `layersJs.applyStateGroup([stateGroupName])` function:

``` js
layersJs.applyStateGroup('c');   
```

### Animation style

Layer.js supports multiple build-in animation styles. Use the `layersJs.updateAnimationMode([animationMode])` to switch between styles from code. You can also prefix the style name with `animation-` and add it as a class on the later container `<div>`.

``` js
layersJs.updateAnimationMode('fade-right');
```

The available animation styles are:

- `fade-down`
- `fade-right`
- `fade-up`
- `fade-left`
- `fade`
- `none`