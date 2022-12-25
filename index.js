function render() {
  const seedValue = document.querySelector("input").value.substring(1);
  const scheme = document.querySelector("select").value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedValue}&format=json&mode=${scheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      const colors = data.colors;
      let html = "";
      colors.forEach((color, i) => {
        html += `
    <div class="middle-box">
            <div class="color-plate" style="background-color: ${color.hex.value}">
              1
            </div>
            <p class="hex" onclick="copy(this, ${i})">${color.hex.value}</p>
            <p class="copyConfirm" id="copyConfirm${i}"></p>
          </div>
    `;
        document.getElementById("middle").innerHTML = html;
      });
    });
}
render();

document.querySelector("button").addEventListener("click", function () {
  render();
});

function copy(e, index) {
  document
    .querySelectorAll(".copyConfirm")
    .forEach((item) => (item.textContent = ""));
  const copyText = e.innerText;
  navigator.clipboard
    .writeText(copyText)
    .then(
      () =>
        (document.getElementById(`copyConfirm${index}`).textContent = "Copied")
    )
    .catch((e) => console.log(e));
}
