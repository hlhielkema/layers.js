
var states = {
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
}

function bindButtons()
{
    var buttons = document.querySelectorAll('.step-buttons .button');

    for (var i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        button.addEventListener('click', function() {

            updateActiveButton(button);

            var state = button.dataset.state;

            applyStates(states[state]);
        });
    }
}

function updateActiveButton(button) {
    var buttons = document.querySelectorAll('.step-buttons .button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] == button) {
            // Add the "active" class
            if (!buttons[i].classList.contains('active')) {
                buttons[i].classList.add('active')
            }
        }
        else {
            // Remove the "active" class
            if (buttons[i].classList.contains('active')) {
                buttons[i].classList.remove('active')
            }
        }
    }
}

function applyStates(states) {
    console.log('apply', states);

    var layers = document.querySelectorAll('.layers-container img');
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var layerId = layer.dataset.layer;

        if (states[layerId] === true) {
            // Add the "visible" class
            if (!layer.classList.contains('visible')) {
                layer.classList.add('visible')
            }
        }
        else {
            // Remove the "visible" class
            if (layer.classList.contains('visible')) {
                layer.classList.remove('visible')
            }   
        }

    }
}

applyStates(states.a);
bindButtons();