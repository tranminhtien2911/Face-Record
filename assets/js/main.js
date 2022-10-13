$(document).ready(function () {
    $('#listUser_table').DataTable({
        language: {
            paginate: {
                previous: '<i class="fi fi-rr-angle-double-left"></i>',
                next: '<i class="fi fi-rr-angle-double-right"></i>'
            }
        }
    });
    $('#attendanceList_table').DataTable({
        language: {
            searching: true,
            paginate: {
                previous: '<i class="fi fi-rr-angle-double-left"></i>',
                next: '<i class="fi fi-rr-angle-double-right"></i>'
            }
        }
    });
    $('#attendanceList_table_filter').after(
        '<div class="attendanceList_filter"><select id="attendanceList_filter" class="form-control"><option value="">Show All</option><option value="Check in">Check in</option><option value="Check out">Check out</option></select><div class="attendanceList_filter-icon"><i class="fi fi-rr-angle-small-down"></i></div></div>'
    );
    var table = $('#attendanceList_table').DataTable();
    $("#filterTable_filter.dataTables_filter").append($("#attendanceList_filter"));

    var statusIndex = 0;
    $("#attendanceList_table th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i;
            console.log(statusIndex);
            return false;
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#attendanceList_filter').val()
            var status = data[statusIndex];
            if (selectedItem === "" || status.includes(selectedItem)) {
                return true;
            }
            return false;
        }
    );
    $("#attendanceList_filter").change(function (e) {
        table.draw();
    });
    table.draw();
})
