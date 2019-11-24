$(document).ready(function () {

  $.post("/getaverage", (data) => {
    $('.tile_count').html("");
    console.log("abc");
    let title = data["index"];
    let value = data["data"];
    let fa  = ["far fa-user", "fas fa-border-style", "fas fa-mobile", "fas fa-laptop"]
    for (i = 0; i < title.length; i++) {
      if(i == 0)
      {
        $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(0) + '</div></div>')
      }
      else
      {
      $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(2) + '</div></div>')
      }
    }
  })
  $.post('/data', {name:"Yearly Amount Spent"}, (data)=>{
    chartxyz(data, "Yearly Amount Spent")
  })
  $('.dashboard_graph .btn-dg').click(function(){
    show()
  })
})

function show() {
  $.post("/ana" , (data) => {
    $('#chartabc').html('');
    console.log(data)
    data["customers"].forEach(element => {
      var r;
      if (element["vaule"] < 0) {
        r = "Với mỗi đơn vị tăng của " + element["name"] + " sẽ làm giảm " + element["value"].toFixed(2) * -1 + "$ tổng số tiền khách hàng bỏ ra";
      } else {
        r = "Với mỗi đơn vị tăng của " + element["name"] + " sẽ làm tăng " + element["value"].toFixed(2) + "$ tổng số tiền khách hàng bỏ ra";
      }
      $('#chartabc').append('<div class="kq"><i class="fas fa-angle-right"></i>' + r + '</div>');
    })
  })

}

Array.prototype.forEach.call(
  document.querySelectorAll(".file-upload__button"),
  function (button) {
    const hiddenInput = button.parentElement.querySelector(
      ".file-upload__input"
    );
    const label = button.parentElement.querySelector(".file-upload__label");
    const defaultLabelText = "No file(s) selected";

    // Set default text for label
    label.textContent = defaultLabelText;
    label.title = defaultLabelText;

    button.addEventListener("click", function () {
      hiddenInput.click();
    });

    hiddenInput.addEventListener("change", function () {
      const filenameList = Array.prototype.map.call(hiddenInput.files, function (
        file
      ) {
        return file.name;
      });

      label.textContent = filenameList.join(", ") || defaultLabelText;
      label.title = label.textContent;
    });
  }
);