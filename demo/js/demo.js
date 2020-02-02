
function bindButtons(buttonQuery, callback)
{
    var buttons = document.querySelectorAll(buttonQuery);
    for (var i = 0; i < buttons.length; i++) {
        let button = buttons[i];        
        button.addEventListener('click', function() {
            updateActiveButton(buttonQuery, button);
            var value = button.dataset.value;
            callback(value);            
        });
    }
}

function updateActiveButton(buttonQuery, button) {
    var buttons = document.querySelectorAll(buttonQuery);
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

var layersJs = new LayersJs('.layers-container');
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

bindButtons('.option-buttons.visible-layers .button', function(stateGroupName) {
    layersJs.applyStateGroup(stateGroupName);        
});

bindButtons('.option-buttons.animation-mode .button', function(animationMode) {
    layersJs.updateAnimationMode(animationMode)
});

layersJs.applyStateGroup('a');