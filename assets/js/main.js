$(document).ready(function () {

    // List User
    $('#listUser_table').DataTable({
        language: {
            paginate: {
                previous: '<i class="fi fi-rr-angle-double-left"></i>',
                next: '<i class="fi fi-rr-angle-double-right"></i>'
            }
        }
    });
    // End List User
    // Attendance Table
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
    $("#attendanceList_filter.dataTables_filter").append($("#attendanceList_filter"));

    var statusIndex = 0;
    $("#attendanceList_table th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i;
            return false;
        }
    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#attendanceList_filter').val();
            var status = data[statusIndex];
            if (selectedItem === "" || status.includes(selectedItem)) {
                return true;
            }
            if (settings.nTable.id != 'attendanceList_table') {
                return true;
            }

            return false;
        }
    );
    $("#attendanceList_filter").change(function (e) {
        table.draw();
    });
    table.draw();
    //End Attendance Table
    // Custome Linking Page
    var path = window.location.href;
    // because the 'href' property of the DOM element is the absolute path
    $('.topNav_link').each(function () {
        if (this.href === path) {
            $(this).addClass('active-topNav');

        }
    });
    //End Custome Linking Page
    //Login
    $('.formLogin').on("submit", (e) => {
        if(handle_Login_input()){
            e.currentTarget.submit();
        }else{
            e.preventDefault();
        }
        
        // handle_Login_input();
        
        // e.currentTarget.submit();
    });
    function handle_Login_input() {
        let valid = false;
        let valid_1 = false;
        let valid_2 = false;
        let username_Value = $('.formLogin_input-username').val().trim();
        let user_password_Value = $('.formLogin_input-password').val().trim();
        if (username_Value == '') {
            console.log(username_Value);
            $('.formLogin_input-username').addClass('error');
            $('.feedback-username').html('Username cannot be blank');
            $('.feedback-username').css("color", "#CB7377");
            valid_1 = false;

        } else if (username_Value.length < 3 || username_Value.length > 18){
            $('.formLogin_input-username').addClass('error');
            $('.feedback-username').html(`Username must be between 3 and 18 characters.`);
            $('.feedback-username').css("color", "#CB7377");
            valid_1 = false;
        }else{
            $('.formLogin_input-username').removeClass('error');
            $('.feedback-username').html('');
            valid_1 = true;
        }
        if (user_password_Value == '') {
            console.log(user_password_Value);
            $('.formLogin_input-password').addClass('error');
            $('.feedback-password').html('Password cannot be blank');
            $('.feedback-password').css("color", "#CB7377");
            valid_2 = false;

        } else if (user_password_Value.length < 5 || user_password_Value.length > 18){
            $('.formLogin_input-password').addClass('error');
            $('.feedback-password').html('Password must be between 5 and 18 characters.');
            $('.feedback-password').css("color", "#CB7377");
            valid_2 = false;
        }else{
            $('.formLogin_input-password').removeClass('error');
            $('.feedback-password').html('');
            valid_2 = true;
        }
        if(valid_1 == false || valid_2 == false){
            valid = false;
        }else{
            valid = true;
        }
        return valid;
    }
    //End Login

});