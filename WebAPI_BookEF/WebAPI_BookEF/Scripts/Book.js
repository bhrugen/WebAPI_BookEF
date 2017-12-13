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

function updateBook(id) {
    var name = "";
    var changedItem = {};
    name = $("#txtUpdate_" + id).val();
    changedItem.name = name;
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Book/" + id,
        data: changedItem,
        success: function (result) {
            drawItems(result);
            cancelEditMode();
        }
    });
}


function editBook(id) {
    $("#txtNewBook").hide();
    $("#btnAddBook").hide();
    drawItemsEdit(id);
}

function cancelEditMode() {
    $("#txtNewBook").show();
    $("#btnAddBook").show();
    getBookAndDrawItems();
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

function drawItemsEdit(id) {
    var $list = $("#bookList").empty();
    var $div = $("<div class='row'>");
    var $textBoxDiv = $("<div class='col-sm-8' style='padding-left:30px;'>").appendTo($div);
    var $buttonDiv = $("<div class='col-sm-4' style='padding-right:30px;'>").appendTo($div);
    var $txtBook = $("<input type='text' class='form-control' id='txtUpdate_" + id + "' value ='" + name + "'/>").appendTo($textBoxDiv);
    var $editBtn = $("<button class='btn btn-success' style='width:50%' onclick='updateBook( " + id + ")'>Update</button>").appendTo($buttonDiv);
    var $deleteBtn = $("<button class='btn btn-danger' style='width:50%' onclick='cancelEditMode()'>Cancel</button>").appendTo($buttonDiv);

    $div.appendTo($list);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/Book/" + id,
        success: function (result) {
            $("#txtUpdate_" + id).val(result.Name);

        }
    });
}

$(document).ready(function () {

    getBookAndDrawItems();
});

function getBookAndDrawItems() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/Book/",
        success: function (result) {
            drawItems(result);

        }
    });

}
