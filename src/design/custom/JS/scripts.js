// Toggle between showing and hiding the sidenav, and add overlay effect
        function w3_open() {
            var x = document.getElementById('hide_navText_btn');

            var overlayBg = document.getElementById("myOverlay");
            if (mySidenav.style.display === 'block') {
                mySidenav.style.display = 'none';
                overlayBg.style.display = "none";

                $('#main').removeClass('sidenav-margin-open');
                $('#main').addClass('sidenav-margin-close');
            } else {
                mySidenav.style.display = 'block';
                overlayBg.style.display = "block";
                if (x.className.indexOf("w3-show") != -1) {
                    $('#main').removeClass('sidenav-margin-close');
                    $('#main').addClass('sidenav-margin-open');
                }
            }
        }

        // Close the sidenav with the close button
        function w3_close() {
            var overlayBg = document.getElementById("myOverlay");
            mySidenav.style.display = "none";
            overlayBg.style.display = "none";

            $('#main').removeClass('sidenav-margin-open');
            $('#main').addClass('sidenav-margin-close');
        }


        function myFunc(id) {
            var x = document.getElementById(id);
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
                // x.className = x.className.replace(" fa-caret-down", " fa-caret-left");
                myFunc_show();
            } else {
                x.className = x.className.replace(" w3-show", "");
                // x.className = x.className.replace(" fa-caret-left", " fa-caret-down");
            }
        }

        function myFunc_show() {
            $('.navText').show();
            $('.navText').removeClass("w3-hide")
            $('#main').css('margin-left', '170px');
            $('#hide_navText_btn').html('<i class="flaticon-more"></i>');
            $('#hide_navText_btn').removeClass(" w3-center");
        }