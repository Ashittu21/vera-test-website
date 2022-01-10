var fs = require("fs");
var dir = "../templates/police-budgets";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

fs.readFile("./build/index.html", "utf8", function (err, data) {
  const regexp = /<head><link href="(.*)" rel="stylesheet"><\/head>/g;
  const stylesheetPath = regexp.exec(data);
  data = data.replace(regexp, "");
  data = `<script>
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "${stylesheetPath[1]}";

    head.appendChild(link);
  </script>${data}`;
  fs.writeFile("../templates/police-budgets/index.html", data, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("inside write");
  });
});
