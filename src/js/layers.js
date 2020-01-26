// Layers.js

// constructor: LayersJs
function LayersJs(containerSelector) {
    this.containerSelector = containerSelector;
    this.stateGroups = null;
}

// Apply the states to a set of layers
LayersJs.prototype.applyStates = function(states) {
    // Query the layers
    // Layers can be <img> or <div.layer>
    var layers = document.querySelectorAll(this.containerSelector + '> img, ' + this.containerSelector + '> .layer');

    // Loop through the layers
    for (var i = 0; i < layers.length; i++) {

        // Get the layer id from the "data-layer" attribute.
        var layerId = layers[i].dataset.layer;

        // Determine if the layer should be visible
        var visible = states[layerId] === true;

        // Update the visible state for the layer
        this.updateClass(layers[i], 'visible', visible);
    }
};

// Update if a class is in the class list of an element.
LayersJs.prototype.updateClass = function(element, className, enabled) {
    if (enabled) {
        // Add the class
        if (!element.classList.contains(className)) {
            element.classList.add(className)
        }
    }
    else {
        // Remove the class
        if (element.classList.contains(className)) {
            element.classList.remove(className)
        }   
    }
};

// Update the state groups
LayersJs.prototype.updateStateGroups = function (stateGroups) {
    this.stateGroups = stateGroups;
}

// Update the states of a state group
LayersJs.prototype.applyStateGroup = function (stateGroupName) {
    // Retrieve the states for the state group name
    var states = this.stateGroups[stateGroupName];
    if (states === undefined) {
        throw '[Layers.js] State group with name \"' + stateGroupName + '\" is not found.';
    }        

    // Apply the states
    this.applyStates(states);
}