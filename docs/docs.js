// ponytail: native HTML does the documentation; this script only adds small browser conveniences.
var search = document.querySelector("#search");
var sections = Array.from(document.querySelectorAll(".doc-section"));
var menu = document.querySelector(".menu");
var sidebar = document.querySelector(".sidebar");

var tokenPattern = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*)|\b(var|let|const|function|return|if|else|for|of|in|while|do|switch|case|break|continue|default|new|typeof|throw|try|catch|finally|null|undefined|true|false)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_$][\w$]*)(?=\()/g;

document.querySelectorAll("pre code").forEach(function (block) {
  var source = block.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  block.innerHTML = source.replace(tokenPattern, function (match, string, comment, keyword, number) {
    if (string) return '<span class="string">' + match + '</span>';
    if (comment) return '<span class="comment">' + match + '</span>';
    if (keyword) return '<span class="keyword">' + match + '</span>';
    if (number) return '<span class="number">' + match + '</span>';
    return '<span class="func">' + match + '</span>';
  });
});

document.querySelectorAll("pre").forEach(function (pre) {
  var wrap = pre.parentElement;
  if (!wrap.classList.contains("code-wrap")) {
    wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  }
  if (!wrap.querySelector(".copy")) {
    var button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = "Copy";
    wrap.appendChild(button);
  }
});

document.querySelectorAll(".copy").forEach(function (button) {
  button.addEventListener("click", function () {
    var code = button.parentElement.querySelector("code");
    if (!code) return;
    navigator.clipboard.writeText(code.textContent);
    button.textContent = "Copied";
    setTimeout(function () { button.textContent = "Copy"; }, 1200);
  });
});

search.addEventListener("input", function () {
  var query = search.value.toLowerCase();
  sections.forEach(function (section) {
    section.hidden = query && !section.textContent.toLowerCase().includes(query);
  });
});

menu.addEventListener("click", function () {
  var open = sidebar.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
