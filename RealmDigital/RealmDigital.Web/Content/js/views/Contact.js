"use strict";

var contact = (function () {

    var dthelper;

    var maintainContactHtmlHelper = {


        "getContactInformation": function () {
            
            var contactObject = {

                "Id": parseInt($("#hiddenId").val()),

                "UserId": $("#drpUser option:selected").val(),

                "EmailAddress": $("#txtEmailAddress").val(),

                "PhoneNumber": $("#txtPhoneNumber").val()
            };

            return JSON.stringify(contactObject);
        }
    };

    var maintainContactApiHelper = {

        "maintainContact": function () {

            return new Promise(function () {
                debugger;
                var contactObject = JSON.parse(maintainContactHtmlHelper.getContactInformation());

                console.log(contactObject);

                $.post("/api/contacthelper/MaintainContactDetails", contactObject, function (data) {

                    populateContactTable();

                    if (data > 0) {

                        $("#lblSaveContactSuccessAlert").text($("#txtPhoneNumber").val() + " saved successfully");

                        $("#divSaveContactStatusAlert").show();

                        clearFields();
                    }

                }).fail(function (e) {
                    
                });

            });

        },

        "DeleteContact": function () {

            return new Promise(function () {
                debugger;
                var contactObject = JSON.parse(maintainContactHtmlHelper.getContactInformation());

                console.log(contactObject);

                $.post("/api/contacthelper/DeleteContactDetails", contactObject, function (data) {
                    debugger;

                    console.log(data);
                    $("#alertRemoveContact").text("contact removed successfully");
                    populateContactTable();

                }).fail(function (e) {

                });

            });

        },

        "getPopulateUserInformation": function () {

            return new Promise(function (gooddata) {

                $.get("/api/contacthelper/GetPeopleListDropdownData", function (data) {

                    debugger;
                    var baseobj = [];

                    var dropDownData = JSON.parse(data);

                    for (var i = 0; i < dropDownData.length; i++) {

                        baseobj.push({ "Name": dropDownData[i].Name, "Value": dropDownData[i].Value });
                    }

                    var userDataDropDownlist = $('#drpUser');

                    userDataDropDownlist.empty();
                    userDataDropDownlist.append($('<option></option>').val("").html("---Please Select---"));
                    $.each(baseobj, function (val, text) {
                        userDataDropDownlist.append(
                            $('<option></option>').val(text.Value).html(text.Name)
                        );
                    });
                    
                    gooddata(JSON.parse(data));

                }).fail(function (e) {

                    console.log(e);
                });

            });

        },

        "getContactInformation": function () {

            return new Promise(function (gooddata) {

                $.get("/api/contacthelper/GetContactList", function (data) {

                    gooddata(JSON.parse(data));

                }).fail(function (e) {

                    console.log(e);
                });

            });

        },

        "getSearchContactInformation": function () {

            return new Promise(function (gooddata) {
                debugger;
                $.get("/api/contacthelper/SearchContact?searchKeyWord=" + $("#txtSearch").val(), function (data) {

                    gooddata(JSON.parse(data));

                    $("#modalLoadStatus").modal("hide");

                }).fail(function (e) {

                    console.log(e);
                });

            });

        }
    };

    function populateUsersDropDownList() {

        maintainContactApiHelper.getPopulateUserInformation().then(function (e) {

        }, function (e) { });
    }
    
    function SearchContactInformation() {

        maintainContactApiHelper.getSearchContactInformation().then(function (e) {

            debugger;

            if (e.length === 0) { $("#btnAddNewPerson").show(); }

            else { $("#btnAddNewPerson").hide(); }

            dthelper.destroy();

            dthelper = $('#tblContactInformation').DataTable({

                "bProcessing": true,
                "responsive": false,
                "bSort": false,
                "aaData": e,
                "columnDefs": [
                    {
                        "render": function (data, type, row) {

                            return '<a href="#" class="btn btn-small btn-success AddContact" data-Id=' + row.Id + '><i class="fa fa-user-plus" aria-hidden="true"></i></a>';
                        }
                        ,
                        "targets": [6]
                    },
                    {
                        "render": function (data, type, row) {

                            return '<a href="#" class="btn btn-small btn-info EditContact" data-Id=' + row.Id + '><i class="fa fa-pencil" aria-hidden="true"></i></a>';
                        }
                        ,
                        "targets": [7]
                    },
                    {
                        "render": function (data, type, row) {

                            return '<a href="#" class="btn btn-small btn-danger DeleteContact" data-Id=' + row.Id + '><i class="fa fa-trash" aria-hidden="true"></i></a>';
                        }
                        ,
                        "targets": [8]
                    },
                    { "visible": false, "targets": [0] }

                ],
                "aoColumns": [
                    { "mData": "Id" },
                    { "mData": "Name" },
                    { "mData": "Surname" },
                    { "mData": "Address" },
                    { "mData": "PhoneNumber" },
                    { "mData": "EmailAddress" },

                    null,
                    null,
                    null

                ]
            }), function (e) { console.error(e) };

        });

        
    }

    function populateContactTable() {

        maintainContactApiHelper.getContactInformation().then(function (e) {

            debugger;

            if (e.length === 0) { $("#btnAddNewContact").show(); }

            else { $("#btnAddNewContact").hide(); }

            dthelper.destroy();

            dthelper = $('#tblContactInformation').DataTable({

                "bProcessing": true,
                "responsive": false,
                "bSort": false,
                "aaData": e,
                "columnDefs": [
                     {
                         "render": function (data, type, row) {

                             return '<a href="#" class="btn btn-small btn-success AddContact" data-Id=' + row.Id + '><i class="fa fa-user-plus" aria-hidden="true"></i></a>';
                        }
                        ,
                         "targets": [6]
                     },
                     {
                         "render": function (data, type, row) {

                             return '<a href="#" class="btn btn-small btn-info EditContact" data-Id=' + row.Id + '><i class="fa fa-pencil" aria-hidden="true"></i></a>';
                         }
                         ,
                         "targets": [7]
                    },
                    {
                        "render": function (data, type, row) {

                            return '<a href="#" class="btn btn-small btn-danger DeleteContact" data-Id=' + row.Id + '><i class="fa fa-trash" aria-hidden="true"></i></a>';
                        }
                        ,
                        "targets": [8]
                    },
                     { "visible": false, "targets": [0] }

                ],
                "aoColumns": [
                     { "mData": "Id" },
                    { "mData": "Name" },
                    { "mData": "Surname" },
                    { "mData": "Address" },    
                    { "mData": "PhoneNumber" },
                    { "mData": "EmailAddress" },
                    
                    null,
                    null,
                    null

                ]
            }), function (e) { console.error(e) };

        });
    }

    function clearFields() {

        $("#hiddenId").val(0);

        $("#txtEmailAddress").val("");

        $("#txtPhoneNumber").val("");
    }

    function maintainContact() {

        maintainContactApiHelper.maintainContact().then(function () {            

        });

    }

    function deleteContact() {

        maintainContactApiHelper.DeleteContact().then(function () {

        });

    }

    function showError(message) {

        $("#lblSaveContactWarningAlert").text(message);

        $("#divSaveContactWarningAlert").show();    
    }


    $(document).ready(function () {

        debugger;

        $("#alertRemoveContact").hide();

        populateUsersDropDownList();

        $("#divSaveContactWarningAlert").hide();

        dthelper = $('#tblContactInformation').DataTable();

        populateContactTable();

        $("table#tblContactInformation").on("click", "a.EditContact", function (e) {

            $("#modalMaintainContact").modal("show");

            var selectedIndex = $(this).closest("tr").index();

            var rowData = dthelper.row(selectedIndex).data();

            $("#hiddenId").val(rowData.Id);

            $("#drpUser option:selected").val(rowData.UserId)
           
            $("#txtEmailAddress").val(rowData.EmailAddress);

            $("#txtPhoneNumber").val(rowData.PhoneNumber);

            $("#drpUser option:selected").text(rowData.Name + " " + rowData.Surname)

        });


        $("table#tblContactInformation").on("click", "a.DeleteContact", function (e) {

            var selectedIndex = $(this).closest("tr").index();

            var rowData = dthelper.row(selectedIndex).data();

            $("#hiddenId").val(rowData.Id);

            deleteContact();

            $("#alertRemoveContact").show();

        });

        $("table#tblContactInformation").on("click", "a.AddContact", function (e) {

            clearFields();

            $("#modalMaintainContact").modal("show");

        });

        

        $("#btnSaveContact").on('click', function () {

             if ($("#txtEmailAddress").val() === "") { showError("Please enter email address"); }

            else if ($("#PhoneNumber").val() === "") { showError("Please enter address"); }

            else { maintainContact();  }

        });

        $("#btnAddNewContact").on('click', function () {

            clearFields();

            $("#modalMaintainContact").modal("show");
        });

        $("#btnSearch").on('click', function () {

            $("#modalSeachContact").modal("show");
        });

        $("#btnFind").on('click', function () {
           
            SearchContactInformation();

            $("#modalSeachContact").modal("hide");

            $("#modalLoadStatus").modal("show");
        });

    });

    return { maintainContactHtmlHelper: maintainContactHtmlHelper };
})();