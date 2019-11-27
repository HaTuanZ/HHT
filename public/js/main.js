$(document).ready(function () {

  $.post("/getaverage", (data) => {
    $('.tile_count').html("");
    let per = data[0]
    let title = data[1]["index"];
    let value = data[1]["data"];
    let fa  = ["far fa-user", "fas fa-border-style", "fas fa-mobile", "fas fa-laptop"]
    for (i = 0; i < title.length; i++) {
      if(per[i].status == "in")
      {
        $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'" style="padding-right: 5px;"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(2) + '</div><span class="count_bottom"><i class="green"><i class="fas fa-sort-up"></i>'+per[i].per.toFixed(2)+'%</i> From last week</span></div>')
      }
      else
      {
      $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'" style="padding-right: 5px;"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(2) + '</div><span class="count_bottom"><i class="red"><i class="fas fa-sort-down"></i></i>'+per[i].per.toFixed(2)+'%</i> From last week</span></div>')
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
    chartabc(data[1], data[2])
    $('.bg-white .pred').html("");
    $('.bg-white .x_title h2').html("Result");
    data[0]["customers"].forEach(element =>{
      var r;
      if (element["vaule"] < 0) {
        r = "1 "+element["unit"]+ " increase in " + element["name"] + " is associated with an decrease of "+element["value"].toFixed(2)+" total dollars spent.";
      } else {
        r = "1 "+element["unit"]+ " increase in " + element["name"] + " is associated with an increase of "+element["value"].toFixed(2)+" total dollars spent.";
      }
      $('.bg-white .pred').append('<div class="kq"><i class="fas fa-angle-right"></i>' + r + '</div>');
    })

    $('.dashboard_graph .btn-dg').hide();
    // data["customers"].forEach(element => {
    //   var r;
    //   if (element["vaule"] < 0) {
    //     r = "Với mỗi đơn vị tăng của " + element["name"] + " sẽ làm giảm " + element["value"].toFixed(2) * -1 + "$ tổng số tiền khách hàng bỏ ra";
    //   } else {
    //     r = "Với mỗi đơn vị tăng của " + element["name"] + " sẽ làm tăng " + element["value"].toFixed(2) + "$ tổng số tiền khách hàng bỏ ra";
    //   }
    //   $('#chartabc').append('<div class="kq"><i class="fas fa-angle-right"></i>' + r + '</div>');
    // })
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