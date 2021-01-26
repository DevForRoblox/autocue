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


start.onclick = function() {
  let start = document.getElementById("start")
  let input = document.getElementById("input")
  let text = document.getElementById("text")
  let scrollDuration = document.getElementById("scrollDuration")

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



  start.parentElement.append(message)
  start.parentElement.append(document.createElement("br"))
  start.parentElement.append(timer)
  
  text.innerHTML = input.value
  scrollDuration.style.display = "none"
  input.remove()
  start.remove()

  setTimeout(function() {
    
    smoothScroll(document.getElementById("bottom"), scrollDuration.value * 1000)
  }, 10000)
}