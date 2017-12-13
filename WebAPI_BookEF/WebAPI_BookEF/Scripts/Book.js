function addBook() {
    var newBook = {};
    newBook.Name = $("#txtNewBook").val();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Book/",
        data: newBook,
        success: function (result) {
            drawItems(result);
            $("#txtNewBook").val("");
        }
    });

}

function deleteBook(id) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "api/Book/" + id,
        success: function (result) {
            drawItems(result);
        }
    });
}

function drawItems(result) {

    var $list = $("#bookList").empty();

    for (var i = 0; i < result.length; i++) {
        var currentBook = result[i];
        var $div = $("<div class='row' style='padding-top:2px;padding-bottom:2px;'>");
        var $textBoxDiv = $("<div class='col-sm-8' style='padding-left:30px;'>").appendTo($div);
        var $buttonDiv = $("<div class='col-sm-4' style='padding-right:30px;'>").appendTo($div);
        var $txtBook = $("<input type='text' class='form-control' disabled='true' id='txtUpdate_" + currentBook.Id + "' value ='" + currentBook.Name + "'/>").appendTo($textBoxDiv);
        var $editBtn = $("<button class='btn btn-success' style='width:50%' onclick='editBook( " + currentBook.Id + ")'>Edit</button>").appendTo($buttonDiv);
        var $deleteBtn = $("<button class='btn btn-danger' style='width:50%' onclick='deleteBook( " + currentBook.Id + ")'>Delete</button>").appendTo($buttonDiv);

        $div.appendTo($list);
    }
}


$(document).ready(function () {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/Book/",
        success: function (result) {
            drawItems(result);

        }
    });
});