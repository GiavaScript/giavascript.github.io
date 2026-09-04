// ponytail: native HTML does the documentation; this script only adds small browser conveniences.
var search = document.querySelector("#search");
var sections = Array.from(document.querySelectorAll(".doc-section"));
var menu = document.querySelector(".menu");
var sidebar = document.querySelector(".sidebar");

document.querySelectorAll("pre code").forEach(function (block) {
  var source = block.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  source = source.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="string">$1</span>');
  source = source.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  source = source.replace(/\b(var|function|return|if|else|for|of|in|switch|case|break|default|new|typeof|throw|try|catch|finally)\b/g, '<span class="keyword">$1</span>');
  source = source.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
  block.innerHTML = source;
});

document.querySelectorAll(".copy").forEach(function (button) {
  button.addEventListener("click", function () {
    navigator.clipboard.writeText(button.parentElement.querySelector("code").textContent);
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
