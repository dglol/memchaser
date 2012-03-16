const prefs = require("api-utils/preferences-service");
const config = require("config");
const garbage_collector = require("memchaser/garbage-collector")


exports.test_javascript_mem_log_enabled = function (test) {
  test.assert(prefs.get(config.PREF_MEM_LOGGER));
}
