
function bindButtons()
{
    var buttons = document.querySelectorAll('.step-buttons .button');

    for (var i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        button.addEventListener('click', function() {

            updateActiveButton(button);

            var stateGroupName = button.dataset.state;

            layersJs.applyStateGroup(stateGroupName);
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

bindButtons();

layersJs.applyStateGroup('a');