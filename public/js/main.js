$(document).ready(function(){
    $('.btn-dg').hide();
    $.post("/getlistfiles", (data)=>{
        $('.ls').html("");
        data.forEach(element => {
            $('.ls').append("<div class='fileitem'><i class='far fa-calendar'></i><span>"+element+"</span></div>")
        });
    })
    var curfile;
    $('.ls').on("click",".fileitem",function(){
        $('.btn-dg').show();
        $('.dfile').html("");
        curfile = $('.ls .fileitem span').html();
        $.ajax({
            url:"./uploads/" + curfile,
            dataType:"text",
            success:function(data)
            {
             var employee_data = data.split(/\r?\n|\r/);
             var table_data = '<table class="table table-bordered table-striped">';
             for(var count = 0; count<employee_data.length; count++)
             {
              var cell_data = employee_data[count].split(",");
              table_data += '<tr>';
              for(var cell_count=0; cell_count<cell_data.length; cell_count++)
              {
               if(count === 0)
               {
                table_data += '<th>'+cell_data[cell_count]+'</th>';
               }
               else
               {
                table_data += '<td>'+cell_data[cell_count]+'</td>';
               }
              }
              table_data += '</tr>';
             }
             table_data += '</table>';
             $('.dfile').html(table_data);
            }
           });
    })
    $('.btn-dg').click(function(){
        show(curfile)
    })

})

function show(input){
    $.get("/ana?filename=" + input, (data) => {
        $('.dfile').html('');
        // $('.dfile').html("<h3>Kết quả dự đoán</h3>");
        data["customers"].forEach(element =>{
            var r;
            if(element["vaule"] < 0 ){
                r = "Với mỗi đơn vị tăng của "+ element["name"] +" sẽ làm giảm "+ element["value"].toFixed(2)*-1 +"$ tổng số tiền khách hàng bỏ ra";
            }
            else{
                r = "Với mỗi đơn vị tăng của "+ element["name"] +" sẽ làm tăng "+element["value"].toFixed(2)+"$ tổng số tiền khách hàng bỏ ra";
            }
            $('.dfile').append('<div class="kq"><i class="fas fa-angle-right"></i>'+r+'</div>');
        })
    })

}

Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function(button) {
      const hiddenInput = button.parentElement.querySelector(
        ".file-upload__input"
      );
      const label = button.parentElement.querySelector(".file-upload__label");
      const defaultLabelText = "No file(s) selected";
  
      // Set default text for label
      label.textContent = defaultLabelText;
      label.title = defaultLabelText;
  
      button.addEventListener("click", function() {
        hiddenInput.click();
      });
  
      hiddenInput.addEventListener("change", function() {
        const filenameList = Array.prototype.map.call(hiddenInput.files, function(
          file
        ) {
          return file.name;
        });
  
        label.textContent = filenameList.join(", ") || defaultLabelText;
        label.title = label.textContent;
      });
    }
  );