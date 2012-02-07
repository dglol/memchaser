const BYTE_TO_MEGABYTE = 1/1048576;

const GARBAGE_COLLECTOR_DURATION_WARNING = 100;

var cache = {};

function hide_init() {
  document.getElementById("init").style.display = "none";
}

function update(data) {
  var content = document.getElementById('data');
  for (element in data) {
    data[element] = element || cache[element];
  }
   
}

self.port.on("update_garbage_collector", function(data) {
  hide_init();

  // Update widget with current garbage collector activity
  ["gc", "cc"].forEach(function (aType) {
    // Keep old values displayed
    if (typeof(data[aType]) == 'undefined')
      return;

    var duration = document.getElementById(aType + "_duration");
    duration.textContent = data[aType].duration + "ms";

    duration.className = (data[aType].duration >= GARBAGE_COLLECTOR_DURATION_WARNING) ?
                          "warning" : "";

    if (data[aType].age) {
      var age = document.getElementById(aType + "_age");
      age.textContent = " (" + data[aType].age + "s)";
    }
  });

});

self.port.on("update_memory", function(data) {
  hide_init();

  // Update widget with current memory usage
  ["resident"].forEach(function (aType) {
    if (data[aType]) {
      var element = document.getElementById(aType);
      element.textContent = Math.round(data[aType] * BYTE_TO_MEGABYTE) + "MB";
    }
  });
});