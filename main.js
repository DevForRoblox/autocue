function smoothScroll(target, duration) {
    var target = document.getElementById("bottom");
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset || window.scrollY;
    var distance = targetPosition - startPosition;
    var startTime = null;
  
    function loop(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(loop);
    }
    function ease(t, b, c, d) {
        return c*t/d + b;
    }
    requestAnimationFrame(loop);
}

let start = document.getElementById("start")
let input = document.getElementById("input")
let text = document.getElementById("text")
let title = document.getElementById("title")
let scrollDuration = document.getElementById("scrollDuration")

input.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu pretium quam, nec faucibus enim. Maecenas tincidunt porttitor mi a placerat. Quisque eu feugiat diam, non consectetur felis. Nam a justo purus. Integer augue mauris, lacinia id ipsum in, convallis iaculis arcu. In sed nunc ac urna malesuada mollis nec vitae turpis. Aliquam erat volutpat. Nam quis ligula nisl. Fusce elementum, nulla dapibus faucibus pulvinar, orci purus commodo lectus, mattis maximus neque dui sit amet lectus. In faucibus faucibus ligula, sed consectetur magna aliquam eu. Nulla facilisi. Nam et dui lobortis, faucibus felis et, luctus tortor. Phasellus justo odio, interdum."

scrollDuration.value = 10

let filesInput = document.getElementById("fileInput");
let textArea = document.getElementById("input");

filesInput.onchange = function() {
  let files = filesInput.files;
 
  if(files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
      const file = e.target.result;
      const lines = file.split(/\r\n|\n/);
      textArea.value = lines.join('\n');
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file); 
}

start.onclick = function() {

  let timer = document.createElement("span")
  timer.innerHTML = 10
  timer.style.fontSize = "100px"
  timer.style.fontWeight = "bold"

  let message = document.createElement("span")
  message.innerHTML = "Get ready!"
  message.style.fontSize = "80px"
  message.style.fontWeight = "bold"

  let count = 10

  var interval = setInterval(function() {
    timer.innerHTML = -- count;

    if (count == 0) {
        clearInterval(interval);
        document.getElementById("menu").parentElement.style.visibility = "hidden"
    }
  }, 1000);

  if(!scrollDuration.value > 0) {
    scrollDuration.value = 10
  }

  start.parentElement.append(message)
  start.parentElement.append(document.createElement("br"))
  start.parentElement.append(timer)
  
  text.innerHTML = input.value
  scrollDuration.style.display = "none"
  title.remove()
  filesInput.remove()
  input.remove()
  start.remove()

  setTimeout(function() {
    
    smoothScroll(document.getElementById("bottom"), scrollDuration.value * 1000)
  }, 10000)
}