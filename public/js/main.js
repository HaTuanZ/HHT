$(document).ready(function () {
  $('.httqd').hide();
  $.post("/getaverage", (data) => {
    $('.tile_count').html("");
    let per = data[0]
    let title = data[1]["index"];
    let value = data[1]["data"];
    let fa  = ["far fa-user", "fas fa-border-style", "fas fa-mobile", "fas fa-laptop"]
    for (i = 0; i < title.length; i++) {
      if(per[i].status == "in")
      {
        $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'" style="padding-right: 5px;"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(2) + '</div><span class="count_bottom"><i class="green"><i class="fas fa-sort-up"></i>'+per[i].per.toFixed(2)+'%</i> From last year</span></div>')
      }
      else
      {
      $('.tile_count').append('<div class="col-md-3 col-sm-4  tile_stats_count"><span class="count_top"><i class="'+fa[i]+'" style="padding-right: 5px;"></i>' + title[i] + '</span><div class="count">' + value[i].toFixed(2) + '</div><span class="count_bottom"><i class="red"><i class="fas fa-sort-down"></i></i>'+per[i].per.toFixed(2)+'%</i> From last year</span></div>')
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
    console.log(data)
    $('.httqd').show();
    chartabc(data[1], data[2])
    $('.httqd .bg-white .pred').html("");
    $('.httqd .bg-white .x_title h2').html("Result");
    $('.httqd .bg-white .pred').append('<table class="table"><thead><tr><th></th><th>Giá Trị</th><th>Ý Nghĩa</th></tr></thead><tbody>')
    data[0]["customers"].forEach(element =>{
      var r;
      if (element["vaule"] < 0) {
        r = "Với mỗi  "+element["unit"]+ " tăng lên của " + element["name"] + " sẽ làm giảm "+element["value"].toFixed(2)+" tổng số tiền khách hàng bỏ ra hàng năm";
      } else {
        r = "Với mỗi "+element["unit"]+ " tăng lên của " + element["name"] + " sẽ làm tăng "+element["value"].toFixed(2)+" tổng số tiền khách hàng bỏ ra hàng năm";
      }
      $('.httqd .bg-white .pred tbody').append(' <tr><td>'+element["name"]+'</td><td>'+element["value"].toFixed(2)+'</td><td>'+r+'</td></tr>');
    })
    // $('.httqd .bg-white .pred tbody').append(' <tr><td>R^2</td><td>'+data[3][0]["R"].toFixed(2)+'</td><td>Các yếu tố đầu vào giải thích được '+data[3][0]["R"].toFixed(3)*100+'% giá trị dự đoán</td></tr>')
    // $('.httqd .bg-white .pred tbody').append(' <tr><td>MSE</td><td>'+data[4][0]["MSE"].toFixed(2)+'</td><td>Trung bình bình phương sai số</td></tr>')
    $('.httqd .bg-white .pred').append('</tbody></table>')
    $('html, body').animate({
      scrollTop: $(".httqd").offset().top
  }, 1000);
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