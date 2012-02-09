const BYTE_TO_MEGABYTE = 1/1048576;

const GARBAGE_COLLECTOR_DURATION_WARNING = 100;

const TEMPLATE_MAP = { resident: 'Resident: <span id="resident"></span>MB',
                       gc: 'GCD: <span id="gc_duration"></span>ms (<span id="gc_age"></span>)',
                       cc: 'CCD: <span id="cc_duration"></span>ms (<span id="cc_age"></span>)'
};

var cache = {};

function hide_init() {
  document.getElementById("init").style.display = "none";
}

// Injects HTML code based on the activated configurables
function templify(activated) {
  var content = document.getElementById("data");
  content.innerHTML = '';
  for (var i = 0; i < activated.length; i += 1) {
    var element = activated[i];
    var html = document.createElement("p");
    html.innerHTML = TEMPLATE_MAP[element];
    content.appendChild(html);
  }
}

function update(data) {
  templify(data.activated);
  for (var i = 0; i < data.activated.length; i += 1) {
    element = data.activated[i];
    data[element] = data[element] || cache[element];
    cache[element] = data[element];
    if (typeof(data[element]) == 'undefined') {
      return;
    }
    else if (typeof(data[element]) != 'object') {
      document.getElementById(element).textContent = data[element];
    } 
    else {
      for (property in data[element]) {
        var phtml = document.getElementById(element + '_' + property);
        if (typeof(phtml) != 'undefined') {
          phtml.innerText = data[element].property;
        }
      }
    }
    //value.className = data.element.duration >= GARBAGE_COLLECTOR_DURATION_WARNING) ?
    //                  "warning" : "";
  }
}

self.port.on("update", function(data) {
  hide_init();
  update(data);
});